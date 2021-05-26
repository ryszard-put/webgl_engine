import { Texture } from "./Texture";

export interface Material {
  Ns: number;
  Ka: number[];
  Kd: number[];
  Ks: number[];
  Ke: number[];
  Ni: number;
  d: number;
  illum: number;
  color: number[];
  textures: Texture[]
}
