import Meta from "./Meta"
import Round from "./Round"
import Piece from "./Piece"
import Position from "./Position"

export default class Game {
  private _metaData: Meta[];
  private _rounds: Round[];

  get metaData(): Meta[] {
    return this._metaData;
  }

  get rounds(): Round[] {
    return this._rounds;
  }

  constructor(metaData: Meta[], rounds: Round[]) {
    this._metaData = metaData;
    this._rounds = rounds;
  }

  private generateStartingPieces(): Piece[] {
    const pieces: Piece[] = [];

    pieces.push(new Piece(new Position("a8"), "b", "R"));
    pieces.push(new Piece(new Position("b8"), "b", "N"));
    pieces.push(new Piece(new Position("c8"), "b", "B"));
    pieces.push(new Piece(new Position("d8"), "b", "Q"));
    pieces.push(new Piece(new Position("e8"), "b", "K"));
    pieces.push(new Piece(new Position("f8"), "b", "B"));
    pieces.push(new Piece(new Position("g8"), "b", "N"));
    pieces.push(new Piece(new Position("h8"), "b", "R"));

    pieces.push(new Piece(new Position("a7"), "b", "P"));
    pieces.push(new Piece(new Position("b7"), "b", "P"));
    pieces.push(new Piece(new Position("c7"), "b", "P"));
    pieces.push(new Piece(new Position("d7"), "b", "P"));
    pieces.push(new Piece(new Position("e7"), "b", "P"));
    pieces.push(new Piece(new Position("f7"), "b", "P"));
    pieces.push(new Piece(new Position("g7"), "b", "P"));
    pieces.push(new Piece(new Position("h7"), "b", "P"));

    pieces.push(new Piece(new Position("a2"), "w", "P"));
    pieces.push(new Piece(new Position("b2"), "w", "P"));
    pieces.push(new Piece(new Position("c2"), "w", "P"));
    pieces.push(new Piece(new Position("d2"), "w", "P"));
    pieces.push(new Piece(new Position("e2"), "w", "P"));
    pieces.push(new Piece(new Position("f2"), "w", "P"));
    pieces.push(new Piece(new Position("g2"), "w", "P"));
    pieces.push(new Piece(new Position("h2"), "w", "P"));

    pieces.push(new Piece(new Position("a1"), "w", "R"));
    pieces.push(new Piece(new Position("b1"), "w", "N"));
    pieces.push(new Piece(new Position("c1"), "w", "B"));
    pieces.push(new Piece(new Position("d1"), "w", "Q"));
    pieces.push(new Piece(new Position("e1"), "w", "K"));
    pieces.push(new Piece(new Position("f1"), "w", "B"));
    pieces.push(new Piece(new Position("g1"), "w", "N"));
    pieces.push(new Piece(new Position("h1"), "w", "R"));

    return pieces;
  }

  completeRounds() {
    let previousBoardState = this.generateStartingPieces();
    this._rounds.forEach(round => {
      round.complete(previousBoardState);
      previousBoardState = round.boardAfterBlack;
    });
  }

  findMetaData(key: string): string {
    for (const meta of this._metaData) {
      if (meta.key == key) return meta.value;
    }
    return "";
  }
}