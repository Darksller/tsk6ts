import { useDraw } from '@/hooks/useDraw'
import { useDrawStore } from '@/store/useDrawStore'
import { useCallback } from 'react'

export function Canvas() {
	const { image, setCanvas } = useDrawStore()
	const { onMouseDown, sizes } = useDraw(image)

	const cbRef = useCallback((element: HTMLCanvasElement | null) => {
		setCanvas(element)
	}, [])

	return <canvas {...sizes} ref={cbRef} onMouseDown={onMouseDown} />
}
