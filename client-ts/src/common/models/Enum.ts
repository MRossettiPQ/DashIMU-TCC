export interface Enum {
  [key: string]: EnumValue;
}

interface EnumValue {
  description: string;
  label: string;
}
