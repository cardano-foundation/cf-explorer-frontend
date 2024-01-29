import { ByteString, DefaultUni, Integer, String, Unit, Bool, ProtoPair, Data, ProtoList } from "./instances";

export enum ApplyType {
  ProtoList,
  ProtoPair
}

export class Constant {
  public static fromValue(tpe: DefaultUni, decoded: unknown) {
    return new Constant(tpe, decoded);
  }
  public tpe?: DefaultUni;
  public value?: unknown;

  constructor(tpe: DefaultUni, value: unknown) {
    this.tpe = tpe;
    this.value = value;
  }

  public prettyValue(c: DefaultUni): string {
    if (c instanceof Integer) {
      return `${this.value}`;
    }
    if (c instanceof ByteString) {
      return `#${bytesToHex(this.value as Int8Array)}`;
    }
    if (c instanceof String) {
      return `"${this.value}"`;
    }
    if (c instanceof Unit) {
      return `${this.value}`;
    }
    if (c instanceof Bool) {
      return this.value ? "True" : "False";
    }
    if (c instanceof ProtoList) {
      return `[${(this.value as Array<Constant>).map((v) => this.prettyValue(v)).join(", ")}]`;
    }
    if (c instanceof ProtoPair) {
      return `${this.value}`;
    }
    if (c instanceof Data) {
      return `#${bytesToHex(this.value as Int8Array)}`;
    }
    return "";
  }

  public pretty(): string {
    if (!this.tpe) return "";
    return `${DefaultUni.pretty(this.tpe)} ${this.prettyValue(this.tpe)}`;
  }
}

export const DefaultFun = {
  // Integers
  AddInteger: "addInteger",
  SubtractInteger: "subtractInteger",
  MultiplyInteger: "multiplyInteger",
  DivideInteger: "divideInteger",
  QuotientInteger: "quotientInteger",
  RemainderInteger: "remainderInteger",
  ModInteger: "modInteger",
  EqualsInteger: "equalsInteger",
  LessThanInteger: "lessThanInteger",
  LessThanEqualsInteger: "lessThanEqualsInteger",
  // Bytestrings
  AppendByteString: "appendByteString",
  ConsByteString: "consByteString",
  SliceByteString: "sliceByteString",
  LengthOfByteString: "lengthOfByteString",
  IndexByteString: "indexByteString",
  EqualsByteString: "equalsByteString",
  LessThanByteString: "lessThanByteString",
  LessThanEqualsByteString: "lessThanEqualsByteString",
  // Cryptography and hashes
  Sha2_256: "sha2_256",
  Sha3_256: "sha3_256",
  Blake2b_256: "blake2b_256",
  VerifyEd25519Signature: "verifyEd25519Signature",
  VerifyEcdsaSecp256k1Signature: "verifyEcdsaSecp256k1Signature",
  VerifySchnorrSecp256k1Signature: "verifySchnorrSecp256k1Signature",
  // Strings
  AppendString: "appendString",
  EqualsString: "equalsString",
  EncodeUtf8: "encodeUtf8",
  DecodeUtf8: "decodeUtf8",
  // Bool
  IfThenElse: "ifThenElse",
  // Unit
  ChooseUnit: "chooseUnit",
  // Tracing
  Trace: "trace",
  // Pairs
  FstPair: "fstPair",
  SndPair: "sndPair",
  // Lists
  ChooseList: "chooseList",
  MkCons: "mkCons",
  HeadList: "headList",
  TailList: "tailList",
  NullList: "nullList",
  // Data
  ChooseData: "chooseData",
  ConstrData: "constrData",
  MapData: "mapData",
  ListData: "listData",
  IData: "iData",
  BData: "bData",
  UnConstrData: "unConstrData",
  UnMapData: "unMapData",
  UnListData: "unListData",
  UnIData: "unIData",
  UnBData: "unBData",
  EqualsData: "equalsData",
  SerialiseData: "serialiseData",
  // Misc monomorphized constructors
  MkPairData: "mkPairData",
  MkNilData: "mkNilData",
  MkNilPairData: "mkNilPairData"
};

export const hexToUint8Array = (hexString: string) => {
  // Remove the leading "0x" if present
  hexString = hexString.startsWith("0x") ? hexString.slice(2) : hexString;

  // Ensure the hex string has an even length
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  // Create a Uint8Array
  const uint8Array = new Uint8Array(hexString.length / 2);

  // Iterate over the hex string, convert each pair of characters to a byte, and store it in the Uint8Array
  for (let i = 0; i < hexString.length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }

  return uint8Array;
};

export const toInt8Array = (uInt8Array: Uint8Array) => {
  const int8Array = new Int8Array(uInt8Array.length);
  for (let i = 0; i < uInt8Array.length; i++) {
    int8Array[i] = (uInt8Array[i] << 24) >> 24;
  }
  return int8Array;
};

export const toUint8Array = (int8Array: Int8Array): Uint8Array => {
  const uint8Array = new Uint8Array(int8Array.length);
  for (let i = 0; i < int8Array.length; i++) {
    // Chuyển đổi từ Int8 sang Uint8
    uint8Array[i] = int8Array[i] & 0xff;
  }
  return uint8Array;
};

const HEX_ARRAY: string[] = "0123456789ABCDEF".split("");

export const bytesToHex = (bytes: Int8Array): string => {
  const hexChars: string[] = new Array(bytes.length * 2);
  for (let j = 0; j < bytes.length; j++) {
    const v = bytes[j] & 0xff;
    hexChars[j * 2] = HEX_ARRAY[v >>> 4];
    hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0f];
  }
  return hexChars.join("");
};

export const removeSpacesBetweenParentheses = (str: string): string => {
  const result = str.replace(/\(\s+|\s+\)/g, (match) => match.trim());

  // keep space beetween two text
  return result.replace(/(\w+)\s+(\w+)/g, "$1 $2");
};

const convertSquareBracketsToParentheses = (str: string): string => {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/[\[\]\n]+/g, (match) => {
    if (match === "\n") return ""; // Remove newlines
    return match === "[" ? "(" : ")";
  });
};

export interface TreeNode {
  text?: string;
  data?: TreeNode[];
}

export const parseNestedParenthesesToObject = (str: string): TreeNode[] => {
  str = removeSpacesBetweenParentheses(convertSquareBracketsToParentheses(str));
  const stack: TreeNode[] = [];
  let current: TreeNode | undefined;

  for (const char of str) {
    if (char === "(") {
      const newNode: TreeNode = {};
      if (current) {
        if (!current.data) {
          current.data = [];
        }
        current.data.push(newNode);
        current.text = current.text?.trim();
        if (current.text === "") {
          delete current.text;
        }
        stack.push(current);
      }
      current = newNode;
    } else if (char === ")") {
      if (stack.length > 0) {
        current = stack.pop();
      }
    } else {
      if (!current) {
        current = {};
      }
      current.text = (current.text || "") + char;
    }
  }

  return (current as TreeNode[]) || {};
};
