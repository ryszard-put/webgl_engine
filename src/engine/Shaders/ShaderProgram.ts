export class ShaderProgram {
  private gl: WebGL2RenderingContext | null;
  private shaderProgram: WebGLProgram;
  constructor(gl:WebGL2RenderingContext | null, vShader:string, fShader:string){
    this.gl = gl;
    this._Init(vShader, fShader);
  }
  private _Init(vsSource:string, fsSource:string){
    const {gl} = this;
    const vertexShader = this._LoadShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this._LoadShader(gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = this.gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
    this.shaderProgram = shaderProgram;
    return shaderProgram;
  }

  private _LoadShader(type:number, source:string){
    const {gl} = this;
    const shader = gl.createShader(type);

    // Send the source to the shader object
    gl.shaderSource(shader, source);

    // Compile the shader program
    gl.compileShader(shader);

    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  public GetShaderProgram(){ return this.shaderProgram }

  public Use(){
    this.gl.useProgram(this.shaderProgram);
  }

  public GetAttribLocation(attrib: string){
    return this.gl.getAttribLocation(this.shaderProgram, attrib);
  }

  public GetUniformLocation(attrib: string){
    return this.gl.getUniformLocation(this.shaderProgram, attrib);
  }
}