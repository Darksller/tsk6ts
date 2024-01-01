import { Canvas } from '@/components/Canvas'
import { Toolbar } from '@/components/Toolbar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { socket } from '@/constants/socket'
import { useDrawStore } from '@/store/useDrawStore'
import { useRoomStore } from '@/store/useRoomStore'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Draw() {
	const { setImage } = useDrawStore()
	const { setRoomId } = useRoomStore()
	const navigate = useNavigate()
	const location = useLocation()
	const roomId = new URLSearchParams(location.search).get('id')

	useEffect(() => {
		socket.emit('joinRoom', roomId, (response: RoomResponse) => {
			if (!response.status) return navigate('/')

			setRoomId(roomId)
			setImage(response.image)
		})

		socket.on('newImage', image => {
			setImage(image)
		})
	}, [])

	return (
		<TooltipProvider delayDuration={0}>
			<Toolbar />
			<Canvas />
		</TooltipProvider>
	)
}
