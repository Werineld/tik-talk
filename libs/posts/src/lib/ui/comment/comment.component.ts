import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PostComment } from '@tt/data-access';
import { AvatarCircleComponent, calcDatePipe } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, calcDatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  comment = input<PostComment>();
}
