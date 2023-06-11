import { AngleMetadata } from 'src/common/models/Procedure';

export interface MovementBean {
  id?: number;
  type?: string;
  observation?: string;
}
export interface RulesMetadata {
  movement_name?: string;
  value?: string;
  description?: string;
  image?: string;
  angle?: AngleMetadata;
}

export interface AngleBean {
  min?: number;
  max?: number;
}
