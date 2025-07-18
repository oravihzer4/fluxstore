export interface UnnormalizedProduct {
  id?: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  inStock: boolean;
  createdAt?: Date;
}
