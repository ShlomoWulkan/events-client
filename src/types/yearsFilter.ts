export interface FilterOption {
  type: "range" | "specific" | "last5" | "last10";
  year?: number;
  fromYear?: number;
  toYear?: number;
  month?: number;
}