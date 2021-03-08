import { Colors } from "./colors";

export class Product{
  id: number;
  name: string;
  price: number;
  pictureUrl: string;
  category: string;
  genre: string;
  quality: string;
  marque: string;
  colors: string[];
  description: string;
  pictures: string[];

  constructor(id: number, name: string, price: number, pictureUrl: string, category: string, 
    genre: string, quality: string, marque: string, colors: string[], description: string, pictures: string[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.pictureUrl = pictureUrl;
    this.category = category;
    this.genre = genre;
    this.quality = quality;
    this.marque = marque;
    this.colors = colors;
    this.description = description;
    this.pictures = pictures;

  }
}
