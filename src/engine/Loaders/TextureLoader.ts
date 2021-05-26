import {Texture} from '../Texture';

export interface TextureMap {
  [key: string]: Texture;
}

export class TextureLoader {
  public static loadTextures(gl: WebGL2RenderingContext): TextureMap{
    return {
      "bricks": new Texture(gl,"bricks.png"),
      "marble": new Texture(gl,"marble.jpeg"),
      "board_2x2": new Texture(gl,"board_2x2.jpg")
    }
  }
}