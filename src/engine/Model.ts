import { Material } from "./Material";
import { Entity } from "./Entity";
import { Mesh } from "./Mesh";
import { Texture } from "./Texture";
import { Vector3 } from "@math.gl/core";

export class Model extends Entity {
  public mesh: Mesh;
  public material: Material;
  public textures: Texture[] = [];
  
  constructor(mesh: Mesh, material: Material) {
    super();
    this.mesh = mesh;
    this.material = material;
  }

  addTexture(texture: Texture): Model{
    this.material.textures.push(texture);
    return this;
  }

  setColor(color: Vector3): Model{
    this.material.color = color;
    return this;
  }
}