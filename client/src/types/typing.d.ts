type Draw = {
	ctx: CanvasRenderingContext2D
	currentPoint: Point
	prevPoint?: Point | null
	color?: string
	thickness?: number
}

type Point = { x: number; y: number }

type Room = {
	id: string
	image: string
}

type RoomResponse = {
	id: string
	image: string
	status: boolean
}

type RoomsResponse = {
	rooms: Room[]
	status: boolean
}
