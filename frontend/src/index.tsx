import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
const socket = new WebSocket('ws://localhost:3001');

let id = uuidv4();

socket.onopen = con => {
    console.log("Connection opened with server");
    socket.send(`{"id":"${id}","content":"readyMessage","ready":true}`);
}

class Square extends React.Component {
    render() {
        return (
            < div >
                < canvas ref="canvas" width={160} height={144} />
                < p > asdf</p >
                < p > Please</p >
                {
                    socket.onmessage = async msg => {

                        // console.time('test')
                        // console.log('New frame received')
                        var screen = msg.data.split(',');

                        var canvas = document.querySelector('canvas');
                        var ctx = canvas.getContext('2d');
                        var data = ctx.createImageData(160, 144);

                        for (let i = 0; i < screen.length ; i++) {
                            data.data[i] = screen[i]
                        }

                        

                        ctx.putImageData(data, 0, 0);
                        //console.timeEnd('test')


                    }

                }
                {
                    window.addEventListener('keydown', (event) => {
                        console.log(event.key);
                        socket.send(`{"id":"${id}","content":"K${event.key}","ready":true}`);

                    })

                }
            </div >)

    }


}

ReactDOM.render(
    < Square />,
    document.getElementById('root')
);

