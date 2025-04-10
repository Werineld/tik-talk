import { ChatsService } from '../../data/services/chats.service';
import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, from, mapTo, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProfileService } from '@tt/profile';

@Component({
  selector: 'app-chat-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatsService = inject(ChatsService);
  me = inject(ProfileService);

  activeChat$ = this.route.params.pipe(
    filter((params) => params['id']), // изменено с userId на id
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter((params) => !!params['userId']), // добавляем проверку userId
          switchMap(({ userId }) => {
            return this.chatsService.createChat(userId).pipe(
              switchMap((chat) => {
                // Обрабатываем Promise навигации
                return from(this.router.navigate(['chats', chat.id])).pipe(
                  mapTo(null), // возвращаем null после навигации
                  catchError(() => of(null)) // обрабатываем ошибки навигации
                );
              }),
            );
          }),
        );
      }
      return this.chatsService.getChatById(id).pipe(
        catchError(() => {
          // Обрабатываем случай, когда чат не найден
          // Можно перенаправить на страницу по умолчанию или показать сообщение
          this.router.navigate(['chats']);
          return of(null);
        })
      );
    }),
  );
}
