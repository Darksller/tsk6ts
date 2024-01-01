import { Card } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import {
	CameraIcon,
	CircleIcon,
	ScissorsIcon,
	SquareIcon,
	TextIcon,
} from '@radix-ui/react-icons'

export default function FigurePicker() {
	function onCircleClick() {
		console.log('onCircleClick')
	}
	function onSquareClick() {
		console.log('onSquareClick')
	}
	function onScissorsClick() {
		console.log('onScissorsClick')
	}
	function onCameraClick() {
		console.log('onCameraClick')
	}
	function onTextClick() {
		console.log('onTextClick')
	}

	return (
		<Carousel className='mt-3'>
			<CarouselContent className='-ml-1 max-w-48 max-h-48'>
				<CarouselItem className='lg:basis-1/2 p-1'>
					<Card
						className='flex aspect-square items-center justify-center bg-purple-700 border-2'
						onClick={onCircleClick}
					>
						<CircleIcon className='h-20 w-20 text-white' />
					</Card>
				</CarouselItem>
				<CarouselItem className='lg:basis-1/2 p-1'>
					<Card
						className='flex aspect-square items-center justify-center bg-purple-700 border-2'
						onClick={onSquareClick}
					>
						<SquareIcon className='h-20 w-20 text-white' />
					</Card>
				</CarouselItem>
				<CarouselItem className='lg:basis-1/2 p-1'>
					<Card
						className='flex aspect-square items-center justify-center bg-purple-700 border-2'
						onClick={onTextClick}
					>
						<TextIcon className='h-20 w-20 text-white' />
					</Card>
				</CarouselItem>
				<CarouselItem className='lg:basis-1/2 p-1'>
					<Card
						className='flex aspect-square items-center justify-center bg-purple-700 border-2'
						onClick={onScissorsClick}
					>
						<ScissorsIcon className='h-20 w-20 text-white' />
					</Card>
				</CarouselItem>
				<CarouselItem className='lg:basis-1/2 p-1'>
					<Card
						className='flex aspect-square items-center justify-center bg-purple-700 border-2'
						onClick={onCameraClick}
					>
						<CameraIcon className='h-20 w-20 text-white' />
					</Card>
				</CarouselItem>
			</CarouselContent>
			<CarouselPrevious className='ml-2' />
			<CarouselNext className='mr-2.5' />
		</Carousel>
	)
}
