import { ChangeDetectionStrategy, Component, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessageInputComponent } from '../../../ui/message-input/message-input.component';
import { ChatsService } from '@tt/data-access';
import { Chat } from '@tt/data-access';
import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapperComponent {
  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);

  chatsService = inject(ChatsService);

  chat = input.required<Chat>();

  messages = this.chatsService.groupedMessages;

  ngOnInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.resizeFeed();
        console.log(1);
      });
  }

  resizeFeed() {
    const height = window.innerHeight - 50 - 65;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  async onSendMessage(messageText: string) {
    this.chatsService.wsAdapter.sendMessage(
      messageText,
      this.chat().id
    )


    // await firstValueFrom(
    //   this.chatsService.sendMessage(this.chat().id, messageText),
    // );

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }
}
