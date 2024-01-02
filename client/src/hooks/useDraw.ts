import { sketchingTool } from '@/constants/sketchingToolsConstants'
import { socket } from '@/constants/socket'
import { computePointInCanvas } from '@/lib/canvasUtils'
import { useDrawStore } from '@/store/useDrawStore'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useDraw = () => {
	const { getTool, setImage, color, thickness, canvas, tool } = useDrawStore()
	const [mouseDown, setMouseDown] = useState(false)
	const prevPoint = useRef<null | Point>(null)
	const onMouseDown = () => setMouseDown(true)
	const navigate = useNavigate()

	const drawTool = getTool()

	useEffect(() => {
		socket.on('draw', (currPoint, prPoint, color, thickness, tool) => {
			if (!canvas) return
			const ctx = canvas.getContext('2d')
			if (!ctx) return

			sketchingTool[tool]({
				ctx,
				currentPoint: currPoint,
				prevPoint: prPoint,
				color: color,
				thickness: thickness,
			})
		})
	}, [canvas])

	useEffect(() => {
		const onMouseMoveHandler = (e: MouseEvent) => {
			if (!mouseDown || !canvas) return
			const currentPoint = computePointInCanvas(e, canvas)
			const ctx = canvas.getContext('2d')
			if (!ctx || !currentPoint) return
			drawTool({
				ctx,
				currentPoint,
				prevPoint: prevPoint.current,
				color,
				thickness,
			})

			socket.emit(
				'saveImage',
				canvas!.toDataURL(),
				(response: RoomResponse) => {
					if (!response.status) navigate('/')
				}
			)
			socket.emit(
				'draw',
				currentPoint,
				prevPoint.current,
				color,
				thickness,
				tool
			)

			prevPoint.current = currentPoint
		}

		const mouseUpHandler = () => {
			setMouseDown(false)
			setImage(canvas!.toDataURL())

			prevPoint.current = null
		}

		canvas?.addEventListener('mousemove', onMouseMoveHandler)
		window.addEventListener('mouseup', mouseUpHandler)

		return () => {
			canvas?.removeEventListener('mousemove', onMouseMoveHandler)
			window.removeEventListener('mouseup', mouseUpHandler)
		}
	}, [mouseDown])

	return { onMouseDown }
}
