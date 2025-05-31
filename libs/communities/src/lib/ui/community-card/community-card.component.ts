import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output, signal,
  WritableSignal
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ImgUrlPipe, PluralPipe, SvgIconComponent } from '@tt/common-ui';
import { Community, GlobalStoreService } from '@tt/data-access';
import { CommunityService } from '@tt/data-access';

@Component({
  selector: 'tt-community-card',
  imports: [CommonModule, SvgIconComponent, ImgUrlPipe, PluralPipe],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardComponent implements OnInit {
  @Input() community!: Community;

  me = inject(GlobalStoreService).me
  communityService = inject(CommunityService)

  isJoined!: WritableSignal<boolean>;

  ngOnInit(): void {
    // Инициализация сигнала, когда компонент уже получил @Input
    this.isJoined = signal(this.community.isJoined);
  }

  subscribe(id: number) {
    this.communityService.subscribeCommunity(id).subscribe({
      next: () => {
        this.isJoined.set(true)
      }
    });
  }

  unsubscribe(id: number) {
    this.communityService.unsubscribeCommunity(id).subscribe({
      next: () => {
        this.isJoined.set(false)
      }
    });
  }

}
