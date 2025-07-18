import { UnnormalizedCustomer } from "../../interfaces/users/UnnormalizedCustomer";
import { Customer } from "../../interfaces/users/Customer";

export function normalizeCustomer(values: UnnormalizedCustomer): Customer {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    phone: values.phone,
    email: values.email,
    password: values.password,
    imageUrl:
      values.imageUrl ||
      "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    address: values.address,
    isBusiness: values.isBusiness || false,
  };
}
