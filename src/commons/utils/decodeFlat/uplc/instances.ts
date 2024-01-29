import {
  DecoderState,
  Flat,
  FlatArrayByte,
  FlatBigInt,
  FlatBoolean,
  FlatData,
  FlatString,
  FlatUnit,
  ListFlat
} from "../flat/flat";
import { Constant, DefaultFun } from "./utils";
const CONSTANT_WIDTH = 4;

export class FlatConstant extends Flat<Constant> {
  private static readonly instance = new FlatConstant();

  public static getInstance() {
    return FlatConstant.instance;
  }
  public decode(decoder: DecoderState): Constant {
    const tags = new ListFlat<number>(ConstantTypeTagFlat.getInstance()).decode(decoder);
    let tpe = decodeUni(tags)[0];
    const uniDecoder = flatForUni(tpe);
    const decoded = uniDecoder?.decode(decoder);
    if (uniDecoder instanceof ListFlat) {
      const protoList = tpe as ProtoList;
      tpe = new ProtoList(protoList.f, protoList.arg);
    }
    const result = Constant.fromValue(tpe, decoded);

    return result;
  }
}

export const flatForUni = (tpe: DefaultUni): Flat<unknown> | undefined => {
  if (tpe instanceof Integer) {
    return FlatBigInt.getInstance();
  }
  if (tpe instanceof ByteString) {
    return FlatArrayByte.getInstance();
  }
  if (tpe instanceof String) {
    return FlatString.getInstance();
  }
  if (tpe instanceof Unit) {
    return FlatUnit.getInstance();
  }
  if (tpe instanceof Bool) {
    return FlatBoolean.getInstance();
  }
  if (tpe instanceof Data) {
    return FlatData.getInstance();
  }
  if (tpe instanceof Apply && tpe.f instanceof ProtoList && tpe.arg) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new ListFlat(flatForUni(tpe.arg)!);
  }

  if (tpe instanceof Apply && tpe.f instanceof ProtoPair && tpe.arg) {
    //TODO: Protopair will be implemented later
  }
};

export class ConstantTypeTagFlat extends Flat<number> {
  private static readonly instance = new ConstantTypeTagFlat();

  public static getInstance() {
    return ConstantTypeTagFlat.instance;
  }

  public decode(decode: DecoderState): number {
    return decode.bits8(CONSTANT_WIDTH);
  }
}

export class DefaultUni {
  public static pretty(du: DefaultUni): string {
    if (du instanceof Integer) {
      return `integer`;
    }
    if (du instanceof ByteString) {
      return `bytestring`;
    }
    if (du instanceof String) {
      return `string`;
    }
    if (du instanceof Unit) {
      return `unit`;
    }
    if (du instanceof Bool) {
      return `bool`;
    }
    if (du instanceof ProtoList) {
      return `(list ${du.arg && this.pretty(du.arg)})`;
    }
    if (du instanceof ProtoPair) {
      return `(pair)`; //TODO: Implement later
    }
    if (du instanceof Data) {
      return `data`;
    }
    return "";
  }
}

export class Integer extends DefaultUni {}
export class ByteString extends DefaultUni {}
export class String extends DefaultUni {}
export class Unit extends DefaultUni {}
export class Bool extends DefaultUni {}
export class Data extends DefaultUni {}
export class Apply extends DefaultUni {
  f?: DefaultUni;
  arg?: DefaultUni;

  constructor(f?: DefaultUni, arg?: DefaultUni) {
    super();
    this.f = f;
    this.arg = arg;
  }
}

export class ProtoList extends Apply {}
export class ProtoPair extends Apply {}

type UniTuple = [DefaultUni, number[]];
function decodeUni(state: number[]): UniTuple {
  switch (state[0]) {
    case 0:
      return [new Integer(), state.slice(1)];
    case 1:
      return [new ByteString(), state.slice(1)];
    case 2:
      return [new String(), state.slice(1)];
    case 3:
      return [new Unit(), state.slice(1)];
    case 4:
      return [new Bool(), state.slice(1)];
    case 5:
      return [new ProtoList(), state.slice(1)];
    case 6:
      return [new ProtoPair(), state.slice(1)];
    case 7: {
      const [uniF, tail1] = decodeUni(state.slice(1));
      const [uniA, tail2] = decodeUni(tail1);
      return [new Apply(uniF, uniA), tail2];
    }
    case 8:
      return [new Data(), state.slice(1)];
    default:
      throw new Error(`Invalid uni: ${state[0]}`);
  }
}

export class FlatDefaultFun extends Flat<string> {
  private static readonly instance = new FlatDefaultFun();

  public static getInstance() {
    return FlatDefaultFun.instance;
  }
  public decode(decode: DecoderState): string {
    const code = decode.bits8(7);
    switch (code) {
      case 0:
        return DefaultFun.AddInteger;
      case 1:
        return DefaultFun.SubtractInteger;
      case 2:
        return DefaultFun.MultiplyInteger;
      case 3:
        return DefaultFun.DivideInteger;
      case 4:
        return DefaultFun.QuotientInteger;
      case 5:
        return DefaultFun.RemainderInteger;
      case 6:
        return DefaultFun.ModInteger;
      case 7:
        return DefaultFun.EqualsInteger;
      case 8:
        return DefaultFun.LessThanInteger;
      case 9:
        return DefaultFun.LessThanEqualsInteger;
      case 10:
        return DefaultFun.AppendByteString;
      case 11:
        return DefaultFun.ConsByteString;
      case 12:
        return DefaultFun.SliceByteString;
      case 13:
        return DefaultFun.LengthOfByteString;
      case 14:
        return DefaultFun.IndexByteString;
      case 15:
        return DefaultFun.EqualsByteString;
      case 16:
        return DefaultFun.LessThanByteString;
      case 17:
        return DefaultFun.LessThanEqualsByteString;
      case 18:
        return DefaultFun.Sha2_256;
      case 19:
        return DefaultFun.Sha3_256;
      case 20:
        return DefaultFun.Blake2b_256;
      case 21:
        return DefaultFun.VerifyEd25519Signature;
      case 22:
        return DefaultFun.AppendString;
      case 23:
        return DefaultFun.EqualsString;
      case 24:
        return DefaultFun.EncodeUtf8;
      case 25:
        return DefaultFun.DecodeUtf8;
      case 26:
        return DefaultFun.IfThenElse;
      case 27:
        return DefaultFun.ChooseUnit;
      case 28:
        return DefaultFun.Trace;
      case 29:
        return DefaultFun.FstPair;
      case 30:
        return DefaultFun.SndPair;
      case 31:
        return DefaultFun.ChooseList;
      case 32:
        return DefaultFun.MkCons;
      case 33:
        return DefaultFun.HeadList;
      case 34:
        return DefaultFun.TailList;
      case 35:
        return DefaultFun.NullList;
      case 36:
        return DefaultFun.ChooseData;
      case 37:
        return DefaultFun.ConstrData;
      case 38:
        return DefaultFun.MapData;
      case 39:
        return DefaultFun.ListData;
      case 40:
        return DefaultFun.IData;
      case 41:
        return DefaultFun.BData;
      case 42:
        return DefaultFun.UnConstrData;
      case 43:
        return DefaultFun.UnMapData;
      case 44:
        return DefaultFun.UnListData;
      case 45:
        return DefaultFun.UnIData;
      case 46:
        return DefaultFun.UnBData;
      case 47:
        return DefaultFun.EqualsData;
      case 48:
        return DefaultFun.MkPairData;
      case 49:
        return DefaultFun.MkNilData;
      case 50:
        return DefaultFun.MkNilPairData;
      case 51:
        return DefaultFun.SerialiseData;
      case 52:
        return DefaultFun.VerifyEcdsaSecp256k1Signature;
      case 53:
        return DefaultFun.VerifySchnorrSecp256k1Signature;
      default:
        throw new Error(`Invalid builtin function code: ${code}`);
    }
  }
}
