import { useEffect, useState } from 'react'
import { useInitSketching } from './useInitSketching'
import { useDrawStore } from '@/store/useDrawStore'

export function useDraw(image: string) {
	const { canvas } = useDrawStore()
	const { onMouseDown } = useInitSketching()

	const [sizes, setSizes] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	})

	useEffect(() => {
		const draw = () => {
			setSizes({
				height: window.innerHeight,
				width: window.innerWidth,
			})

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

		window.addEventListener('resize', draw)

		return () => {
			window.removeEventListener('resize', draw)
		}
	}, [image])

	return { sizes, onMouseDown }
}
