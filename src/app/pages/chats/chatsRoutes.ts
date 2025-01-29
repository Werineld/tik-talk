import {ChatsPageComponent} from './chats.component'
import {ChatWorkspaceComponent} from './chat-workspace/chat-workspace.component'


export const chatsRoutes = [
	{
		path: '',
		component: ChatsPageComponent,
		children: [
			{path: ':id', component: ChatWorkspaceComponent}
		]
	}
]
