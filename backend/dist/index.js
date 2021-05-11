"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = __importStar(require("ws"));
const fs = __importStar(require("fs"));
const Gameboy = require('serverboy');
let port = 25565;
const server = new WebSocket.Server({
    port: port
});
console.log(`Server started on ${port}`);
let prevScreen;
server.on('connection', socket => {
    const gameboy = new Gameboy();
    console.log("Started new gameboy process");
    var rom = fs.readFileSync('/home/pi/EmulatorTest/backend/dist/pc.gbc');
    gameboy.loadRom(rom);
    setInterval(() => {
        let screen = gameboy.getScreen();
        //Check if prev screen is the same as current screen
        if (screen === prevScreen) {
            //Don't send screen because it is just a waste of resources 
            console.log("Didn't send as there was no change in screen");
            gameboy.doFrame();
        }
        else {
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
