const {Schema, model} = require("mongoose")

const positionSchema = new Schema({
    position: [
        {
            coord: Number,
            isAlive: {
                type: Boolean,
                default: true
            },
            _id: false
        }
    ],
    shot: [
        {
            coord: Number,
            hit: Boolean
        }
    ]

});

const arr = new Schema({//переназвать схему 
    name: {
        type: String,
        required: true,
    },
    tanks: {
        type: positionSchema,
        _id:false
        // required: true///нуно переделать танки добавить позицию убитые и промахи
    }
},{_id: false});

///былобы неплохо убрать из схемы обьект tanks, и переменовать game  на player +++++++

const gamesSchema = new Schema({
        game: {
            type: [arr] 
        },
        statusGame: {
            type: Boolean,
            required: true,
            default: true
        },
        winner: String,
        step: String
}) ;

module.exports = model("games", gamesSchema)