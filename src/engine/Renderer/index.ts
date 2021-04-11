import {Matrix4} from '@math.gl/core';
import { Main } from '../../main';

import initShaderPrograms, {ShaderPrograms} from '../Shader';
import { Cube } from '../Shapes';
import { Texture } from '../Texture/Texture';


import img from 'url:../../assets/images/bricks.png';

export class Renderer {
  public gl: WebGL2RenderingContext;
  public shaderPrograms: ShaderPrograms;
  public cube: Cube;
  public main: Main;
  public textures: WebGLTexture[] = [];
  public _ViewMatrix: Matrix4;
  public _ProjectionMatrix: Matrix4;

  constructor(){
    this._Init();
  }

  bindMain(main: Main){
    this.main = main;
  }

  private _Init(){
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 900;
    document.body.appendChild(canvas);
    const gl = canvas.getContext("webgl2")!;
    this.gl = gl;
    this.shaderPrograms = initShaderPrograms(gl);
    this.textures.push(Texture.loadFromFile(this.gl,img))
    console.log(this.textures)
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    this.cube = new Cube(this);
  }

  private _UpdateCamera(){
    this._ViewMatrix = this.main.camera.viewMatrix;
    this._ProjectionMatrix = this.main.camera.projectionMatrix;
  }

  public DrawScene(){
    const {gl,cube} = this;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    this._UpdateCamera();
    
    cube.Draw();
  }
}

// TODO: Draw 3D space lines

// function ptaszek(gl){
//   const positionBuffer = gl.createBuffer();
//   const colorBuffer = gl.createBuffer();
//   const indexBuffer = gl.createBuffer();

//   const positions = [
//     -1,1,0,1,  0,-1,-1,1,  1,1,0,1,  0,-1,1,1
//   ];

//   const colors = [
//     1,0,0,1, 0,1,0,1, 0,0,1,1, 1,1,0,1
//   ]

//   const indices = [
//     0,1,2,  0,2,3
//   ]

//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);
  
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
//   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices), gl.STATIC_DRAW);

//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.STATIC_DRAW);

//   return {
//     position: positionBuffer,
//     color: colorBuffer,
//     index: indexBuffer
//   };
// }