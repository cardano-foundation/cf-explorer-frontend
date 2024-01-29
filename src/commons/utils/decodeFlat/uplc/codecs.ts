import { DecoderState } from "../flat/flat";
import { DeBruijnedProgram, FlatDeBruijnedProgram } from "./terms";

export class ProgramFlatCodec {
  public static decodeFlat(encoded: Int8Array): DeBruijnedProgram {
    const decoderState = new DecoderState(encoded);
    return FlatDeBruijnedProgram.decode(decoderState);
  }
}
