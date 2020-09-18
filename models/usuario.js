var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
var Token = require('../models/token');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');
var mailer = require('../mailer/mailer')

const saltRounds = 10;
validateEmail = (email) => {
    re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return re.test(email)
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        require: [true, 'es requerido']
    },
    email: {
        type: String,
        trim: true,
        require: [true, 'es requerido'],
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'ingrese uno valido'],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/]
    },
    password: {
        type: String,
        require: [true, 'es requerido'],
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});
usuarioSchema.plugin(uniqueValidator, { message: 'el {PATH} ya existe con otro usuario' });

usuarioSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next()
})

usuarioSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

usuarioSchema.methods.reservar = function (BiciId, desde, hasta, cb) {
    var reserva = new Reserva({ usuario: this._id, bicicleta: BiciId, desde: desde, hasta: hasta })
    console.log(reserva);
    reserva.save(cb);
}
usuarioSchema.statics.allUsers = function (cb) {
    return this.find({}, cb);
};
usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
    console.log(this)
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;
    token.save((err) => {
        if (err) { return console.log(err.message) }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Verificacion de cuenta',
            text: 'Hola, \n\n ' + 'por favor haga click en el link:\n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + ' .\n'
        };
        mailer.sendMail(mailOptions, function (err) {
            if (err) {
                return console.log(err.message)
            } else {
                console.log('se ha enviado un mail a:' + email_destination)
            }
        })
    })
}

usuarioSchema.static.findOrCreate = function (condition, cb) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or: [
            { 'googleId': condition.id }, { 'email': condition.emails[0].value }
        ]
    }, (err, result) => {
        if (result) {
            cb(err, result)
        } else {
            console.log('========condition============');
            console.log(condition);
            let values = {};
            values.googleId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || 'SIN NOMBRE';
            values.verificado= true;
            values.password = condition._json.etag;
            console.log('========Values============');
            console.log(values);
            self.create(values, (err, result) => {
                if (err) { console.log(err); }
                return cb(err, result)
            })
        }
    })
};

usuarioSchema.methods.resetPassword = function (cb) {
    const token = new Token({ _userId: this.id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;
    token.save((err) => {
        if (err) { return cb(err) }

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'reseteo de cuenta',
            text: 'Hola, \n\n ' + 'por favor haga click en el link para resetear el pass:\n' + 'http://localhost:3000' + '\/resetPassword\/' + token.token + ' .\n'
        };
        mailer.sendMail(mailOptions, function (err) {
            if (err) { return cb(err) } else {
                console.log('se ha enviado un mail para resetear password a:' + email_destination)
            }
            cb(null);
        })
    })
}

module.exports = mongoose.model('Usuario', usuarioSchema)