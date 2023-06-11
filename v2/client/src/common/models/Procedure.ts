import { MovementBean, RulesMetadata } from 'src/common/models/Movement';

// Model do back
export interface ProcedureBean {
  id?: number;
  date?: string;
  type?: string;
  procedure?: string;
  movements?: MovementBean[];
  observation?: string;
}
// Metadata do arquivo Procedure no backend (cotem cada tipo de procedimento e movimento)
export interface ProcedureMetadata {
  uuid?: string; // Metadata da class
  articulation_name?: string;
  value?: string;
  min_sensor?: number;
  sensor_positions?: SensorPositionMetadata[];
  rules?: RulesMetadata[]; // Na verdade são os movimentos
}
export interface AngleMetadata {
  min: number;
  max: number;
}
export interface SensorPositionMetadata {
  label: string;
  value: string;
}
