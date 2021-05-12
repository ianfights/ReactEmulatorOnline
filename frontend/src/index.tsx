import React from 'react';
import ReactDOM from 'react-dom';
const socket = new WebSocket('ws://localhost:25565');



socket.onopen = con => {
    console.log("Connection opened with server");
    socket.send('Hello World!');
}

class Square extends React.Component {
    render() {
        return (
            < div >
                < canvas ref="canvas" width={640} height={576} />
                < p > asdf</p >
                < p > Please</p >
                {
                    socket.onmessage = async msg => {

                        // console.time('test')
                        // console.log('New frame received')
                        var screen = msg.data.split(',');

                        var canvas = document.querySelector('canvas');
                        var ctx = canvas.getContext('2d');
                        var data = ctx.createImageData(640, 576);

                        for (let i = 0; i < screen.length * 4; i++) {
                            data.data[i] = screen[i]
                            data.data[i + 1] = screen[i]
                            data.data[i + 2] = screen[i]
                            data.data[i + 3] = screen[i]
                            data.data[i + 4] = screen[i]

                        }



                        ctx.putImageData(data, 0, 0);
                        //console.timeEnd('test')


                    }

                }
                {
                    window.addEventListener('keydown', (event) => {
                        console.log(event.key);
                        socket.send(`K${event.key}`);

                    })

                }
            </div >)

    }


}

ReactDOM.render(
    < Square />,
    document.getElementById('root')
);

