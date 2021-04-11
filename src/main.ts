import {Renderer} from './engine';
import { PerspectiveCamera } from './engine/Camera';
import { KeyboardHandler, MouseHandler } from './engine/EventHandlers';

export class Main {
  private _renderer: Renderer;
  private _camera: PerspectiveCamera;
  private _previousTime: number = 0;
  // public _speed_x: number = 0;
  // public _speed_y: number = 0;
  // public _rot_x: number = 0;
  // public _rot_y: number = 0;
  private _keyboardHandler: KeyboardHandler;
  private _mouseHandler: MouseHandler;

  constructor(){
    //this.Init = this.Init.bind(this);
    this._MainLoop = this._MainLoop.bind(this);
  }

  get renderer(): Renderer {
    return this._renderer;
  }

  get camera(): PerspectiveCamera {
    return this._camera;
  }

  public Init(){
    this._renderer = new Renderer();
    this._renderer.bindMain(this);
    this._camera = new PerspectiveCamera();
    this._camera.bindMain(this);
    this._keyboardHandler = new KeyboardHandler(this._camera);
    this._mouseHandler = new MouseHandler(this._camera);
    requestAnimationFrame(this._MainLoop)
  }

  private _MainLoop(time:number){
    const delta = (time - this._previousTime)/1000;
    this._previousTime = time;
    this._camera.updatePosition(delta);
    this._renderer.DrawScene();
    requestAnimationFrame(this._MainLoop);
  }
}


window.onload = () => {
  const main = new Main();
  main.Init();
}


  