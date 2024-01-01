export function drawLine({
	prevPoint,
	currentPoint,
	ctx,
	color = 'black',
	thickness = 5,
}: Draw) {
	const { x: currX, y: currY } = currentPoint
	const lineColor = color
	const lineWidth = thickness

	const startPoint = prevPoint ?? currentPoint

	ctx.beginPath()
	ctx.lineWidth = lineWidth
	ctx.strokeStyle = lineColor
	ctx.moveTo(startPoint.x, startPoint.y)
	ctx.lineTo(currX, currY)
	ctx.stroke()

	if (lineWidth > 2) {
		ctx.fillStyle = lineColor
		ctx.beginPath()
		ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
		ctx.fill()
	}
}

export function erase({ currentPoint, ctx, thickness = 10 }: Draw) {
	const { x: currX, y: currY } = currentPoint
	ctx.clearRect(currX, currY, thickness, thickness)
}

export function clear(canvasRef: HTMLCanvasElement | null) {
	const canvas = canvasRef
	if (!canvas) return

	const ctx = canvas.getContext('2d')
	if (!ctx) return

	ctx.clearRect(0, 0, canvas.width, canvas.height)
}
