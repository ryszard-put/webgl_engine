export interface MeshBuffers{
  vertex: WebGLBuffer;
  index: WebGLBuffer;
}

export class Shader {
  public gl: WebGL2RenderingContext | null;
  protected glProgram: WebGLProgram;
  protected uniformLocations: Map<string, WebGLUniformLocation> = new Map<string, WebGLUniformLocation>();
  protected attribLocations: Map<string, number> = new Map<string, number>();

  constructor(gl:WebGL2RenderingContext | null, vShader:string, fShader:string){
    this.gl = gl;
    this.glProgram = this._Init(vShader, fShader);
  }

  private _Init(vsSource:string, fsSource:string):WebGLProgram{
    const {gl} = this;
    const vertexShader = this._LoadShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this._LoadShader(gl.FRAGMENT_SHADER, fsSource);
    const glProgram = this.gl.createProgram()
    gl.attachShader(glProgram, vertexShader);
    gl.attachShader(glProgram, fragmentShader);
    gl.linkProgram(glProgram);
    if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(glProgram));
      return null;
    }
    
    return glProgram;
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

  public GetShaderProgram(){ return this.glProgram }

  // public initBuffers(mesh: Mesh): MeshBuffers {
  //   const {gl} = this;
  //   const vertexBuffer = gl.createBuffer();
  //   const indexBuffer = gl.createBuffer();

  //   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices.vPositions), gl.STATIC_DRAW);

  //   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  //   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);

  //   return {
  //     vertex: vertexBuffer,
  //     index: indexBuffer
  //   };
  // }

  public Use(){
    this.gl.useProgram(this.glProgram);
  }

  public GetAttribLocation(attrib: string){
    if(this.attribLocations.has(attrib)) return this.attribLocations.get(attrib);
    const location = this.gl.getAttribLocation(this.glProgram, attrib);
    this.attribLocations.set(attrib, location);
    return location;
  }

  public GetUniformLocation(attrib: string):WebGLUniformLocation{
    if(this.uniformLocations.has(attrib)) return this.uniformLocations.get(attrib);
    const location = this.gl.getUniformLocation(this.glProgram, attrib);
    this.uniformLocations.set(attrib, location);
    return location;
  }

  // 1 number uniforms
  public SetUniform1f(attrib: string, value: GLfloat){
    this.gl.uniform1f(this.GetUniformLocation(attrib),value);
  }

  public SetUniform1i(attrib: string, value: GLint){
    this.gl.uniform1i(this.GetUniformLocation(attrib),value);
  }

  public SetUniform1ui(attrib: string, value: GLuint){
    this.gl.uniform1ui(this.GetUniformLocation(attrib),value);
  }

  // vec1 uniforms
  public SetUniform1fv(attrib: string, data: Iterable<GLfloat>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform1fv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform1fv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform1fv(this.GetUniformLocation(attrib),data);
  }

  public SetUniform1iv(attrib: string, data: Iterable<GLint>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform1iv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform1iv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform1iv(this.GetUniformLocation(attrib),data);
  }

  public SetUniform1uiv(attrib: string, data: Iterable<GLuint>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform1uiv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform1uiv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform1uiv(this.GetUniformLocation(attrib),data);
  }

  // 2 numbers uniforms
  public SetUniform2f(attrib: string, value1: GLfloat, value2: GLfloat){
    this.gl.uniform2f(this.GetUniformLocation(attrib), value1,value2);
  }

  public SetUniform2i(attrib: string, value1: GLint, value2: GLint){
    this.gl.uniform2i(this.GetUniformLocation(attrib), value1,value2);
  }

  public SetUniform2ui(attrib: string, value1: GLuint, value2: GLuint){
    this.gl.uniform2ui(this.GetUniformLocation(attrib), value1, value2);
  }

  // vec2 uniforms
  public SetUniform2fv(attrib: string, data: Iterable<GLfloat>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform2fv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform2fv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform2fv(this.GetUniformLocation(attrib),data);
  }

  public SetUniform2iv(attrib: string, data: Iterable<GLint>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform2iv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform2iv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform2iv(this.GetUniformLocation(attrib),data);
  }

  public SetUniform2uiv(attrib: string, data: Iterable<GLuint>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform2uiv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform2uiv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform2uiv(this.GetUniformLocation(attrib),data);
  }

  // 3 numbers uniforms
  public SetUniform3f(attrib: string, value1: GLfloat, value2: GLfloat, value3: GLfloat){
    this.gl.uniform3f(this.GetUniformLocation(attrib),value1, value2, value3);
  }

  public SetUniform3i(attrib: string, value1: GLint, value2: GLint, value3: GLint){
    this.gl.uniform3i(this.GetUniformLocation(attrib), value1, value2, value3);
  }

  public SetUniform3ui(attrib: string, value1: GLuint, value2: GLuint, value3: GLuint){
    this.gl.uniform3ui(this.GetUniformLocation(attrib), value1, value2, value3);
  }

  // vec3 uniforms
  public SetUniform3fv(attrib: string, data: Iterable<GLfloat>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform3fv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform3fv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform3fv(this.GetUniformLocation(attrib),data);
  }

  public SetUniform3iv(attrib: string, data: Iterable<GLint>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform3iv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform3iv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform3iv(this.GetUniformLocation(attrib),data);
  }

  public SetUniform3uiv(attrib: string, data: Iterable<GLuint>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform3uiv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform3uiv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform3uiv(this.GetUniformLocation(attrib),data);
  }

  // 4 numbers uniforms
  public SetUniform4f(attrib: string, value1: GLfloat, value2: GLfloat, value3: GLfloat, value4: GLfloat){
    this.gl.uniform4f(this.GetUniformLocation(attrib), value1, value2, value3, value4);
  }

  public SetUniform4i(attrib: string, value1: GLint, value2: GLint, value3: GLint, value4: GLint){
    this.gl.uniform4i(this.GetUniformLocation(attrib), value1, value2, value3, value4);
  }

  public SetUniform4ui(attrib: string, value1: GLuint, value2: GLuint, value3: GLuint, value4: GLuint){
    this.gl.uniform4ui(this.GetUniformLocation(attrib), value1, value2, value3, value4);
  }

  // vec4 uniforms
  public SetUniform4fv(attrib: string, data: Iterable<GLfloat>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform4fv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform4fv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform4fv(this.GetUniformLocation(attrib),data);
  }

  public SetUniform4iv(attrib: string, data: Iterable<GLint>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform4iv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform4iv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform4iv(this.GetUniformLocation(attrib),data);
  }

  public SetUniform4uiv(attrib: string, data: Iterable<GLuint>, offset?:number,length?:number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniform4uiv(this.GetUniformLocation(attrib),data,offset,length);
      else
        this.gl.uniform4uiv(this.GetUniformLocation(attrib),data,offset);
    else
      this.gl.uniform4uiv(this.GetUniformLocation(attrib),data);
  }
  
  public SetUniformBlockBinding(uniformBlockIndex: number, uniformBlockBinding: number){
    this.gl.uniformBlockBinding(this.GetShaderProgram(),uniformBlockIndex, uniformBlockBinding);
  }

  // Matrix uniforms
  public SetUniformMatrix2fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix2fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix2fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix2fv(this.GetUniformLocation(attrib), transpose, data);
  }
  
  public SetUniformMatrix2x3fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix2x3fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix2x3fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix2x3fv(this.GetUniformLocation(attrib), transpose, data);
  }

  public SetUniformMatrix2x4fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix2x4fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix2x4fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix2x4fv(this.GetUniformLocation(attrib), transpose, data);
  }

  public SetUniformMatrix3fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix3fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix3fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix3fv(this.GetUniformLocation(attrib), transpose, data);
  }

  public SetUniformMatrix3x2fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix3x2fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix3x2fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix3x2fv(this.GetUniformLocation(attrib), transpose, data);
  }

  public SetUniformMatrix3x4fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix3x4fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix3x4fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix3x4fv(this.GetUniformLocation(attrib), transpose, data);
  }

  public SetUniformMatrix4fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix4fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix4fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix4fv(this.GetUniformLocation(attrib), transpose, data);
  }

  public SetUniformMatrix4x2fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix4x2fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix4x2fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix4x2fv(this.GetUniformLocation(attrib), transpose, data);
  }

  public SetUniformMatrix4x3fv(attrib: string, transpose: boolean, data: Iterable<GLfloat>, offset?: number, length?: number){
    if(offset !== undefined)
      if(length !== undefined)
        this.gl.uniformMatrix4x3fv(this.GetUniformLocation(attrib),transpose,data,offset,length);
      else
        this.gl.uniformMatrix4x3fv(this.GetUniformLocation(attrib),transpose,data,offset);
    else
      this.gl.uniformMatrix4x3fv(this.GetUniformLocation(attrib), transpose, data);
  }
}