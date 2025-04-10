import { Component, input } from '@angular/core';

import { PostComment } from '../../data';
import { AvatarCircleComponent, calcDatePipe } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, calcDatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
