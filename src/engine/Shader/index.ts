export {ShaderProgram} from './ShaderProgram'
import {BasicShaderProgram} from './BasicShaderProgram'
import {ColoredShaderProgram} from './ColoredShaderProgram'
import { TextureShaderProgram } from './TextureShaderProgram'

export interface ShaderPrograms {
  basic: BasicShaderProgram;
  colored: ColoredShaderProgram;
  texture: TextureShaderProgram;
}

const initShaderPrograms = function(gl: WebGL2RenderingContext): ShaderPrograms{
  return {
    basic: new BasicShaderProgram(gl),
    colored: new ColoredShaderProgram(gl),
    texture: new TextureShaderProgram(gl)
  }
}

export default initShaderPrograms;