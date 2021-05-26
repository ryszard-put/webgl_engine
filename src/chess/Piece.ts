import Position from "./Position";

export default class Piece {
  private _position: Position;
  private _color: string;
  private _type: string;
  private _alive: boolean;

  constructor(position: Position, color: string, type: string, alive: boolean = true) {
    this._position = position;
    this._color = color;
    this._type = type;
    this._alive = alive;
  }

  get position(): Position {
    return this._position;
  }

  get color(): string {
    return this._color;
  }

  get type(): string {
    return this._type;
  }

  get alive(): boolean {
    return this._alive;
  }

  set position(newPosition: Position) {
    this._position = newPosition;
  }

  set color(newColor: string) {
    this._color = newColor;
  }

  set type(newType: string) {
    this._type = newType;
  }

  set alive(newAlive: boolean) {
    this._alive = newAlive;
  }
}