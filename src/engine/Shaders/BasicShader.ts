import { Shader } from "./Shader";

const glsl = x => x;

export const VertexShader = glsl`#version 300 es
  layout(location = 0) in vec3 vertex;
  layout(location = 1) in vec3 normal;
  layout(location = 2) in vec2 textureCoords;

  uniform mat4 M;
  uniform mat4 V;
  uniform mat4 P;

  void main() {
    gl_Position = P * V * M * vec4(vertex, 1.0);
  }
`

export const FragmentShader = glsl`#version 300 es
  precision highp float;
  
  out vec4 pixelColor;

  void main() {
    pixelColor = vec4(1.0, 1.0, 1.0, 1.0);;
  }
`

export class BasicShader extends Shader {
  constructor(gl:WebGL2RenderingContext){
    super(gl,VertexShader, FragmentShader);
  }
}