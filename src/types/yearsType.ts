export interface IncidentTrendData {
  _id: {
    year: number;
    month?: number;
  };
  count: number;
}