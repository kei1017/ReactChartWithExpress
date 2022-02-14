export interface IFilteredData {
  id: number;
  name: string;
  amount: number;
  record_time: Date;
}

export interface IPieChartData {
  [key: string]: number;
}

export interface IPieChartRecord {
  category: string;
  value: number;
}

export interface IColumnChartData {
  [key: number]: number;
}

export interface IColumnChartRecord {
  date: number;
  value: number;
}

export interface ITableMeta {
  days: number;
  people: number;
  totalAmount: number;
}
