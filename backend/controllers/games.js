const Games = require("../models/games");
const arr = {
    game: []
}
exports.startGame = async (res) => {
    try {
        const test = {
            name: "245",
            tanks: [
                2,2,3,4,5
            ]
        }////test
        const game = arr.game.length

        if(test.tanks.length === 5) {

            if(game < 1) {
                arr.game.push(test)
            }else if(game === 1) {
                arr.game.push(test)
                const creatGame = new Games(arr)
                creatGame.save()
                arr.game = [];
            }
            // socket.emit("res","dataInServis")

        }else {
            console.log("error")
        }
        console.log(arr)

    } catch(e) {
        console.log(e)
    }
    
    socket.emit("res","dataInServis")

// }
}