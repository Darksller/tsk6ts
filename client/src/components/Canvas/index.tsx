import { useUtility } from '@/hooks/useUtility'
import { useDraw } from '@/hooks/useDraw'
import { useDrawStore } from '@/store/useDrawStore'
import { useCallback, useEffect } from 'react'
import { socket } from '@/constants/socket'
import { drawImage } from '@/lib/canvasUtils'

export function Canvas() {
	const { setCanvas, setImage, canvas } = useDrawStore()
	const { onMouseDown } = useDraw()
	const { sizes } = useUtility()

	useEffect(() => {
		socket.emit('getImage', (response: RoomResponse) => {
			if (!response.status) return
			setImage(response.image)
			drawImage(canvas, response.image)
		})

		socket.on('clearImage', (response: RoomResponse) => {
			if (!response.status) return
			setImage(response.image)
			drawImage(canvas, response.image)
		})
	}, [canvas, setImage])

	const cbRef = useCallback(
		(element: HTMLCanvasElement | null) => {
			setCanvas(element)
		},
		[setCanvas]
	)

	return <canvas {...sizes} ref={cbRef} onMouseDown={onMouseDown} />
}
