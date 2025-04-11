import { ChatsService } from './services/chats.service';
import { Chat, lastMessageRes, Message } from './interfaces/chats.interface';
import { ChatWSRxjsService } from './services/chat-ws-rxjs.service';
import { ChatWSMessage } from './interfaces/chat-ws-message.interface';
import { ChatConnectionWSParams, ChatWSService } from './interfaces/chat-ws-service.interface';

export { ChatsService, ChatWSRxjsService };
export type { Chat, Message, lastMessageRes, ChatWSMessage, ChatWSService, ChatConnectionWSParams };
