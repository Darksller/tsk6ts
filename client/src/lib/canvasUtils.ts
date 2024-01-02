export function drawLine({
	prevPoint,
	currentPoint,
	ctx,
	color = 'black',
	thickness = 5,
}: Draw) {
	const { x: currX, y: currY } = currentPoint
	const startPoint = prevPoint ?? currentPoint

	ctx.beginPath()
	ctx.lineWidth = thickness
	ctx.strokeStyle = color
	ctx.moveTo(startPoint.x, startPoint.y)
	ctx.lineTo(currX, currY)
	ctx.stroke()

	if (thickness > 2) {
		ctx.fillStyle = color
		ctx.beginPath()
		ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
		ctx.fill()
	}
}

export function erase({ currentPoint, ctx, thickness = 10 }: Draw) {
	const { x: currX, y: currY } = currentPoint
	ctx.clearRect(currX, currY, thickness * 2, thickness * 2)
}

export function clearScreen(canvas: HTMLCanvasElement | null) {
	if (!canvas) return

	const ctx = canvas.getContext('2d')
	if (!ctx) return

	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export function drawImage(canvas: HTMLCanvasElement | null, image: string) {
	if (!canvas) return
	const ctx = canvas.getContext('2d')
	if (!ctx) return
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
	const img = new Image()
	img.src = image
	img.onload = () => {
		ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight)
	}
}

export function computePointInCanvas(
	e: MouseEvent,
	canvas: HTMLCanvasElement | null
) {
	if (!canvas) return
	const rect = canvas.getBoundingClientRect()
	const x = e.clientX - rect.left
	const y = e.clientY - rect.top
	return { x, y }
}
