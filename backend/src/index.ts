import * as WebSocket from 'ws';
import * as fs from 'fs';
const Gameboy = require('serverboy');

let port: number = 25565;
const server = new WebSocket.Server({
    port: port
});
console.log(`Server started on ${port}`);

let prevScreen;
// asdf
server.on('connection', socket => {
    const gameboy = new Gameboy();
    console.log("Started new gameboy process");
    var rom = fs.readFileSync('/home/pi/EmulatorTest/backend/dist/pc.gbc');
    gameboy.loadRom(rom);

    setInterval(() => {

        let screen = gameboy.getScreen();

        //Check if prev screen is the same as current screen
        if(screen === prevScreen){
            //Don't send screen because it is just a waste of resources 
//            console.log("Didn't send as there was no change in screen");
            gameboy.doFrame();

        } else {
        socket.send(screen.toString());
//        console.log("Sent new frame")
        prevScreen = screen;
        gameboy.doFrame();
        }
    }, 80);

    socket.on('message', msg => {
        if (msg.startsWith('K')) {
            let key = msg.slice(1);

            switch (key) {
                case 'w':
                    gameboy.pressKey('up');
                    break;
                case 's':
                    gameboy.pressKey('down');
                    break;
                case 'a':
                    gameboy.pressKey('left');
                    break;
                case 'd':
                    gameboy.pressKey('right');
                    break;
                case 'z':
                    gameboy.pressKey('b');
                    break;
                case 'x':
                    gameboy.pressKey('a');
                    break;
                case "Enter":
                    gameboy.pressKey('start');
                    break;
                case 'Shift':
                    gameboy.pressKey('select');
                    break;

            }


            //a 
        }
    });

});
