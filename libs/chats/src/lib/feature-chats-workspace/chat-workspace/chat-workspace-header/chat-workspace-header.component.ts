import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '@tt/data-access';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
