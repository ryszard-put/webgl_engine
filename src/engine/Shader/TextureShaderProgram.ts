import { ShaderProgram } from "./ShaderProgram";

const glsl = x => x;

export const VertexShader = glsl`
  attribute vec4 vertex;
  attribute vec2 texture;

  uniform mat4 M;
  uniform mat4 V;
  uniform mat4 P;

  varying highp vec2 texCoord;

  void main() {
    texCoord = texture;
    gl_Position = P * V * M * vertex;
  }
`

export const FragmentShader = glsl`
  varying highp vec2 texCoord;

  uniform sampler2D sampler;

  void main() {
    gl_FragColor = texture2D(sampler,texCoord);
  }
`

export class TextureShaderProgram extends ShaderProgram {
  constructor(gl:WebGL2RenderingContext){
    super(gl,VertexShader, FragmentShader);
  }
}