import { Canvas } from '@/components/Canvas'
import { Toolbar } from '@/components/Toolbar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { socket } from '@/constants/socket'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function DrawBoard() {
	const navigate = useNavigate()
	const location = useLocation()
	const roomId = new URLSearchParams(location.search).get('id')

	useEffect(() => {
		socket.emit('joinRoom', roomId, (response: RoomResponse) => {
			if (!response.status) return navigate('/')
		})
	}, [])

	return (
		<TooltipProvider delayDuration={0}>
			<Toolbar />
			<Canvas />
		</TooltipProvider>
	)
}
