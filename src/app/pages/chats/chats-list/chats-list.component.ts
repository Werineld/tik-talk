import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { ChatsService } from '../../../data/services/chats.service';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';

@Component({
  selector: 'app-chats-list',
  imports: [
    ChatsBtnComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  chatsService = inject(ChatsService);

  filterChatsControl = new FormControl('');

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          const filterValue = inputValue ? inputValue.toLowerCase() : '';
          return chats.filter((chat) => {
            return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLowerCase()
              .includes(filterValue);
          });
        })
      );
    })
  );
}
