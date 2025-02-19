import { Email , User } from "@prisma/client";

export type CategoryProps = {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
};
export type SavingProps = {
  amount: number;
  month: string;
  name: string;
  userId: string;
  paymentDate: any;
};
export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
};
export type LoginProps = {
  email: string;
  password: string;
};
export type ForgotPasswordProps = {
  email: string;
};

// types/types.ts

export interface RoleFormData {
  displayName: string;
  description?: string;
  permissions: string[];
}

// export interface UserWithRoles extends User {
//   roles: Role[];
// }

export interface RoleOption {
  label: string;
  value: string;
}

export interface UpdateUserRoleResponse {
  error: string | null;
  status: number;
  // data: UserWithRoles | null;
}

export interface RoleResponse {
  id: string;
  displayName: string;
  description?: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailData {
  to: string
  subject: string
  content: string
  fromId: string
}

export interface EmailResponse {
  status: number
  data?: Email & {
    from: Pick<User, 'name' | 'email' | 'image'>
    to: Pick<User, 'name' | 'email' | 'image'>
  }
  error?: string
}

export interface EmailListResponse {
  status: number
  data?: {
    received: (Email & {
      from: Pick<User, 'name' | 'email' | 'image'>
      to: Pick<User, 'name' | 'email' | 'image'>
    })[]
    sent: (Email & {
      from: Pick<User, 'name' | 'email' | 'image'>
      to: Pick<User, 'name' | 'email' | 'image'>
    })[]
  }
  error?: string
}

export interface EmailData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  subject: string;
  content: string;
  fromId: string;
  toId: string;
  from: {
    name: string;
    email: string;
    image: string | null;
  };
  // to: {
  //   name: string;
  //   email: string;
  //   image: string | null;
  // };
  read: boolean;
}
