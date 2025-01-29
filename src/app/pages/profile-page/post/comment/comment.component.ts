import {Component, input} from '@angular/core';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component'
import {Comment} from '../../../../data/interfaces/post.interface'
import {calcDatePipe} from '../../../../helpers/pipes/calc-date.pipe'


@Component({
  selector: 'app-comment',
  imports: [
    AvatarCircleComponent,
    calcDatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input<Comment>()
}
