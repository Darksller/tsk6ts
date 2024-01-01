import {
	drawLine,
	erase,
	//fill
} from '@/lib/drawing'

export const sketchingTool: Record<string, Function> = {
	'': () => {},
	Pencil: drawLine,
	Eraser: erase,
	//Filling: fill,
}
