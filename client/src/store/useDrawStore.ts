import { create } from 'zustand'
import { sketchingTool } from '@/constants/sketchingToolsConstants'

export const useDrawStore = create<DrawStore>((set, get) => ({
	color: 'black',
	setColor: (color: string) => set({ color }),
	thickness: 5,
	setThickness: (thickness: number) => set({ thickness }),
	tool: 'Pencil',
	setTool: (tool: string) => set({ tool }),
	getTool: () => sketchingTool[get().tool],
	image: '',
	setImage: (image: string) => set({ image }),
	canvas: null,
	setCanvas: (canvasRef: HTMLCanvasElement | null) =>
		set({ canvas: canvasRef }),
}))

interface DrawStore {
	color: string
	setColor: (color: string) => void
	thickness: number
	setThickness: (thickness: number) => void
	tool: string
	setTool: (tool: string) => void
	getTool: () => Function
	image: string
	setImage: (image: string) => void
	canvas: HTMLCanvasElement | null
	setCanvas: (canvasRef: HTMLCanvasElement | null) => void
}
