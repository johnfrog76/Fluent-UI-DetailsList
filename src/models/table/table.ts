
export interface iDetailsListColumn {
  key: string;
  name: string;
  fieldName: string;
  minWidth: number;
  maxWidth: number;
  data?: string;
  onColumnClick?: (ev: Event, column: any) => void,
  isResizable: boolean,
  onRender?: (item: any) => void
}