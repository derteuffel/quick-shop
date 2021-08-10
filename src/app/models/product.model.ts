import { Boutique } from './boutique';
import { Colors } from './colors';
import { User } from './user';

export class Product{
  id?: number;
  name?: string;
  price?: number;
  pictureUrl?: string;
  category?: string;
  type?: string;
  measure?: string;
  description?: string;
  quantity?: number;
  province: string;
  commune: string;
  devise: string;
  pictures?: string[];
  boutique?: Boutique;
  user: User

}
