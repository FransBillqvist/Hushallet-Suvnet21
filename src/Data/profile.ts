export type Profile = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  role: string;
  householdId: string;
};

export type ProfileCreate = Omit<Profile, 'id, userId, role, householdId'>;
