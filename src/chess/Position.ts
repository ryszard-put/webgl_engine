export default class Position {
  private _rowNumber: number;
  private _colNumber: number;

  constructor(full: string) {
    this.col = full[0];
    this.row = full[1];
  }

  get row(): string {
    return String.fromCharCode(49 + this._rowNumber);
  }

  get col(): string {
    return String.fromCharCode(97 + this._colNumber);
  }

  get full(): string {
    return this.col + this.row;
  }

  get rowNumber(): number {
    return this._rowNumber;
  }

  get colNumber(): number {
    return this._colNumber;
  }

  set row(newRow: string) {
    this._rowNumber = newRow.charCodeAt(0) - 49;
  }

  set col(newCol: string) {
    this._colNumber = newCol.charCodeAt(0) - 97;
  }

  set full(newFull: string) {
    this.col = newFull[0];
    this.row = newFull[1];
  }

  set rowNumber(newRowNumber: number) {
    this._rowNumber = newRowNumber;
  }

  set colNumber(newColNumber: number) {
    this._colNumber = newColNumber;
  }
}