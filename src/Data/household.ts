export type Household = {
  id: string;
  name: string;
  code: string;
};

export type HouseholdCreate = Omit<Household, 'id'>;
