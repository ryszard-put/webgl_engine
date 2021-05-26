export {Shader} from './Shader'
import {BasicShader} from './BasicShader'
import { PhongShader } from './PhongShader'
import { TextureShader } from './TextureShader'

export interface Shaders {
  basic: BasicShader;
  texture: TextureShader;
  phong: PhongShader
}

export const initShaders = function(gl: WebGL2RenderingContext): Shaders{
  return {
    basic: new BasicShader(gl),
    texture: new TextureShader(gl),
    phong: new PhongShader(gl)
  }
}