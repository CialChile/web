export interface DataTableColumn {
  name: string;
  data: string;
  sort: boolean;
  filter: boolean;
  format?: (data: any) => any;
}
