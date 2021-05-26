import { SphericalCamera } from '../Cameras';

export class KeyboardHandler {
  private _camera: SphericalCamera;

  constructor(camera: SphericalCamera) {
    this._camera = camera;
    this.applyEventListeners();
  }

  applyEventListeners() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code == "KeyA" || e.code == "ArrowLeft") this._camera.updateDirection("left", true);
      if (e.code == "KeyW" || e.code == "ArrowUp") this._camera.updateDirection("up", true);
      if (e.code == "KeyS" || e.code == "ArrowDown") this._camera.updateDirection("down", true);
      if (e.code == "KeyD" || e.code == "ArrowRight") this._camera.updateDirection("right", true);
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.code == "KeyA" || e.code == "ArrowLeft") this._camera.updateDirection("left", false);
      if (e.code == "KeyW" || e.code == "ArrowUp") this._camera.updateDirection("up", false);
      if (e.code == "KeyS" || e.code == "ArrowDown") this._camera.updateDirection("down", false);
      if (e.code == "KeyD" || e.code == "ArrowRight") this._camera.updateDirection("right", false);
    });
  }
}