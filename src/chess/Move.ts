import Position from "./Position"

export default class Move {
  private _from: Position;
  private _to: Position;
  private _type: string;

  constructor(from: Position, to: Position, type: string) {
    this._from = from;
    this._to = to;
    this._type = type;
  }

  get from(): Position {
    return this._from;
  }

  get to(): Position {
    return this._to;
  }

  get type(): string {
    return this._type;
  }

  set from(newFrom: Position) {
    this._from = newFrom;
  }

  set to(newTo: Position) {
    this._to = newTo;
  }

  set type(newType: string) {
    this._type = newType;
  }
}