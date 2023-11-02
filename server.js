const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('사용자가 연결되었습니다.');

  // 클라이언트로부터 메시지 받기
  socket.on('chat message', (message) => {
    console.log('메시지를 받았습니다: ' + message);

    // 모든 연결된 클라이언트에게 메시지 브로드캐스트
    io.emit('chat message', message);
  });

  // 연결 종료 시
  socket.on('disconnect', () => {
    console.log('사용자가 연결을 해제했습니다.');
  });

});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
  
server.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});
