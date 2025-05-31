import { Profile } from '../../profile/interfaces/profile.interface';

export interface Community {
  id: number,
  admin: Profile,
  name: string,
  themes: [],
  tags: [],
  bannerUrl: string,
  avatarUrl: string,
  description: string,
  subscribersAmount: number,
  createdAt: string,
  isJoined: boolean,
}
