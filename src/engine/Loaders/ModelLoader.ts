import { MeshLoader, MaterialLoader } from './'
import { Mesh } from '../Mesh'
import { Material } from '../Material'

export interface MeshMap {
  [key: string]: Mesh;
}

export interface MaterialMap {
  [key: string]: Material;
}

export class ModelLoader {
  public static async loadMeshes(gl: WebGL2RenderingContext): Promise<MeshMap> {
    return ({
      'Queen': await MeshLoader.load(gl, "Queen"),
      'King': await MeshLoader.load(gl, "King"),
      'Rook': await MeshLoader.load(gl, "Rook"),
      'Bishop': await MeshLoader.load(gl, "Bishop"),
      'Pawn': await MeshLoader.load(gl, "Pawn"),
      'Knight': await MeshLoader.load(gl, "Knight"),
      'Frame': await MeshLoader.load(gl, "ChessBoardFrame"),
      'Squares': await MeshLoader.load(gl, "ChessBoardSquares"),
    });
  }

  public static async loadMaterials(): Promise<MaterialMap> {
    return ({
      'Queen': await MaterialLoader.load("Queen"),
      'King': await MaterialLoader.load("King"),
      'Rook': await MaterialLoader.load("Rook"),
      'Bishop': await MaterialLoader.load("Bishop"),
      'Pawn': await MaterialLoader.load("Pawn"),
      'Knight': await MaterialLoader.load("Knight"),
      'Frame': await MaterialLoader.load("ChessBoardFrame"),
      'Squares': await MaterialLoader.load("ChessBoardSquares"),
    });
  }
}