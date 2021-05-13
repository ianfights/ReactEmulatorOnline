function keyHandler(msg, gameboy) {
  if (!msg.content.startsWith("K")) {
    return;
  }
  let key = msg.content.slice(1);
  switch (key) {
    case "x":
      gameboy.pressKey("a");
      break;
    case 'z': 
      gameboy.pressKey('b');
      break;
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
    case 'Enter':
      gameboy.pressKey('start');
      break;
    case 'Shift':
      gameboy.pressKey('select');
      break;
      
      
  }
}

export {keyHandler as pressKey}