export interface UPLCProgram {
  version: {
    major: string | number;
    minor: string | number;
    patch: string | number;
  };
  data: (UPLCData | UPLCData[])[];
}

export interface UPLCData {
  text: string;
  data?: UPLCData[];
}
