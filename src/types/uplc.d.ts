export interface UPLCProgram {
  version: {
    major: string | number;
    minor: string | number;
    patch: string | number;
  };
  program: { data: UPLCData[] };
}

export interface UPLCData {
  id?: number;
  text?: string;
  data?: UPLCData[];
}
