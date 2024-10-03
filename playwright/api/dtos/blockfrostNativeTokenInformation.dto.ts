export interface BlockfrostNativeTokenInformationDto {
  asset: string;
  policy_id: string;
  fingerprint: string;
  metadata: {
    name: string;
  };
}
