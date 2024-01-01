import { ChromePicker, ColorResult } from 'react-color'
import { useDrawStore } from '@/store/useDrawStore'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import SketchingTools from '../SketchingTools'
import FigurePicker from '../FigurePicker'
import { Slider } from '../ui/slider'
import { Button } from '../ui/button'
import { memo } from 'react'
import { clear } from '@/lib/drawing'

function SketchingToolbar() {
	const { color, setColor, setThickness, thickness, canvas, setImage } =
		useDrawStore()
	function onChangeColor(event: ColorResult) {
		setColor(event.hex)
	}

	function onThicknessChange(event: number[]) {
		setThickness(event[0])
	}

	function onClearButton(): void {
		clear(canvas)
		setImage('')
	}

	return (
		<Card className='fixed right-0 top-1/2 -translate-y-1/2 '>
			<CardHeader className='items-center '>
				<CardTitle>Toolbar</CardTitle>
				<CardDescription className='text-gray-200'>
					Drawing tools
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col items-center mr-3 ml-3'>
					<ChromePicker
						color={color}
						onChange={onChangeColor}
						disableAlpha={true}
					/>
					<SketchingTools />
					<Slider
						name='Boldness'
						className='mt-3 text-white'
						defaultValue={[thickness]}
						min={1}
						max={10}
						step={1}
						onValueChange={onThicknessChange}
					/>
					<FigurePicker />
					<div>
						<Button className='mt-3 ' onClick={onClearButton}>
							Clear area
						</Button>
						<Button className='ml-3 mt-3 '>Save to JPEG</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export const Toolbar = memo(SketchingToolbar)
