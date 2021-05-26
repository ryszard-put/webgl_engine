import Position from "./Position"
import Move from "./Move"
import Piece from "./Piece"

export default class Round {
  private _number: number;
  private _whiteCode: string;
  private _blackCode: string;
  private _whiteMoves: Move[];
  private _blackMoves: Move[];
  private _initialBoard: Piece[];
  private _boardAfterWhite: Piece[];
  private _boardAfterBlack: Piece[];
  private _complete: boolean;

  get number(): number {
    return this._number;
  }

  get whiteCode(): string {
    return this._whiteCode;
  }

  get blackCode(): string {
    return this._blackCode;
  }

  get whiteMoves(): Move[] {
    return this._whiteMoves;
  }

  get blackMoves(): Move[] {
    return this._blackMoves;
  }

  get initialBoard(): Piece[] {
    return this._initialBoard;
  }

  get boardAfterWhite(): Piece[] {
    return this._boardAfterWhite;
  }

  get boardAfterBlack(): Piece[] {
    return this._boardAfterBlack;
  }

  constructor(number: number, whiteCode: string, blackCode: string) {
    this._number = number;
    this._whiteCode = whiteCode;
    this._blackCode = blackCode;
    this._whiteMoves = [];
    this._blackMoves = [];
    this._initialBoard = [];
    this._boardAfterWhite = [];
    this._boardAfterBlack = [];
    this._complete = false;
  }

  private isThereAPiece(board: Piece[], position: Position): boolean {
    for (const piece of board)
      if (piece.alive && piece.position.full == position.full)
        return true;
    return false;
  }

  private findAttackerPositionOnBoard(board: Piece[], positionFrom: string, positionTo: string, pieceType: string, pieceColor: string, isAttacking: boolean) {

    if (positionFrom.length == 2) return new Position(positionFrom);
    for (const piece of board) {
      if (
        piece.alive &&
        piece.color == pieceColor &&
        piece.type == pieceType && (
          (positionFrom.length == 1 && positionFrom[0] >= 'a' && positionFrom[0] <= 'h' && piece.position.col == positionFrom[0]) ||
          (positionFrom.length == 1 && positionFrom[0] >= '1' && positionFrom[0] <= '8' && piece.position.row == positionFrom[0]) ||
          (positionFrom.length == 0)
        )
      ) {
        if (pieceType == 'K' || pieceType == 'Q') return new Position(piece.position.full);
        if (pieceType == 'N') {
          const colDiff: number = Math.abs(piece.position.col.charCodeAt(0) - positionTo.charCodeAt(0));
          const rowDiff: number = Math.abs(piece.position.row.charCodeAt(0) - positionTo.charCodeAt(1));
          if ((colDiff == 2 && rowDiff == 1) || (colDiff == 1 && rowDiff == 2)) return new Position(piece.position.full);
        }
        if (pieceType == 'R') {
          const colDiff: number = Math.abs(piece.position.col.charCodeAt(0) - positionTo.charCodeAt(0));
          const rowDiff: number = Math.abs(piece.position.row.charCodeAt(0) - positionTo.charCodeAt(1));
          if (colDiff == 0 || rowDiff == 0) {
            let valid: boolean = true;

            for (
              let i = Math.min(piece.position.col.charCodeAt(0), positionTo.charCodeAt(0)) + 1;
              i < Math.max(piece.position.col.charCodeAt(0), positionTo.charCodeAt(0));
              i++
            ) if (this.isThereAPiece(board, new Position(String.fromCharCode(i) + piece.position.row))) valid = false;

            for (
              let i = Math.min(piece.position.row.charCodeAt(0), positionTo.charCodeAt(1)) + 1;
              i < Math.max(piece.position.row.charCodeAt(0), positionTo.charCodeAt(1));
              i++
            ) if (this.isThereAPiece(board, new Position(piece.position.col + String.fromCharCode(i)))) valid = false;

            if (valid) return new Position(piece.position.full);
          }
        }
        if (pieceType == 'B') {
          const colDiff: number = Math.abs(piece.position.col.charCodeAt(0) - positionTo.charCodeAt(0));
          const rowDiff: number = Math.abs(piece.position.row.charCodeAt(0) - positionTo.charCodeAt(1));

          if (colDiff == rowDiff) {
            // console.log(piece);
            let valid: boolean = true;

            const horizontalDirection: number = piece.position.col.charCodeAt(0) < positionTo.charCodeAt(0) ? 1 : -1;
            const verticalDirection: number = piece.position.row.charCodeAt(0) < positionTo.charCodeAt(1) ? 1 : -1;
            for (let i = 1; i < colDiff; i++)
              if (this.isThereAPiece(board, new Position(
                String.fromCharCode(piece.position.col.charCodeAt(0) + (i * horizontalDirection)) +
                String.fromCharCode(piece.position.row.charCodeAt(0) + (i * verticalDirection))
              ))) valid = false;
            if (valid) return new Position(piece.position.full);
          }
        }
        if (pieceType == 'P') {
          const direction: number = pieceColor == 'w' ? 1 : -1;
          if (isAttacking) {
            if (
              Math.abs(piece.position.col.charCodeAt(0) - positionTo.charCodeAt(0)) == 1 &&
              piece.position.row.charCodeAt(0) + direction == positionTo.charCodeAt(1)
            ) return new Position(piece.position.full);
          }
          else if (piece.position.col == positionTo[0]) {
            if (pieceColor == 'w') {
              if (
                piece.position.row.charCodeAt(0) + direction == positionTo.charCodeAt(1) ||
                (piece.position.row == '2' && positionTo[1] == '4')
              ) return new Position(piece.position.full);
            } else {
              if (
                piece.position.row.charCodeAt(0) + direction == positionTo.charCodeAt(1) ||
                (piece.position.row == '7' && positionTo[1] == '5')
              ) return new Position(piece.position.full);
            }
          }
        }
      }
    }
  }

  private generateMovesFromCode(board: Piece[], code: string, color: string): Move[] {
    if (code == "1-0" || code == "0-1" || code == "1/2-1/2")
      return [
        new Move(new Position("--"), new Position("--"), "END_OF_GAME")
      ];

    if (code == "O-O-O" && color == 'w')
      return [
        new Move(new Position("e1"), new Position("c1"), "CASTLING"),
        new Move(new Position("a1"), new Position("d1"), "CASTLING")
      ];

    if (code == "O-O-O" && color == 'b')
      return [
        new Move(new Position("e8"), new Position("c8"), "CASTLING"),
        new Move(new Position("a8"), new Position("d8"), "CASTLING")
      ];

    if (code == "O-O" && color == 'w')
      return [
        new Move(new Position("e1"), new Position("g1"), "CASTLING"),
        new Move(new Position("h1"), new Position("f1"), "CASTLING")
      ];

    if (code == "O-O" && color == 'b')
      return [
        new Move(new Position("e8"), new Position("g8"), "CASTLING"),
        new Move(new Position("h8"), new Position("f8"), "CASTLING")
      ];

    const regexp = new RegExp("([KQNRBP]?)([a-h]?[0-8]?)([x:]?)([a-h][0-8]?)=?([QNRB]?)((?:\\+{2}|#)?)(\\+?)");
    const match: string[] = code.match(regexp);

    const movingPiece: string = match[1].length ? match[1] : 'P';
    const movingFrom: string = match[2];
    const movingTo: string = match[4];
    const promotionTo: string = match[5] + "-";

    const isAttacking: boolean = !!match[3].length;
    const isPromoting: boolean = !!match[5].length;
    const inCheck: boolean = !!match[7].length;
    const inCheckmate: boolean = !!match[6].length;
    // console.log({ board, movingFrom, movingTo, movingPiece, color, isAttacking })
    const attackerPosition: Position = this.findAttackerPositionOnBoard(board, movingFrom, movingTo, movingPiece, color, isAttacking);
    // console.log({ attackerPosition });

    if (isPromoting) {
      return [
        new Move(attackerPosition, new Position(promotionTo), "PAWN_PROMOTION")
      ]
    }

    const moveType: string =
      inCheckmate ? "CHECKMATE" :
        inCheck ? "CHECK" :
          isAttacking ? "ATTACK" :
            "NORMAL_MOVE";

    return [
      new Move(attackerPosition, new Position(movingTo), moveType)
    ];
  }

  private applyMovesToBoard(board: Piece[], moves: Move[]): Piece[] {
    const boardCopy = board.map(piece => new Piece(new Position(piece.position.full), piece.color, piece.type, piece.alive));
    moves.forEach(move => {
      if (
        move.type == "NORMAL_MOVE" ||
        move.type == "ATTACK" ||
        move.type == "CASTLING" ||
        move.type == "CHECK" ||
        move.type == "CHECKMATE"
      ) {
        boardCopy.map(piece => {
          if (piece.alive) {
            if (piece.position.full == move.to.full) piece.alive = false;
            else if (piece.position.full == move.from.full) piece.position.full = move.to.full;
          }
          return piece;
        })
      }
    })
    return boardCopy;
  }

  complete(previousBoardState: Piece[]) {
    this._initialBoard = previousBoardState;
    this._whiteMoves = this.generateMovesFromCode(this._initialBoard, this._whiteCode, 'w');
    this._boardAfterWhite = this.applyMovesToBoard(this._initialBoard, this._whiteMoves);
    this._blackMoves = this.generateMovesFromCode(this._boardAfterWhite, this._blackCode, 'b');
    this._boardAfterBlack = this.applyMovesToBoard(this._boardAfterWhite, this._blackMoves);
    // this.printBoard("AfterBlack", this._blackMoves, this._boardAfterBlack);
    this._complete = true;
  }

  printBoard(name: string, moves: Move[], pieces: Piece[]) {
    class Row {
      a: string = "";
      b: string = "";
      c: string = "";
      d: string = "";
      e: string = "";
      f: string = "";
      g: string = "";
      h: string = "";
    }

    class Board {
      1: Row = new Row();
      2: Row = new Row();
      3: Row = new Row();
      4: Row = new Row();
      5: Row = new Row();
      6: Row = new Row();
      7: Row = new Row();
      8: Row = new Row();
    }

    console.log(name);
    moves.forEach(move => console.log(`${move.from.full} => ${move.to.full}`));
    let board: Board = new Board();
    for (const piece of pieces) {
      if (piece.alive) board[piece.position.row][piece.position.col] = `${piece.color}${piece.type}`;
    }
    console.table(board);
  }
}