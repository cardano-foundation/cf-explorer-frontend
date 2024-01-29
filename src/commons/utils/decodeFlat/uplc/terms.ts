/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Constant } from "./utils";
import { DecoderState, FlatNatural } from "../flat/flat";
import { FlatConstant, FlatDefaultFun } from "./instances";

export const fromDeBruijnTerm = (term: Term): Term => {
  let idx = 0;
  const go = (term: Term, env: Array<string>): Term => {
    switch (term.type) {
      case TermType.Var: {
        const binderName = env[term.name!.index - 1];
        const name = new NamedDeBruijn(binderName, term.name?.index);
        return Term.Var(name);
      }
      case TermType.LamAbs: {
        const binderName: string = `i_${idx}`;
        idx += 1;
        return Term.LamAbs(binderName, go(term.term!, [binderName, ...env]));
      }
      case TermType.Apply: {
        const { f, arg } = term;
        return Term.Apply(go(f!, env), go(arg!, env));
      }
      case TermType.Force: {
        return Term.Force(go(term.term!, env));
      }
      case TermType.Delay: {
        return Term.Delay(go(term.term!, env));
      }
      case TermType.Const: {
        return term;
      }
      case TermType.Builtin: {
        return term;
      }
      case TermType.Error: {
        return term;
      }
      default:
        throw new Error("not found term type");
    }
  };
  return go(term, []);
};

export class NamedDeBruijn {
  name: string;
  index: number;

  constructor(name: string, index: number = 0) {
    if (index < 0) {
      throw new Error("Index must be non-negative.");
    }

    this.name = name;
    this.index = index;
  }

  toString(): string {
    if (this.index === 0) {
      return `NamedDeBruijn("${this.name}")`;
    } else {
      return `NamedDeBruijn("${this.name}", ${this.index})`;
    }
  }
}

export enum TermType {
  Var,
  LamAbs,
  Apply,
  Force,
  Delay,
  Const,
  Builtin,
  Error
}

export class Term {
  type?: TermType;
  name?: NamedDeBruijn;
  term?: Term;
  f?: Term;
  arg?: Term;
  const?: Constant;
  bn?: string;

  static Var(name: NamedDeBruijn): Term {
    const vars = new Term();
    vars.type = TermType.Var;
    vars.name = name;
    return vars;
  }

  static LamAbs(name: string, term: Term): Term {
    const lamAbsTerm = new Term();
    lamAbsTerm.type = TermType.LamAbs;
    lamAbsTerm.name = new NamedDeBruijn(name);
    lamAbsTerm.term = term;
    return lamAbsTerm;
  }

  static Apply(f: Term, arg: Term): Term {
    const applyTerm = new Term();
    applyTerm.type = TermType.Apply;
    applyTerm.f = f;
    applyTerm.arg = arg;
    return applyTerm;
  }

  static Force(term: Term): Term {
    const forceTerm = new Term();
    forceTerm.type = TermType.Force;
    forceTerm.term = term;
    return forceTerm;
  }

  static Delay(term: Term): Term {
    const delayTerm = new Term();
    delayTerm.type = TermType.Delay;
    delayTerm.term = term;
    return delayTerm;
  }

  static Const(constant: Constant): Term {
    const constTerm = new Term();
    constTerm.type = TermType.Const;
    constTerm.const = constant;
    return constTerm;
  }

  static Builtin(defaultFun: string): Term {
    const builtinTerm = new Term();
    builtinTerm.type = TermType.Builtin;
    builtinTerm.bn = defaultFun;
    return builtinTerm;
  }

  static Error(): Term {
    const errorTerm = new Term();
    errorTerm.type = TermType.Error;
    return errorTerm;
  }

  public pretty(): string | undefined {
    switch (this.type) {
      case TermType.Var: {
        const name = this.name ? this.name.name : "";
        return name;
      }
      case TermType.LamAbs: {
        return `  (lam ${this.name?.name} ${this.term?.pretty()})`;
      }
      case TermType.Apply: {
        return `[ ${this.f?.pretty()} ${this.arg?.pretty()} ]`;
      }
      case TermType.Force: {
        return `(force ${this.term?.pretty()})`;
      }
      case TermType.Delay: {
        return `(delay ${this.term?.pretty()})`;
      }
      case TermType.Const: {
        return `(con ${this.const?.pretty()})`;
      }
      case TermType.Builtin: {
        return `(builtin ${this.bn})`;
      }
      case TermType.Error: {
        return `(error)`;
      }
    }
  }
}

export type Version = {
  major: number;
  minor: number;
  patch: number;
};

export class DeBruijnedProgram {
  version: Version;
  term: Term;

  constructor(version: Version, term: Term) {
    this.version = version;
    this.term = term;
  }

  public pretty() {
    const { major, minor, patch } = this.version;
    return `(program\n  ${major}.${minor}.${patch}\n${this.term.pretty()}\n)`;
  }
}

export const termTagWidth = 4;

export class FlatDeBruijnedProgram {
  public static decode(decoder: DecoderState): DeBruijnedProgram {
    const v1 = Number(FlatNatural.getInstance().decode(decoder).n);
    const v2 = Number(FlatNatural.getInstance().decode(decoder).n);
    const v3 = Number(FlatNatural.getInstance().decode(decoder).n);
    const term = FlatTerm.decode(decoder);
    return new DeBruijnedProgram({ major: v1, minor: v2, patch: v3 } as Version, term);
  }
}
export class FlatTerm {
  public static decode(decoder: DecoderState): Term {
    const tag = decoder.bits8(termTagWidth);
    switch (tag) {
      case 0: {
        const index = Number(FlatNatural.getInstance().decode(decoder).n);
        const name: string = `i_${index}`;
        return Term.Var(new NamedDeBruijn(name, index));
      }
      case 1: {
        const term = FlatTerm.decode(decoder);
        return Term.Delay(term);
      }
      case 2: {
        const term = FlatTerm.decode(decoder);
        return Term.LamAbs("i_0", term);
      }
      case 3: {
        const f = FlatTerm.decode(decoder);
        const arg = FlatTerm.decode(decoder);
        return Term.Apply(f, arg);
      }
      case 4:
        return Term.Const(FlatConstant.getInstance().decode(decoder));
      case 5: {
        const term = FlatTerm.decode(decoder);
        return Term.Force(term);
      }
      case 6:
        return Term.Error();
      case 7:
        return Term.Builtin(FlatDefaultFun.getInstance().decode(decoder));
      default:
        throw new Error(`Not found tag: ${tag}`);
    }
  }
}
