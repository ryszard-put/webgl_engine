import { PerspectiveCamera } from './'

export class SphericalCamera extends PerspectiveCamera {
  private _radius: number;
  private _theta: number; // vertical
  private _phi: number; // horizontal
  private _speed: number;
  private _locked: boolean;

  private _controlButtonsPressed: {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
  }

  constructor(canvas: HTMLCanvasElement | OffscreenCanvas, radius: number = 10, phi: number = 0, theta: number = Math.PI / 2) {
    super(canvas, radius);
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
    this._staticPosition = this.positionOnSphere(0, Math.PI / 2);
  }

  get radius(): number {
    return this._radius;
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

  get position(): number[] {
    if (this._locked) return this._staticPosition;
    return this.positionOnSphere(this.phi, this.theta);
  }

  set locked(newLocked: boolean) {
    this._locked = newLocked;
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

  zoomIn(by: number){
    if(this._radius - by >= 4) this._radius -= by;
  }

  zoomOut(by: number){
    if(this._radius + by <= 20) this._radius += by;
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