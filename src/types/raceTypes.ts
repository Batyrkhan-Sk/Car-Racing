export type RaceStatusType = 'started' | 'driving' | 'stopped' | 'broken';

export interface RaceStatus {
  id: string;
  velocity: number;
  distance: number;
  status: RaceStatusType;
}
