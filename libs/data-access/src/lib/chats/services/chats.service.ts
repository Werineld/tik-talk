import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Chat, lastMessageRes, Message } from '../interfaces/chats.interface';
import { ProfileService } from '../../profile';
import { map, Observable } from 'rxjs';
import { ChatWSService } from '../interfaces/chat-ws-service.interface';
import { AuthService } from '../../auth';
import { ChatWSMessage } from '../interfaces/chat-ws-message.interface';
import { isNewMessage, isUnreadMessage } from '../interfaces/type-guards';
import { ChatWSRxjsService } from './chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  #authService = inject(AuthService);
  me = inject(ProfileService).me;

  wsAdapter: ChatWSService = new ChatWSRxjsService()
  unreadMessageCount = signal(0)

  activeChatMessages = signal<Message[]>([]);

  baseApiUrl = '/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  // messageUrl = `${this.baseApiUrl}message/`;

  connectWS() {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage
    }) as Observable<ChatWSMessage>;
  }

  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return

    if (isUnreadMessage(message)) {
      this.unreadMessageCount.set(message.data.count);
    }

    if (isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false
        }
      ])
    }
  }

  groupedMessages = computed(() => {
    const messages = this.activeChatMessages();

    const grouped = messages.reduce(
      (acc, message) => {
        const day = new Intl.DateTimeFormat('ru-RU', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(message.createdAt));

        if (!acc[day]) {
          acc[day] = { day, messages: [] };
        }

        acc[day].messages.push(message);
        return acc;
      },
      {} as Record<string, { day: string; messages: Message[] }>,
    );

    return Object.values(grouped);
  });

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<lastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => ({
          ...message,
          user:
            chat.userFirst.id === message.userFromId
              ? chat.userFirst
              : chat.userSecond,
          isMine: message.userFromId === this.me()!.id,
        }));

        // Обновляем активные сообщения
        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      }),
    );
  }

  // sendMessage(chatId: number, message: string) {
  //   return this.http.post(
  //     `${this.messageUrl}send/${chatId}`,
  //     {},
  //     {
  //       params: { message },
  //     },
  //   );
  // }

}
