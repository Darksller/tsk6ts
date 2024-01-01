import { create } from 'zustand'

export const useRoomStore = create<RoomStore>(set => ({
	roomId: null,
	setRoomId: (roomId: string | null) => set({ roomId }),
}))

interface RoomStore {
	roomId: string | null
	setRoomId: (roomId: string | null) => void
}
