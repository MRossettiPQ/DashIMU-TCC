export interface Metadata {
  [key: string]: unknown;
}

export interface ListMetadata {
  resultList?: unknown[];
  data?: unknown[] | unknown;
  count?: number;
  rpp?: number;
  page?: number;
  endPosition?: number;
  maxPages?: number;
  more?: boolean;
}

// export interface BeanMetadata {
//   metadata?: SocketControllerMetadata;
//   patient?: PatientDialog;
// }

// export interface SocketControllerMetadata {
//   socket_url?: string;
//   url?: string;
//   port?: string;
// }
