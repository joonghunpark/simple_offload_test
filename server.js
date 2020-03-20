var WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8080});

wss.on('connection', ws => {
	var ret;
	ws.on('message', message => {
		console.log(`eceived message = > ${message}`);
		ret = Function(`${message}`)();
		console.log(ret);
		ws.send(ret);
	})
})
