const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: false },
    currentWeight: { type: Number, required: false },
    goalWeight: { type: Number, required: false },
    sex: { type: String, max: 1, required: false },
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);