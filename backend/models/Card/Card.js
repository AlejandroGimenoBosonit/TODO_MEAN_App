const { Schema, model, default: mongoose } = require("mongoose");

const CardSchema = Schema({
    // referencing user in the cards
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    subtitle:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
});

module.exports = model("Card", CardSchema);