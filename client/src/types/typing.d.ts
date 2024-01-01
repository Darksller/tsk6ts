type Draw = {
	ctx: CanvasRenderingContext2D
	currentPoint: Point
	prevPoint?: Point | null
	color?: string
	thickness?: number
}

type Point = { x: number; y: number }

type RoomResponse = {
	id: string
	image: string
	status: boolean
}
