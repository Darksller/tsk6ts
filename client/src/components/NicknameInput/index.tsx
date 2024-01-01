import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { useUserStore } from '@/store/useUserStore'

export function NicknameInput() {
	const { setNickname } = useUserStore()
	const [nickname, setNick] = useState('')

	function onSaveNickname(): void {
		if (nickname.trim() == '') return
		localStorage.setItem('nickname', nickname.trim())
		setNickname(nickname.trim())
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			<Card className=''>
				<CardHeader className='items-center '>
					<CardTitle className='text-2xl'>Enter your nickname:</CardTitle>
				</CardHeader>
				<CardContent className='flex items-center justify-center'>
					<div className='flex w-full max-w-sm items-center space-x-2'>
						<Input
							type='nickname'
							placeholder='Nickname'
							value={nickname}
							onChange={e => setNick(e.target.value)}
						/>
						<Button type='submit' onClick={onSaveNickname}>
							Save
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
