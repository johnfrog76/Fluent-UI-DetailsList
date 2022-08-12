export interface iCompanyItem {
  column1: string;
  column2: string;
  column3: number;
  column4: number;
  column5: number;
  id: string;
}

export enum recordStatusEnum {
  Confirmed = 1,
  Current,
  Open,
  Outdated,
  TopRated,
  Unknown,
};