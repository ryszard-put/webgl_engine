import { Material } from "../Material";
import { MeshData } from "../Mesh";
import {cubeVertices, cubeVertexNormals, cubeTexCoords} from './data'

export const cubeMeshData: MeshData = {
  vertices: cubeVertices,
  normals: cubeVertexNormals,
  textures: cubeTexCoords,
  indices: []
}

export const cubeMaterial: Material = {
  Ka: [0.3,0.3,0.3],
  Kd: [0.5,0.5,0.5],
  Ks: [1,1,1],
  Ke: [0,0,0],
  Ni: 1.45,
  Ns: 50,
  d: 1,
  illum: 3
}



