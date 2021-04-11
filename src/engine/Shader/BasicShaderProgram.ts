import { ShaderProgram } from "./ShaderProgram";

const glsl = x => x;

export const VertexShader = glsl`
  attribute vec4 vertex;

  uniform mat4 M;
  uniform mat4 V;
  uniform mat4 P;

  void main() {
    gl_Position = P * V * M * vertex;
  }
`

export const FragmentShader = glsl`
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  }
`

export class BasicShaderProgram extends ShaderProgram {
  constructor(gl:WebGL2RenderingContext){
    super(gl,VertexShader, FragmentShader);
  }
}