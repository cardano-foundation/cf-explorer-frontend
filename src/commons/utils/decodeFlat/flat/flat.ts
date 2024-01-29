/* eslint-disable @typescript-eslint/no-inferrable-types */
export abstract class Flat<T> {
  public abstract decode(decoder: DecoderState): T;
}

class Natural {
  public n: bigint;

  constructor(n: bigint) {
    this.n = n;
  }
}

export class FlatNatural extends Flat<Natural> {
  private static readonly instance = new FlatNatural();

  public static getInstance() {
    return FlatNatural.instance;
  }
  public decode(decoder: DecoderState): Natural {
    let w = decoder.bits8(8);
    let r = BigInt(0);
    let shl = 0;

    while ((w & 0x80) !== 0) {
      r = r | (BigInt(w & 0x7f) << BigInt(shl));
      shl += 7;
      w = decoder.bits8(8);
    }

    r = r | (BigInt(w & 0x7f) << BigInt(shl));
    return new Natural(r);
  }
}

export class FlatBigInt extends Flat<bigint> {
  private static readonly instance = new FlatBigInt();

  public static getInstance() {
    return FlatBigInt.instance;
  }
  public decode(decoder: DecoderState): bigint {
    let w = decoder.bits8(8);
    let r = BigInt(0);
    let shl = 0;

    while ((w & 0x80) !== 0) {
      r = r | (BigInt(w & 0x7f) << BigInt(shl));
      shl += 7;
      w = decoder.bits8(8);
    }

    r = r | (BigInt(w & 0x7f) << BigInt(shl));
    return zagZig(r);
  }
}

export class FlatArrayByte extends Flat<Int8Array> {
  private static readonly instance = new FlatArrayByte();

  public static getInstance() {
    return FlatArrayByte.instance;
  }
  public decode(decoder: DecoderState): Int8Array {
    decoder.filler();
    let numElems = decoder.buffer[decoder.currPtr] & 0xff;
    let decoderOffset = numElems + 1;
    let size = numElems;

    // Calculate size
    while (numElems === 255) {
      numElems = decoder.buffer[decoder.currPtr + decoderOffset] & 0xff;
      size += numElems;
      decoderOffset += numElems + 1;
    }

    const result = new Int8Array(size);
    numElems = decoder.buffer[decoder.currPtr] & 0xff;
    decoder.currPtr += 1;
    let resultOffset = 0;

    while (numElems > 0) {
      result.set(decoder.buffer.subarray(decoder.currPtr, decoder.currPtr + numElems), resultOffset);

      decoder.currPtr += numElems;
      resultOffset += numElems;

      numElems = decoder.buffer[decoder.currPtr] & 0xff;
      decoder.currPtr += 1;
    }

    return result;
  }
}

export class FlatString extends Flat<string> {
  private static readonly instance = new FlatString();

  public static getInstance() {
    return FlatString.instance;
  }
  public decode(decoder: DecoderState): string {
    const bytes = FlatArrayByte.getInstance().decode(decoder);
    return new TextDecoder("UTF-8").decode(bytes);
  }
}

export class FlatBoolean extends Flat<boolean> {
  private static readonly instance = new FlatBoolean();

  public static getInstance() {
    return FlatBoolean.instance;
  }
  public decode(decoder: DecoderState): boolean {
    const decoded = decoder.bits8(1);
    return decoded === 1;
  }
}

export class FlatUnit extends Flat<string> {
  private static readonly instance = new FlatUnit();

  public static getInstance() {
    return FlatUnit.instance;
  }
  public decode(decoder: DecoderState): string {
    return decoder ? "()" : "";
  }
}
export class FlatData extends Flat<Int8Array> {
  private static readonly instance = new FlatData();

  public static getInstance() {
    return FlatData.instance;
  }

  public decode(decoder: DecoderState): Int8Array {
    const bytes = FlatArrayByte.getInstance().decode(decoder);
    return bytes;
  }
}

export const zagZig = (u: bigint): bigint => {
  return (u >> BigInt("1")) ^ -(u & BigInt("1"));
};

export class DecoderState {
  /** The buffer that contains a sequence of flat-encoded values */
  public buffer: Int8Array;
  /** Pointer to the current byte being decoded (0..buffer.byteLength-1) */
  public currPtr: number = 0;
  /** Number of already decoded bits in the current byte (0..7) */
  public usedBits: number = 0;

  constructor(buffer: Int8Array) {
    this.buffer = buffer;
  }

  toString(): string {
    return `DecoderState(currPtr:${this.currPtr}, usedBits:${this.usedBits}, buffer:[${Array.from(this.buffer)
      .map((byte) => byte.toString())
      .join(", ")}])`;
  }

  /** Decode up to 8 bits
   * @param numBits
   *   the number of bits to decode (0..8)
   */
  bits8(numBits: number): number {
    if (numBits < 0 || numBits > 8) {
      throw new Error("Decoder.bits8: incorrect value of numBits " + numBits);
    }

    this.ensureBits(numBits);
    // usedBits=1 numBits=8 unusedBits=7 leadingZeros=0 unusedBits+leadingZeros=7
    const unusedBits = 8 - this.usedBits;
    const leadingZeros = 8 - numBits;
    let r = ((this.buffer[this.currPtr] << this.usedBits) & 255) >>> leadingZeros;

    if (numBits > unusedBits) {
      const nextByte: number = this.buffer[this.currPtr + 1];
      const lowerBits = (nextByte & 255) >>> (unusedBits + leadingZeros);
      r = r | lowerBits;
    }

    this.dropBits(numBits);

    return r & 255;
  }

  filler(): void {
    while (this.bits8(1) === 0) {
      /* empty */
    }
  }

  private ensureBits(requiredBits: number): void {
    if (requiredBits > this.availableBits()) {
      throw new Error("DecoderState: Not enough data available: " + this.toString());
    }
  }

  private availableBits(): number {
    return 8 * this.availableBytes() - this.usedBits;
  }

  // Available bytes, ignoring used bits
  private availableBytes(): number {
    return this.buffer.length - this.currPtr;
  }

  private dropBits(numBits: number): void {
    const totUsed = numBits + this.usedBits;
    this.usedBits = totUsed % 8;
    this.currPtr += Math.floor(totUsed / 8);
  }
}

export class ListFlat<T> {
  public decoder: Flat<T>;

  constructor(flat: Flat<T>) {
    this.decoder = flat;
  }
  public decode(decode: DecoderState): T[] {
    const result: T[] = [];
    while (decode.bits8(1) === 1) {
      const a = this.decoder.decode(decode);
      result.push(a as T);
    }
    return result;
  }
}
