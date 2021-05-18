import { Boutique } from './boutique';
import { Colors } from './colors';

export class Product{
  id: number;
  name: string;
  price: number;
  pictureUrl: string;
  category: string;
  type: string;
  marque: string;
  description: string;
  quantity: number;
  pictures: string[];
  boutique: Boutique;

  constructor(id: number, name: string, price: number, pictureUrl: string, category: string,
              type: string, quantity: number, marque: string, description: string, pictures: string[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.pictureUrl = pictureUrl;
    this.category = category;
    this.type = type;
    this.quantity = quantity;
    this.marque = marque;
    this.description = description;
    this.pictures = pictures;

  }
}
