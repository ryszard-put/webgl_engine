import { Mesh } from "../Mesh";

export class MeshLoader {
  static async load(gl: WebGL2RenderingContext, filename: string): Promise<Mesh> {
    try{
      const response = await fetch(`/models/${filename}.obj`);
      const data = await response.text();
      return MeshLoader.parseData(gl, data);
    } catch(e){
      console.error(e);
    }
  }

  static parseData(gl: WebGL2RenderingContext, data: string): Mesh {
    const lines: string[] = data.split("\n");

    const tempVertices: number[][] = []; // v
    const tempNormals: number[][] = []; // vn
    const tempTextures: number[][] = []; // vt

    const vertexIndices: number[] = [];
    const normalIndices: number[] = [];
    const textureIndices: number[] = [];


    lines.forEach(line => {
      const lineSegments = line.split(" ");
      if (lineSegments[0] == 'v') tempVertices.push([+lineSegments[1], +lineSegments[2], +lineSegments[3]]);
      if (lineSegments[0] == 'vn') tempNormals.push([+lineSegments[1], +lineSegments[2], +lineSegments[3]]);
      if (lineSegments[0] == 'vt') tempTextures.push([+lineSegments[1], +lineSegments[2]]);
      if (lineSegments[0] == 'f') {
        const x = lineSegments[1].split("/").map(Number),
        y = lineSegments[2].split("/").map(Number),
        z = lineSegments[3].split("/").map(Number);

        vertexIndices.push(x[0],y[0],z[0]);
        textureIndices.push(x[1],y[1],z[1]);
        normalIndices.push(x[2],y[2],z[2]);
      }
    });

    const vecVertices: number[][] = [];
    const vecNormals: number[][]= [];
    const vecTextures: number[][] = [];
    const indices: number[] = [];

    for(let i = 0; i < vertexIndices.length; i++){
      const vertexIndex = vertexIndices[i];
      const normalIndex = normalIndices[i];
      const textureIndex = textureIndices[i];
      vecVertices.push(tempVertices[vertexIndex - 1]);
      vecNormals.push(tempNormals[normalIndex - 1]);
      vecTextures.push(tempTextures[textureIndex - 1]);
      indices.push(vertexIndices[i], vertexIndices[i+1], vertexIndices[i+2]);
    }

    const vertices = vecVertices.flat()
    const normals = vecNormals.flat()
    const textures = vecTextures.flat()
    
    return new Mesh(gl, {vertices, normals, textures, indices});
  }
}
