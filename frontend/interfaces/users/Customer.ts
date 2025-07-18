export interface Customer {
  id?: string;
  firstName: string;
  middle?: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  imageUrl?: string;
  address: string;
  isBusiness: boolean;
}
