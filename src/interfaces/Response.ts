export interface IPaginatedResponse<T> {
  data?: T | T[];
  prev?: number | null;
  next?: number | null;
}

export type ICommonResponse<T> = T | T[];
