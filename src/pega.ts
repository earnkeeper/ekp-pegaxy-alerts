export type Pega = Readonly<{
  id: number;
  name: string;
  class: number;
  ownerId: number;
  renterId: number;
  energy: number;
  lastReduceEnergy: number;
  inService: string;
  inRace: string;
  gender: string;
  bloodLine: string;
  breedType: string;
  breedTime: number;
  designId: number;
  fatherId: number;
  motherId: number;
  total_races: number;
  win: number;
  lose: number;
  speed: number;
  strength: number;
  wind: number;
  water: number;
  fire: number;
  lighting: number;
  canRace: boolean;
  lastBreedTime: number;
  bornTime: number;
  isBanned: boolean;
  canRaceAt: number;
}>;