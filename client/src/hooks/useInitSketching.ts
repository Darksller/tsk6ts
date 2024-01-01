import { socket } from '@/constants/socket'
import { useDrawStore } from '@/store/useDrawStore'
import { useRoomStore } from '@/store/useRoomStore'
import { useEffect, useRef, useState } from 'react'

export const useInitSketching = () => {
	const [mouseDown, setMouseDown] = useState(false)
	const prevPoint = useRef<null | Point>(null)
	const { getTool, setImage, color, thickness, canvas, image } = useDrawStore()
	const { roomId } = useRoomStore()
	const onMouseDown = () => setMouseDown(true)
	const tool = getTool()

	useEffect(() => {
		const onMouseMoveHandler = (e: MouseEvent) => {
			if (!mouseDown || !canvas) return
			const currentPoint = computePointInCanvas(e)
			const ctx = canvas.getContext('2d')
			if (!ctx || !currentPoint) return
			tool({
				ctx,
				currentPoint,
				prevPoint: prevPoint.current,
				color,
				thickness,
			})

			prevPoint.current = currentPoint
		}

		const computePointInCanvas = (e: MouseEvent) => {
			if (!canvas) return
			const rect = canvas.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			return { x, y }
		}

		const mouseUpHandler = () => {
			setMouseDown(false)
			setImage(canvas!.toDataURL())

			socket.emit('saveImage', roomId, image)

			prevPoint.current = null
		}

		canvas?.addEventListener('mousemove', onMouseMoveHandler)
		window.addEventListener('mouseup', mouseUpHandler)

		return () => {
			canvas?.removeEventListener('mousemove', onMouseMoveHandler)
			window.removeEventListener('mouseup', mouseUpHandler)
		}
	}, [mouseDown, tool])

	return { onMouseDown }
}
