export interface iPageObj {
  currentPage: number;
  pageSize: string;
  firstItemNumber: number;
  lastItemNumber: number;
  totalCount: number | null;
  isSortedDescending: boolean;
  sortKey: string;
  query: string;
}