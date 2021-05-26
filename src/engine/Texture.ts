export class Texture {
  static PATH: string = '/textures'
  public textureObject: WebGLTexture;

  constructor(gl: WebGL2RenderingContext, filename: string){
    const texture = gl.createTexture();
    this.textureObject = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Temporary color texture
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,255,255]));

    const image = new Image();
    image.src = `${Texture.PATH}/${filename}`;
    image.addEventListener('load', () => {
      gl.bindTexture(gl.TEXTURE_2D, this.textureObject);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    });
  }

}