import Game from "./Game"
import GameSimulator from "./GameSimulator"
import FileParser from "./FileParser"

export default class DOM {
  private _canvas: HTMLCanvasElement;
  private _fileSelect: HTMLSelectElement;
  private _gameNumberSelect: HTMLSelectElement;
  private _informationContainer: HTMLElement;

  private _selectedGameFile: string;
  private _selectedGameNumber: number;

  private _availableGameFiles: string[];
  private _fileParsers: {
    [key: string]: FileParser;
  };

  private _gameSimulator: GameSimulator;

  constructor() {
    this._availableGameFiles = ["adams.pgn", "fischer.pgn"];
    this._fileParsers = {};
    this.loadDOMObjects();
    this.loadFiles();
    this.initializeInputState();
    this.addEventListeners();
  }

  get gameSimulator(): GameSimulator {
    return this._gameSimulator;
  }

  loadDOMObjects() {
    this._canvas = document.querySelector("canvas");
    this._fileSelect = document.querySelector("#file-select");
    this._gameNumberSelect = document.querySelector("#game-number-select");
    this._informationContainer = document.querySelector("#info");
  }

  loadFiles() {
    this._availableGameFiles.forEach(file => this._fileParsers[file] = new FileParser(file));
  }

  initializeInputState() {
    const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

    // Game number can only be changed if file is selected and loaded
    this._gameNumberSelect.disabled = true;

    this._fileSelect.innerHTML = `
      <option value="" selected disabled>-- Please choose game file --</option>
    `;
    this._availableGameFiles.forEach(file => {
      this._fileSelect.innerHTML += `<option value="${file}">${capitalize(file)}</option>`;
    });

    this._gameNumberSelect.innerHTML = `
      <option value="" selected disabled>-- Please choose game number --</option>
    `;
  }

  updateGameInformation() {
    this._informationContainer.innerHTML = ``;
    if (this._gameSimulator) {
      this._gameSimulator.game.metaData.forEach(meta => this._informationContainer.innerHTML += `<p>${meta.key}: ${meta.value}</p>`);
    }
  }

  updateSidebar() {
    this.updateGameInformation();
  }

  addEventListeners() {
    this._fileSelect.addEventListener("change", (_e: Event) => {
      this._selectedGameFile = this._fileSelect.value;
      this._gameNumberSelect.disabled = false;

      this._gameNumberSelect.innerHTML = `
        <option value="" selected disabled>-- Please choose game number --</option>
      `;

      this._gameSimulator = null;
      this._selectedGameNumber = null;

      for (let i = 0; i < this._fileParsers[this._selectedGameFile].games.length; i++) {
        const game: Game = this._fileParsers[this._selectedGameFile].games[i];
        const whitePlayer: string = game.findMetaData("White");
        const blackPlayer: string = game.findMetaData("Black");
        if (whitePlayer && blackPlayer) this._gameNumberSelect.innerHTML += `<option value="${i}">${i + 1}. ${whitePlayer} vs ${blackPlayer}</option>`;
        else this._gameNumberSelect.innerHTML += `<option value="${i}">${i + 1}</option>`;
      }
      this.updateSidebar();
    });

    this._gameNumberSelect.addEventListener("change", (_e: Event) => {
      this._selectedGameNumber = +this._gameNumberSelect.value;
      this._gameSimulator = new GameSimulator(this._fileParsers[this._selectedGameFile].games[this._selectedGameNumber]);
      this.updateSidebar();
    });

    // const parentNode: HTMLElement = document.querySelector(`#canvas-parent`);
    // const canvas: HTMLCanvasElement = document.querySelector("#webgl_canvas");
    // const clientRect = parentNode.getBoundingClientRect();
    // canvas.height = clientRect.height;
    // canvas.width = clientRect.width;
    // window.addEventListener("resize", _e => {
    //   const clientRect = parentNode.getBoundingClientRect();
    //   canvas.height = clientRect.height;
    //   canvas.width = clientRect.width;
    // })
  }
}