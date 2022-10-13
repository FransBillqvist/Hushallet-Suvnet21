export type Chore = {
  id: string;
  name: string;
  description: string;
  demanding: number;
  frequency: number;
  householdId: string;
};

export type ChoreCreate = Omit<Chore, 'id, householdId'>;
