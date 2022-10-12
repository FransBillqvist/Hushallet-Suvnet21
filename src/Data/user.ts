export type User = {
  id: string;
  username: string;
  password: string;
};

export type UserCreate = Omit<User, 'id'>;
