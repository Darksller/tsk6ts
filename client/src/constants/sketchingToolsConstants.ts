import {
	drawLine,
	erase,
	//fill
} from '@/lib/canvasUtils'

export const sketchingTool: Record<string, Function> = {
	'': () => {},
	Pencil: drawLine,
	Eraser: erase,
	//Filling: fill,
}
