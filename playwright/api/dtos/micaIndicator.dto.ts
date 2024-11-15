export interface MicaIndicatorDto {
  indicator: number;
  title: string;
  description: string;
  unit: string;
  result: {
    value: number;
    year: number;
  };
}
