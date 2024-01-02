import { Server } from 'socket.io'

const io = new Server(3000, {
	cors: {
		origin: '*',
	},
})

const rooms = []

io.on('connection', socket => {
	socket.on('getRooms', callback => {
		callback({ rooms, status: true })
	})

	socket.on('addNewRoom', callback => {
		const newRoomId =
			rooms.length > 0 ? Math.max(...rooms.map(room => room.id)) + 1 : 1
		const newRoom = { id: newRoomId.toString(), image: '' }
		rooms.push(newRoom)

		callback({ ...newRoom, status: true })
		socket.broadcast.emit('rooms', rooms)
	})

	socket.on('joinRoom', (roomId, callback) => {
		const room = rooms.find(room => room.id == roomId)
		if (!room) return callback({ status: false })

		rooms.map(room => socket.leave(room.id))
		socket.join(roomId)

		callback({ ...room, status: true })
	})

	socket.on('getImage', callback => {
		const roomId = Array.from(socket.rooms)[1]
		const room = rooms.find(room => room.id == roomId)
		if (!room) return callback({ status: false })

		callback({ image: room.image, status: true })
	})

	socket.on('saveImage', (image, callback) => {
		const roomId = Array.from(socket.rooms)[1]
		const room = rooms.find(room => room.id == roomId)
		if (!room) return callback({ status: false })

		room.image = image
	})

	socket.on('draw', (currentPoint, prevPoint, color, thickness, tool) => {
		const roomId = Array.from(socket.rooms)[1]
		socket
			.to(roomId)
			.emit('draw', currentPoint, prevPoint, color, thickness, tool)
	})

	socket.on('clearScreen', callback => {
		const roomId = Array.from(socket.rooms)[1]
		const room = rooms.find(room => room.id == roomId)
		if (!room) return callback({ status: false })
		room.image = ''
		socket.to(roomId).emit('clearImage', { image: room.image, status: true })
	})
})
