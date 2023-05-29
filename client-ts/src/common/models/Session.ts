import { ProcedureBean } from 'src/common/models/Procedure';

export interface SessionBean {
  id?: number;
  observation?: string;
  date?: string; // Será setado automaticamente no backend durante o salvamento
  type?: string; // Será setado automaticamente no backend durante o salvamento -> default: REAL
  procedures?: ProcedureBean[]; // Obrigatorio ao menos 1 procedimento;
}
