
export interface iDetailsListColumn {
  key: string;
  name: string;
  fieldName: string;
  minWidth: number;
  maxWidth: number;
  data?: string;
  onColumnClick?: (ev: Event, column: any) => void,
  isResizable: true,
  onRender?: (item: any) => void
}