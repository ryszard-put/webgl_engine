import { Matrix4, Vector3 } from '@math.gl/core';
import { SphericalCamera } from './Cameras';
import { Entity } from './Entity';
import { Model } from './Model';
import { Scene } from './Scene';
//import { Entity } from './Entity'
import { Shaders, initShaders, Shader } from './Shaders';

export class Renderer {
  public gl: WebGL2RenderingContext;
  public shaders: Shaders;

  constructor(canvasId: string) {
    this._Init(canvasId);
    this._InitWebGLProgram();
  }

  private _Init(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.gl = canvas.getContext("webgl2", { antialias: true, depth: true });
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    window.addEventListener("resize", _e => {
      canvas.height = canvas.clientHeight;
      canvas.width = canvas.clientWidth;
    })
  }

  private _InitWebGLProgram() {
    const { gl } = this;
    this.shaders = initShaders(gl);
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
  }

  public DrawScene(scene: Scene, camera: SphericalCamera) {
    const { gl } = this;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    scene.updateModelMatrix();

    let objects = scene.children[0].children as Model[];
    for(const object of objects){
      let shader = this.shaders.phong;
      shader.Use();
      shader.SetUniformMatrix4fv("u_P", false, camera.projectionMatrix);
      shader.SetUniformMatrix4fv("u_V", false, camera.viewMatrix);
      // shader.SetUniformMatrix4fv("u_M", false, object.modelMatrix);
      shader.SetUniformMatrix4fv("u_M", false, object.getModelMatrix());
      shader.SetUniform3fv("u_material.ambient", object.material.Ka);
      shader.SetUniform3fv("u_material.diffuse", object.material.Kd);
      shader.SetUniform3fv("u_material.specular", object.material.Ks);
      shader.SetUniform3fv("u_material.color", [1.0, 1.0, 1.0]);
      shader.SetUniform1f("u_material.alpha", object.material.d);
      shader.SetUniform1f("u_material.shininess", object.material.Ns);
      shader.SetUniform3fv("u_light.position", new Vector3(10.0, 10.0, 0.0));
      shader.SetUniform3fv("u_light.color", new Vector3(1.0, 1.0, 1.0));
      shader.SetUniform1i("u_texture0", 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, object.material.textures[0].textureObject)

      gl.bindVertexArray(object.mesh.VAO);
      gl.drawArrays(gl.TRIANGLES, 0, object.mesh.vertices.length / 3);
      gl.bindVertexArray(null);
    }
    
  }

  public SetUniforms(shader: Shader, object: Entity){
    
  }
}