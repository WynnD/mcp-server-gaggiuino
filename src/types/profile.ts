/**
 * Types for espresso profiles
 */

export enum BrewPhase {
  PREINFUSION = 'preinfusion',
  RAMP = 'ramp',
  FLAT = 'flat',
  DECLINE = 'decline',
  COOLDOWN = 'cooldown'
}

export interface ProfilePhase {
  type: BrewPhase;
  duration: number; // in seconds
  pressure?: number; // in bars
  flow?: number; // in ml/s
  temperature?: number; // in celsius
}

export interface ProfileTemplate {
  id: string;
  name: string;
  description?: string;
  author?: string;
  created?: string;
  modified?: string;
  phases: ProfilePhase[];
  defaultGrind?: number;
  defaultDose?: number;
  defaultYield?: number;
  defaultRatio?: number;
  tags?: string[];
}

export interface ProfileData {
  profile: ProfileTemplate;
  history: {
    lastUsed?: string;
    usage: number;
    favorited: boolean;
  };
}