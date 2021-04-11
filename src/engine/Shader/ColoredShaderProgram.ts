import { ShaderProgram } from "./ShaderProgram";

const glsl = x => x;

export const VertexShader = glsl`
  attribute vec4 vertex;
  attribute vec4 color;

  uniform mat4 M;
  uniform mat4 V;
  uniform mat4 P;

  varying mediump vec4 i_c;

  void main() {
    i_c = color;
    gl_Position = P * V * M * vertex;
  }
`

export const FragmentShader = glsl`
  varying mediump vec4 i_c;
  void main() {
    gl_FragColor = i_c;
  }
`

export class ColoredShaderProgram extends ShaderProgram {
  constructor(gl:WebGL2RenderingContext){
    super(gl,VertexShader, FragmentShader);
  }
}