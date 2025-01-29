import { Profile } from './profile.interface'

export interface Chat {
	id: number
	userFirst: Profile
	userSecond: Profile
	messages: Message[]
	companion?: Profile
}

export interface Message {
	id: number
	userFromId: number
	personalChatId: number
	text: string | null
	createdAt: string
	isRead: boolean
	UpdatedAt: string
	user?: Profile
  isMine?: boolean
}

export interface lastMessageRes {
	id: number
	userFrom: Profile
	message: string
}
