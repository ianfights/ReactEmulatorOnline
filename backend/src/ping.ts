function pingClient(socket,msg,map,id){
	socket.send('ping');
	console.log('Send ping');

		if(msg != 'pong'){
			map.delete(id);
			socket.terminate();
			console.log(`Sucessfully killed ${id}'s client`);
			console.log(map);
			return;
		}
		

}

export { pingClient as ping }