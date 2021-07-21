import { Boutique } from './boutique';
import { Colors } from './colors';

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

}
