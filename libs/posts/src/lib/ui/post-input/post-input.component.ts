import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { FormsModule } from '@angular/forms';
import { GlobalStoreService } from '@tt/data-access';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);
  #globalStoreService = inject(GlobalStoreService);

  isCommentInput = input(false);
  postId = input<number>(0);
  profile = inject(GlobalStoreService).me;

  @Output() created = new EventEmitter<string>();

  @HostBinding('class.dashed')
  get isComment() {
    return this.isCommentInput();
  }

  postText = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText.trim()) return;

    this.created.emit(this.postText);

    this.postText = '';
  }
}
