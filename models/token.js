var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    token: { type: String, require: true },
    createdAt: { type: Date, require: true, default: Date.now, expires: 43200 }
});

module.exports = mongoose.model('Token', tokenSchema)