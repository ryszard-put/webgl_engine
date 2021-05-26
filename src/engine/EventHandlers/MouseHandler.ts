import { SphericalCamera } from '../Cameras';

export class MouseHandler {
  private _camera: SphericalCamera;
  private _recording: boolean
  private _lastPosition: {
    x: number,
    y: number
  }
  private _canvas: HTMLCanvasElement | OffscreenCanvas;

  constructor(camera: SphericalCamera, canvas: HTMLCanvasElement | OffscreenCanvas) {
    this._camera = camera;
    this._recording = false;
    this._canvas = canvas;
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

    this._canvas.addEventListener("wheel", (e: WheelEvent) => {
      if(e.deltaY < 0)
        // Zoom in
        this._camera.zoomIn(1);
      else if(e.deltaY > 0)
        // Zoom out
        this._camera.zoomOut(1);
      console.log(this._camera.radius)
    })
  }
}