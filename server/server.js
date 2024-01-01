import { Server } from 'socket.io'

const io = new Server(3000, {
	cors: {
		origin: '*',
	},
})

const rooms = []

io.on('connection', socket => {
	socket.emit('rooms', rooms)

	socket.on('addNewRoom', callback => {
		const newRoomId =
			rooms.length > 0 ? Math.max(...rooms.map(room => room.id)) + 1 : 1
		const newRoom = { id: newRoomId, image: '' }
		rooms.push(newRoom)

		callback({ ...newRoom, status: true })
		socket.broadcast.emit('rooms', rooms)
	})

	socket.on('joinRoom', (roomId, callback) => {
		const room = rooms.find(room => room.id == roomId)
		if (!room) return callback({ status: false })

		socket.join(roomId)
		callback({ ...room, status: true })
	})

	socket.on('saveImage', (roomId, image) => {
		const room = rooms.find(room => room.id == roomId)
		room.image = image
		// io.to(roomId).emit('newImage', image)
	})
})
