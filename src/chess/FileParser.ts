import Game from "./Game"
import Meta from "./Meta"
import Round from "./Round"

export default class FileParser {
  private _path: string;
  private _content: string;
  private _games: Game[];

  constructor(path: string) {
    this._path = path;
    this._content = "";
    this._games = [];
    this.readFileContent();
  }

  get path(): string {
    return this._path;
  }

  get content(): string {
    return this._content;
  }

  get games(): Game[] {
    return this._games;
  }

  private readFileContent() {
    const request = new XMLHttpRequest();
    request.open("GET", `/pgn/${this._path}`);
    request.onload = () => {
      this._content = request.response;
      this.parseFileContent();
    }
    request.send();
  }

  private parseFileContent() {
    const lines: string[] = this._content.split("\n");
    const trimmedLines: string[] = lines.map(line => line.trim());
    if (trimmedLines[trimmedLines.length - 1] != "") trimmedLines.push("");
    let nextLine: string;
    
    while (trimmedLines.length) {
      const metaBlock: string[] = [];
      const roundBlock: string[] = [];

      nextLine = trimmedLines.shift();

      while (nextLine != "" && trimmedLines.length) {
        metaBlock.push(nextLine);
        nextLine = trimmedLines.shift();
      }

      nextLine = trimmedLines.shift();

      while (nextLine != "") {
        roundBlock.push(nextLine);
        nextLine = trimmedLines.shift();
      }

      this._games.push(this.createGame(metaBlock, roundBlock));
    }
  }

  createGame(metaBlock: string[], roundBlock: string[]): Game {
    const metaData = this.parseMeta(metaBlock);
    const roundData = this.parseRounds(roundBlock);
    const game = new Game(metaData, roundData);
    game.completeRounds();
    return game;
  }

  parseMeta(metaBlock: string[]): Meta[] {
    const metaData: Meta[] = [];
    const regexp = /\[(\S+)\s+\"(.*)\"\]/;

    metaBlock.forEach(metaLine => {
      const [_wholeLine, key, value]: string[] = metaLine.match(regexp);
      metaData.push(new Meta(key, value));
    });

    return metaData;
  }

  parseRounds(roundBlock: string[]): Round[] {
    const rounds: Round[] = [];
    const regexp = new RegExp("(\\d+)\\.\\s*(\\S+)\\s*(\\S+)", "g");

    const fullRoundBlock = roundBlock.join(" ");
    const matches: RegExpMatchArray[] = [...fullRoundBlock.matchAll(regexp)];

    matches.forEach(match => {
      const [_wholeLine, roundNumber, whiteMove, blackMove] = match;
      rounds.push(new Round(+roundNumber, whiteMove, blackMove));
    });

    return rounds;
  }
}