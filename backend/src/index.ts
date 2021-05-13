import * as WebSocket from "ws";
import { createNewGameboy } from "./createNewProcess";
import { pressKey } from './pressKey';
import { ping } from './ping'
const port: number = 3001;
const server = new WebSocket.Server({ port: port });
console.log(`Server started on ${port}`);

let instances = new Map();
let id;
let prevScreen;
let gameboy;
let started = false;

server.on("connection", (socket) => {


  socket.on("message", (message) => {
    //Set ID and await ready message from client
    const msg = JSON.parse(message);
    id = msg.id;
    
    if (msg.ready == true && started == false) {
      //Client is ready so create child process and start sending frames

      createNewGameboy(instances, id);
      gameboy = instances.get(id);
      console.log(instances.size)
      started = true;
    }
    
    
    
    if(started = true){
      pressKey(msg, gameboy);
      
      setInterval (() => {
        ping(socket ,msg, instances, msg.id);

      }, 3000)
      
      setInterval(() => {
        
        let screen = gameboy.getScreen();
        // console.log(screen)
        //Check if prev screen is the same as current screen
        if (screen === prevScreen) {
          //Don't send screen because it is just a waste of resources
          
          gameboy.doFrame();
          
        } else {
          
          socket.send(screen.toString());
          prevScreen = screen;
          gameboy.doFrame();
          
        }
      }, 10);
      
      
    }
    
  });
  
});
