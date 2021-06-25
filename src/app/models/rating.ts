import {Product} from "./product.model";
import {User} from "./user";

export class Rating {

  id: number;
  product: Product;
  rating: number;
  comments: string;
  user: User;
}
