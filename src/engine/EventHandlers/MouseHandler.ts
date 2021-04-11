import { PerspectiveCamera } from '../Camera';

export class MouseHandler {
  private _camera: PerspectiveCamera;
  private _recording: boolean
  private _lastPosition: {
    x: number,
    y: number
  }
  private _canvas: HTMLCanvasElement | OffscreenCanvas;

  constructor(camera: PerspectiveCamera) {
    this._camera = camera;
    this._recording = false;
    this._canvas = this._camera.main.renderer.gl.canvas;
    this._lastPosition = {
      x: 0,
      y: 0
    }
    this.applyEventListeners();
  }

  applyEventListeners() {
    this._canvas.addEventListener("mousedown", (e: MouseEvent) => {
      this._recording = true;
      const {x, y} = e;
      this._lastPosition = {x, y};
    });

    window.addEventListener("mouseup", (_e: MouseEvent) => {
      this._recording = false;
    });

    this._canvas.addEventListener("mousemove", (e: MouseEvent) => {
      if(this._recording) {
        const {x, y} = e;
        const diffX = x - this._lastPosition.x;
        const diffY = y - this._lastPosition.y;
        this._lastPosition = {x, y};
        this._camera.handleSwipe(diffX / this._canvas.width, diffY / this._canvas.height);
      }
    });
  }
}