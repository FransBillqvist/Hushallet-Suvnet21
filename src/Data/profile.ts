export type Profile = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  role: Role;
  householdId: string;
};

type Role = 'owner' | 'member';

export type ProfileCreate = Omit<Profile, 'id, userId, role, householdId'>;
