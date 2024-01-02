import { create } from 'zustand'

export const useRoomStore = create<RoomStore>(set => ({
	roomId: localStorage.getItem('roomId'),
	setRoomId: (roomId: string | null) =>
		set(() => {
			localStorage.setItem('roomId', roomId!)
			return { roomId: roomId }
		}),
}))

interface RoomStore {
	roomId: string | null
	setRoomId: (roomId: string | null) => void
}
