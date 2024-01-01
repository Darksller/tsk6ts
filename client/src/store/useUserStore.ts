import { create } from 'zustand'

export const useUserStore = create<UserStore>(set => ({
	nickname: localStorage.getItem('nickname'),
	setNickname: (nickname: string | null) => set({ nickname }),
}))

interface UserStore {
	nickname: string | null
	setNickname: (nickname: string | null) => void
}
