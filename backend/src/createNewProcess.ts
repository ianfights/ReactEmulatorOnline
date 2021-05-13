import * as WebSocket from "ws";
import * as fs from "fs";
import * as path from "path";
const Gameboy = require("serverboy");

function createGameboy(map, uuid) {
  //const gameboy = new Gameboy();
  map.set(uuid, new Gameboy());
  var rom = fs.readFileSync(path.resolve(__dirname, "../roms/pc.gbc"));
  map.get(uuid).loadRom(rom);
  console.log("Started new gameboy process");
}

export { createGameboy as createNewGameboy };
