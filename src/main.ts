import './assets/styles/main.css';
//import * as ENGINE from './engine';
import { KeyboardHandler, MouseHandler } from './engine/EventHandlers';

import DOM from "./chess/DOM";
//import { Entity } from './engine/Entity/Entity';
import { Renderer } from './engine/Renderer';
import { ModelLoader, MeshMap, MaterialMap } from './engine/Loaders'
import { SphericalCamera } from './engine/Cameras/SphericalCamera'
import {Scene} from './engine/Scene'
import { Model } from './engine/Model';
import { Mesh } from './engine/Mesh';
import { cubeMaterial, cubeMeshData } from './engine/Cube';
import { TextureLoader, TextureMap } from './engine/Loaders/TextureLoader';
import { Entity } from './engine/Entity';
import { Vector3 } from '@math.gl/core';
import Vector from '@math.gl/core/src/classes/base/vector';

let angle = 0;
let angleSpeed = 3.14/4;
export class Main {
  // private _renderer : ENGINE.Renderer;
  // private _scene : Entity[];
  private _camera : SphericalCamera;
  private _renderer: Renderer;
  private _previousTime: number = 0;
  private _keyboardHandler: KeyboardHandler;
  private _mouseHandler: MouseHandler;
  private _DOM: DOM;
  private _scene: Scene;
  private _meshes: MeshMap;
  private _textures: TextureMap;
  private _materials: MaterialMap;

  constructor(){
    //this.Init = this.Init.bind(this);
    this._MainLoop = this._MainLoop.bind(this);
  }

  public async Init(){
    this._renderer = new Renderer("webgl_canvas");

    this._meshes = await ModelLoader.loadMeshes(this._renderer.gl);
    this._materials = await ModelLoader.loadMaterials();
    this._textures = TextureLoader.loadTextures(this._renderer.gl);

    this._scene = new Scene();

    const cubeMesh = new Mesh(this._renderer.gl, cubeMeshData);

    const cube = new Model(cubeMesh,cubeMaterial)
    const frame = new Model(this._meshes["Frame"],this._materials['Frame'])
    frame.addTexture(this._textures['marble']);
    const squares = new Model(this._meshes["Squares"],this._materials['Squares'])
    squares.addTexture(this._textures['board_2x2']);

    const chessBoard = new Entity();
    chessBoard.addChild(frame);
    chessBoard.addChild(squares);
    this._scene.addChild(chessBoard);

    const whitePawns: Model[] = Array
    .from({length: 8}, (e: Model) => {
      e = new Model(this._meshes["Pawn"], this._materials["Pawn"]);
      e.setColor(new Vector3(1,1,1));
      e.translate(new Vector3([0,0.325,0]));
      e.addTexture(this._textures['bricks']);
      return e;
    });

    const blackPawns: Model[] = Array
    .from({length: 8}, (e: Model) => {
      e = new Model(this._meshes["Pawn"], this._materials["Pawn"]);
      e.setColor(new Vector3(0.05,0.05,0.05));
      e.translate(new Vector3([-0.3,0.325,0.3]));
      e.addTexture(this._textures['bricks']);
      return e;
    });

    chessBoard.addChildren(...blackPawns, ...whitePawns)
    chessBoard.setScale(new Vector3(0.5,0.5,0.5))
    // const chessFrame = new Model(this._meshes['Frame'], this._materials['Frame']);
    // this._scene.addChild(chessFrame);

    this._camera = new SphericalCamera(this._renderer.gl.canvas, 5, Math.PI, Math.PI*2/3);
    this._DOM = new DOM();
    this._keyboardHandler = new KeyboardHandler(this._camera);
    this._mouseHandler = new MouseHandler(this._camera, this._renderer.gl.canvas);
    requestAnimationFrame(this._MainLoop);
  }

  private _MainLoop(time: number){
    requestAnimationFrame(this._MainLoop);
    const delta = (time - this._previousTime)/1000;
    this._previousTime = time;
    this._camera.updatePosition(delta);
    this._renderer.gl.viewport(0, 0, this._renderer.gl.canvas.width, this._renderer.gl.canvas.height);

    angle += delta * angleSpeed;
    this._renderer.DrawScene(this._scene, this._camera);
  }
}


window.onload = () => {
  const main = new Main();
  main.Init();
}


  