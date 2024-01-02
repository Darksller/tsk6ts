import { useEffect, useState } from 'react'
import { useDrawStore } from '@/store/useDrawStore'
import { drawImage } from '@/lib/canvasUtils'
import { socket } from '@/constants/socket'
import { useNavigate } from 'react-router-dom'

export function useUtility() {
	const [sizes, setSizes] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	})
	const { canvas, image, setImage } = useDrawStore()
	const navigate = useNavigate()

	useEffect(() => {
		const resizeWindow = () => {
			setSizes({
				height: window.innerHeight,
				width: window.innerWidth,
			})
			drawImage(canvas, image)
		}

		const loadWindow = () => {
			socket.emit('getImage', (response: RoomResponse) => {
				if (!response.status) return navigate('/')
				setImage(response.image)
				drawImage(canvas, response.image)
			})
		}

		window.addEventListener('resize', resizeWindow)
		window.addEventListener('load', loadWindow)
		return () => {
			window.removeEventListener('resize', resizeWindow)
			window.removeEventListener('load', loadWindow)
		}
	}, [image, canvas])

	return { sizes }
}
