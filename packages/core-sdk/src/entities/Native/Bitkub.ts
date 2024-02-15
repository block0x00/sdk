import { Currency } from "../Currency";
import { NativeCurrency } from "../NativeCurrency";
import { Token } from "../Token";
import { WNATIVE } from "../../constants/tokens";
import invariant from "tiny-invariant";

export class Bitkub extends NativeCurrency {
  private static _cache: { [chainId: number]: Bitkub } = {};

  protected constructor(chainId: number) {
    super(chainId, 18, "KUB", "Kub Coin");
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId];
    invariant(!!wnative, "WRAPPED");
    return wnative;
  }

  public static onChain(chainId: number): Bitkub {
    return this._cache[chainId] ?? (this._cache[chainId] = new Bitkub(chainId));
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
}
