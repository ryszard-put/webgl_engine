import { Matrix4 } from "@math.gl/core";
import { Renderer } from "../Renderer";

export class Cube {
  private _renderer: Renderer;
  private _vertices: number[];
  private _texCoords: number[];
  // private _texCoords: number[];
  public buffers: {vertex: any, texture: any};

  constructor(renderer: Renderer){
    this._renderer = renderer
    this._Init();
  }

  private _Init(){
    const {gl} = this._renderer;

    this._vertices = CubeInternal.vertices;
    this._texCoords = CubeInternal.texCoords;

    const vertexBuffer = gl.createBuffer();
    const textureBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this._vertices),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this._texCoords),gl.STATIC_DRAW);

    this.buffers = {
      vertex: vertexBuffer,
      texture: textureBuffer
    };
  }

  public Draw(){
    const {gl, shaderPrograms, _ProjectionMatrix, _ViewMatrix, textures} = this._renderer;
    const sp = shaderPrograms.texture;
    sp.Use();

    gl.uniformMatrix4fv(sp.GetUniformLocation("P"),false,_ProjectionMatrix);
    gl.uniformMatrix4fv(sp.GetUniformLocation("V"),false,_ViewMatrix);
    const ModelMatrix = new Matrix4();
    gl.uniformMatrix4fv(sp.GetUniformLocation("M"),false,ModelMatrix);

    gl.activeTexture(gl.TEXTURE0);

    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);

    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(sp.GetUniformLocation("sampler"), 0);


    gl.enableVertexAttribArray(sp.GetAttribLocation("vertex"));
    gl.enableVertexAttribArray(sp.GetAttribLocation("texture"));

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertex);
    gl.vertexAttribPointer(sp.GetAttribLocation("vertex"),4, gl.FLOAT,false,0,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.texture);
    gl.vertexAttribPointer(sp.GetAttribLocation("texture"),2, gl.FLOAT,false,0,0);

    gl.drawArrays(gl.TRIANGLES, 0,this._vertices.length);

    gl.disableVertexAttribArray(sp.GetAttribLocation("vertex"));
    gl.disableVertexAttribArray(sp.GetAttribLocation("texture"));
  }
}

namespace CubeInternal {
  export const vertices = [
      1.0,-1.0,-1.0,1.0,
      -1.0, 1.0,-1.0,1.0,
      -1.0,-1.0,-1.0,1.0,

      1.0,-1.0,-1.0,1.0,
      1.0, 1.0,-1.0,1.0,
      -1.0, 1.0,-1.0,1.0,

      -1.0,-1.0, 1.0,1.0,
      1.0, 1.0, 1.0,1.0,
      1.0,-1.0, 1.0,1.0,

      -1.0,-1.0, 1.0,1.0,
      -1.0, 1.0, 1.0,1.0,
      1.0, 1.0, 1.0,1.0,

      1.0,-1.0, 1.0,1.0,
      1.0, 1.0,-1.0,1.0,
      1.0,-1.0,-1.0,1.0,

      1.0,-1.0, 1.0,1.0,
      1.0, 1.0, 1.0,1.0,
      1.0, 1.0,-1.0,1.0,

      -1.0,-1.0,-1.0,1.0,
      -1.0, 1.0, 1.0,1.0,
      -1.0,-1.0, 1.0,1.0,

      -1.0,-1.0,-1.0,1.0,
      -1.0, 1.0,-1.0,1.0,
      -1.0, 1.0, 1.0,1.0,

      -1.0,-1.0,-1.0,1.0,
      1.0,-1.0, 1.0,1.0,
      1.0,-1.0,-1.0,1.0,

      -1.0,-1.0,-1.0,1.0,
      -1.0,-1.0, 1.0,1.0,
      1.0,-1.0, 1.0,1.0,

      -1.0, 1.0, 1.0,1.0,
      1.0, 1.0,-1.0,1.0,
      1.0, 1.0, 1.0,1.0,

      -1.0, 1.0, 1.0,1.0,
      -1.0, 1.0,-1.0,1.0,
      1.0, 1.0,-1.0,1.0,
    ];
    export const colors = [
      1.0,0.0,0.0,1.0,
      1.0,0.0,0.0,1.0,
      1.0,0.0,0.0,1.0,

      1.0,0.0,0.0,1.0,
      1.0,0.0,0.0,1.0,
      1.0,0.0,0.0,1.0,

      0.0,1.0,0.0,1.0,
      0.0,1.0,0.0,1.0,
      0.0,1.0,0.0,1.0,

      0.0,1.0,0.0,1.0,
      0.0,1.0,0.0,1.0,
      0.0,1.0,0.0,1.0,

      0.0,0.0,1.0,1.0,
      0.0,0.0,1.0,1.0,
      0.0,0.0,1.0,1.0,

      0.0,0.0,1.0,1.0,
      0.0,0.0,1.0,1.0,
      0.0,0.0,1.0,1.0,

      1.0,1.0,0.0,1.0,
      1.0,1.0,0.0,1.0,
      1.0,1.0,0.0,1.0,

      1.0,1.0,0.0,1.0,
      1.0,1.0,0.0,1.0,
      1.0,1.0,0.0,1.0,

      0.0,1.0,1.0,1.0,
      0.0,1.0,1.0,1.0,
      0.0,1.0,1.0,1.0,

      0.0,1.0,1.0,1.0,
      0.0,1.0,1.0,1.0,
      0.0,1.0,1.0,1.0,

      1.0,1.0,1.0,1.0,
      1.0,1.0,1.0,1.0,
      1.0,1.0,1.0,1.0,

      1.0,1.0,1.0,1.0,
      1.0,1.0,1.0,1.0,
      1.0,1.0,1.0,1.0,
    ];
    export const texCoords = [
      1.0,1.0, 0.0,0.0, 0.0,1.0,
      1.0,1.0, 1.0,0.0, 0.0,0.0,

      1.0,1.0, 0.0,0.0, 0.0,1.0,
      1.0,1.0, 1.0,0.0, 0.0,0.0,

      1.0,1.0, 0.0,0.0, 0.0,1.0,
      1.0,1.0, 1.0,0.0, 0.0,0.0,

      1.0,1.0, 0.0,0.0, 0.0,1.0,
      1.0,1.0, 1.0,0.0, 0.0,0.0,

      1.0,1.0, 0.0,0.0, 0.0,1.0,
      1.0,1.0, 1.0,0.0, 0.0,0.0,

      1.0,1.0, 0.0,0.0, 0.0,1.0,
      1.0,1.0, 1.0,0.0, 0.0,0.0,
    ]
}