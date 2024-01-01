import {
	Pencil1Icon,
	EraserIcon,
	//BlendingModeIcon,
} from '@radix-ui/react-icons'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { MyTooltip } from '../Tooltip'
import { useDrawStore } from '@/store/useDrawStore'

export default function SketchingTools() {
	const { tool, setTool } = useDrawStore()
	function onToolChange(event: string) {
		setTool(event)
	}
	return (
		<ToggleGroup
			type='single'
			className='mt-5'
			defaultValue='Pencil'
			value={tool}
			onValueChange={onToolChange}
		>
			<ToggleGroupItem value='Pencil' className='toggleItem'>
				<MyTooltip
					element={<Pencil1Icon className='h-7 w-7 text-white ' />}
					tooltip='Pencil'
				/>
			</ToggleGroupItem>
			<ToggleGroupItem value='Eraser' className='toggleItem'>
				<MyTooltip
					element={<EraserIcon className='h-7 w-7 text-white' />}
					tooltip='Eraser'
				/>
			</ToggleGroupItem>
			{/* <ToggleGroupItem value='Filling' className='toggleItem'>
				<MyTooltip
					element={<BlendingModeIcon className='h-7 w-7 text-white' />}
					tooltip='Filling'
				/>
			</ToggleGroupItem> */}
		</ToggleGroup>
	)
}
