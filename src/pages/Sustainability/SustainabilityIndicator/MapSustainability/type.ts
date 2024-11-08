export interface ICity {
  id: string;
  city: string;
  country: string;
  lat: string;
  lon: string;
  countryCode: string;
}

export interface IMapCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
  value?: number;
  visible?: boolean;
  isTop?: boolean;
}

export interface IMapCountry {
  code: string;
  value?: number;
  name: string;
}

export interface IMapCityResponse {
  city: string;
  lat: string;
  long: string;
  noOfSample: number;
}

export interface IMapCountryResponse {
  countryCode: string;
  country: string;
  noOfSample: number;
  cities: IMapCityResponse[];
}
