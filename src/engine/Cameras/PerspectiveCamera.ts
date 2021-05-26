import { Matrix4, Vector3 } from '@math.gl/core';

export class PerspectiveCamera {
  protected _canvas: HTMLCanvasElement | OffscreenCanvas;
  protected _center: number[];
  protected _up: number[];
  protected _staticPosition: number[];

  constructor(canvas: HTMLCanvasElement | OffscreenCanvas, radius: number = 10) {
    this._center = [0, 0, 0];
    this._up = [0, 1, 0];
    this._staticPosition = [radius, 0, 0];
    this._canvas = canvas;
  }

  get position(): number[] {
    return this._staticPosition
  }

  get viewMatrix(): Matrix4 {
    const positionVector = new Vector3(this.position);
    const centerVector = new Vector3(this._center);
    const upVector = new Vector3(this._up);

    const cameraDirection = positionVector.clone();
    cameraDirection.sub(centerVector.clone()).normalize();

    const cameraRight = upVector.clone();
    cameraRight.cross(cameraDirection).normalize();

    const cameraUp = cameraDirection.clone();
    cameraUp.cross(cameraRight);

    return (new Matrix4()).lookAt(
      positionVector,
      centerVector,
      cameraUp
      );
  }

  get projectionMatrix(): Matrix4 {
    const fov = 45 * Math.PI / 180;   // in radians
    const aspect = this._canvas.width / this._canvas.height;
    const near = 0.1;
    const far = 150.0;
    const ProjectionMatrix = (new Matrix4()).perspective({fov, aspect, near, far});
    return ProjectionMatrix;
  }
}