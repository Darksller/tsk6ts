import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { NicknameInput } from '@/components/NicknameInput'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'
import { socket } from '@/constants/socket'
import { useNavigate } from 'react-router-dom'

export function Home() {
	const [rooms, setRooms] = useState<Room[]>([])
	const { nickname } = useUserStore()
	const navigate = useNavigate()

	useEffect(() => {
		socket.on('rooms', rooms => {
			setRooms(rooms)
		})
		socket.emit('getRooms', (response: RoomsResponse) => {
			if (!response.status) return
			setRooms(response.rooms)
		})
		socket.emit('leaveRooms')
	}, [])

	if (!nickname) {
		return <NicknameInput />
	}

	function onAddClicked() {
		socket.emit('addNewRoom', (response: RoomResponse) => {
			if (response.status) navigate(`/room?id=${response.id}`)
		})
	}
	function onJoinClicked(roomNumber: string) {
		navigate(`/room?id=${roomNumber}`)
	}

	return (
		<>
			<div className='flex items-center justify-center'>
				<Card className=''>
					<CardHeader className='items-center'>
						<CardTitle className='text-2xl'>
							Create new room for drawing
						</CardTitle>
					</CardHeader>
					<CardContent className='flex items-center justify-center'>
						<Button className='text-sm' onClick={onAddClicked}>
							<PlusCircledIcon className='mr-1' />
							Create room
						</Button>
					</CardContent>
				</Card>
			</div>
			<div className='mt-2 flex flex-col items-center justify-center'>
				{rooms.map(room => (
					<Card key={room.id} className='w-[350px] mt-3'>
						<CardHeader className='items-center'>
							<CardTitle className='text-lg'>Room {room.id}</CardTitle>
						</CardHeader>
						<CardContent className='flex items-center justify-center'>
							<Button
								className='text-sm'
								onClick={() => onJoinClicked(room.id)}
							>
								Join room
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	)
}
