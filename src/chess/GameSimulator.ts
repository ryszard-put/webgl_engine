import Game from "./Game"
import Round from "./Round"

export default class GameSimulator {
  private _game: Game;
  private _currentRound: number;

  get game(): Game {
    return this._game;
  }

  get currentRound(): Round {
    const toSeek = this._currentRound - 1;
    if (toSeek >= 0 && toSeek < this._game.rounds.length) {
      return this._game.rounds[toSeek];
    }
  }

  constructor(game: Game) {
    this._game = game;
    this._currentRound = 1;
    console.log(game);
  }
}