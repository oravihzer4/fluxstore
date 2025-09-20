import type { UserAddress } from "./UserAddress";
import type { UserImage } from "./UserImage";
import type { UserName } from "./UserName";

export interface User {
  _id: string;
  name: UserName;
  phone: string;
  email: string;
  password: string;
  image: UserImage;
  address: UserAddress;
  isAdmin?: boolean;
}
