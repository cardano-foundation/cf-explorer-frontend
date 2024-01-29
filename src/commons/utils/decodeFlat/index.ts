import { decode } from "cbor-x";

import { ProgramFlatCodec } from "./uplc/codecs";
import { DeBruijnedProgram, fromDeBruijnTerm } from "./uplc/terms";
import { hexToUint8Array, parseNestedParenthesesToObject, toInt8Array } from "./uplc/utils";

const getDeBruijnedProgram = (deserializeContract: string): DeBruijnedProgram => {
  const contractByteArray = hexToUint8Array(deserializeContract);
  const scriptFlat = decode(contractByteArray);
  const decoder = toInt8Array(scriptFlat);

  const program = ProgramFlatCodec.decodeFlat(decoder);
  const namedTerm = fromDeBruijnTerm(program.term);
  const applied = new DeBruijnedProgram(program.version, namedTerm);
  return applied;
};

export const decodeFlatUplc = (deserializeContract: string): string => {
  const applied = getDeBruijnedProgram(deserializeContract);
  return applied.pretty();
};

export const decodeFlatUplcToObject = (deserializeContract: string) => {
  const applied = getDeBruijnedProgram(deserializeContract);
  const termPretty = applied.term.pretty() || "";
  const decodedObject = {
    version: applied.version,
    data: parseNestedParenthesesToObject(termPretty)
  };
  return decodedObject;
};
