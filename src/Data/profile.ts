export type Profile = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  role: Role;
  householdId: string;
};

export type Role = 'owner' | 'member';

export type ProfileCreate = Omit<Profile, 'id, userId, role, householdId'>;
