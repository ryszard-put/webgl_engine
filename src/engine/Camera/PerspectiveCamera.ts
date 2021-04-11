import { Matrix4, Vector3 } from '@math.gl/core';
import { Main } from '../../main';

export class PerspectiveCamera {
  private _main: Main;
  private _radius: number;
  private _theta: number; // vertical
  private _phi: number; // horizontal
  private _speed: number;
  private _locked: boolean;
  
  private _staticPlacement: number[];
  private _center: number[];
  private _up: number[];

  private _controlButtonsPressed: {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
  }

  constructor(radius: number = 10, phi: number = 0, theta: number = Math.PI / 2) {
    this._radius = radius;
    this._theta = theta;
    this._phi = phi;
    this._speed = Math.PI;
    this._controlButtonsPressed = {
      up: false,
      down: false,
      left: false,
      right: false,
    }
    this._locked = false;
    this._staticPlacement = this.positionOnSphere(0, Math.PI / 2);
    this._center = [0, 0, 0];
    this._up = [0, 1, 0];
  }

  get radius(): number {
    return this._radius;
  }

  get main(): Main {
    return this._main;
  }

  get phi(): number {
    return this._phi;
  }

  get theta(): number {
    return this._theta;
  }

  get locked(): boolean {
    return this._locked;
  }

  set locked(newLocked: boolean) {
    this._locked = newLocked;
  }

  get position(): number[] {
    //if (this._locked) return this._staticPlacement;
    return this.positionOnSphere(this.phi, this.theta);
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
    const aspect = this._main.renderer.gl.canvas.width / this._main.renderer.gl.canvas.height;
    const near = 0.1;
    const far = 100.0;
    const ProjectionMatrix = (new Matrix4()).perspective({fov, aspect, near, far});
    return ProjectionMatrix;
  }

  bindMain(main: Main) {
    this._main = main;
  }

  private positionOnSphere(horizontalAngle: number, verticalAngle: number): number[] {
    const z = -this._radius * Math.cos(horizontalAngle) * Math.sin(verticalAngle);
    const x = this._radius * Math.sin(horizontalAngle) * Math.sin(verticalAngle);
    const y = -this._radius * Math.cos(verticalAngle);
    return ([x, y, z]);
  }

  updateDirection(direction: string, value: boolean) {
    const validDirections: string[] = ["up", "down", "left", "right"];
    if (validDirections.includes(direction)) this._controlButtonsPressed[direction] = value;
  }

  handleSwipe(horizontal: number, vertical: number) { // horizontal & vertical in range -> [-1, 1]
    if (!this._locked) {
      this._phi += horizontal * 2 * Math.PI;
      this._theta += vertical * Math.PI;
      this.normalizeAngles();
    }
  }

  updatePosition(delta: number) {
    if (!this._locked) {
      if (this._controlButtonsPressed.up && !this._controlButtonsPressed.down) this._theta += this._speed * delta;
      if (!this._controlButtonsPressed.up && this._controlButtonsPressed.down) this._theta -= this._speed * delta;
      if (this._controlButtonsPressed.right && !this._controlButtonsPressed.left) this._phi += this._speed * delta;
      if (!this._controlButtonsPressed.right && this._controlButtonsPressed.left) this._phi -= this._speed * delta;
      this.normalizeAngles();
    }
  }

  private normalizeAngles() {
    this._phi %= 2*Math.PI;
    this._theta = Math.min(Math.PI*0.99, Math.max(0.1, this._theta));
  }

}