export interface Product {
  quantity: number;
  id: number;
  name: string;
  price: number;
  images: string[];
  brand: string;
  category: string;
  characteristics: Characteristic[];
  rating: number;
  count_review: number;
  guarantee: number;
}

export interface Characteristic {
  characteristic: string;
  unit_type: string;
  value: string;
}
