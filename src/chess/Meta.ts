export default class Meta {
  private _key: string;
  private _value: string;

  constructor(key: string, value: string) {
    this._key = key;
    this._value = value;
  }

  get key(): string {
    return this._key;
  }

  get value(): string {
    return this._value;
  }

  set key(newKey: string) {
    this._key = newKey;
  }

  set value(newValue: string) {
    this._value = newValue;
  }
}