export interface MeshData {
  vertices: number[];
  normals: number[];
  textures: number[];
  indices: number[];
}

export class Mesh {
  vertices: number[];
  normals: number[];
  textures: number[];
  indices: number[];
  VAO: WebGLVertexArrayObject;
  dataBuffers: {
    vertexBuffer?: WebGLBuffer;
    normalBuffer?: WebGLBuffer;
    textureBuffer?: WebGLBuffer;
    indexBuffer?: WebGLBuffer;
  }

  constructor(gl: WebGL2RenderingContext, data: MeshData){
    this.vertices = data.vertices;
    this.normals = data.normals;
    this.textures = data.textures;
    this.indices = data.indices;
    this.dataBuffers = {};
    this.initBuffers(gl);
  }

  public initBuffers(gl: WebGL2RenderingContext){
    this.VAO = gl.createVertexArray();
    gl.bindVertexArray(this.VAO);

    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.enableVertexAttribArray(2);

    this.dataBuffers.vertexBuffer = gl.createBuffer();;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffers.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices),gl.STATIC_DRAW);
    
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

    this.dataBuffers.normalBuffer = gl.createBuffer();;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffers.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals),gl.STATIC_DRAW);
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

    this.dataBuffers.textureBuffer = gl.createBuffer();;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.dataBuffers.textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textures),gl.STATIC_DRAW);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);

    this.dataBuffers.indexBuffer = gl.createBuffer();;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.dataBuffers.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices),gl.STATIC_DRAW);

    gl.bindVertexArray(null);
  }
}