/**
 * Types for Shot data
 */

export interface ShotDataPoint {
  timestamp: number;  // milliseconds since start
  temperature: number;
  pressure: number;
  flow: number;
  weight?: number;
}

export interface ShotMetadata {
  profile: string;
  beanName?: string;
  grindSetting?: number;
  doseWeight?: number;
  brewRatio?: number;
  notes?: string;
}

export interface ShotUpload {
  metadata: ShotMetadata;
  dataPoints: ShotDataPoint[];
}

export interface ShotSummary {
  id: string;
  date: string;
  profileName: string;
  duration: number;
  extractionYield?: number;
  finalWeight?: number;
}