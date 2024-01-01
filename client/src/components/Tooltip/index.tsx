import React from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'

export function MyTooltip({
	element,
	tooltip,
}: {
	element: React.ReactElement
	tooltip: React.ReactElement | string
}) {
	return (
		<Tooltip>
			<TooltipTrigger>{element}</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	)
}
