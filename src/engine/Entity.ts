import { Matrix4, Vector3, Quaternion, Euler } from '@math.gl/core';

export class Entity {
  public children: Entity[];
  public parent: Entity | null = null;
  public position: Vector3;
  public rotationQuat: Quaternion;
  public eulerAngles: Euler;
  public scale: Vector3;
  private _identityMatrix: Matrix4 = new Matrix4().identity();
  public modelMatrix: Matrix4 = new Matrix4().identity();

  constructor() {
    this.children = [];
    this.position = new Vector3(0, 0, 0); // TODO
    // this.rotationQuat = new Quaternion().identity(); // TODO
    this.eulerAngles = new Euler();
    this.scale = new Vector3(1, 1, 1); // TODO
  }

  public updateModelMatrix(){
    this.modelMatrix = this._identityMatrix.clone()
    .scale(this.scale)
      .translate(this.position)
      // .multiplyLeft(this._identityMatrix.clone().fromQuaternion(this.rotationQuat))
      .rotateXYZ(this.eulerAngles)
    // console.log(this.modelMatrix);
    for (const child of this.children) {
      child.updateModelMatrix();
    }
  }

  public translate(v: Vector3){
    this.position.add(v);
  }

  public setScale(v: Vector3){
    this.scale = v;
  }

  public setScaleX(factor: number){
    this.scale.x = factor;
  }

  public setScaleY(factor: number){
    this.scale.y = factor;
  }

  public setScaleZ(factor: number){
    this.scale.z = factor;
  }

  public setScaleVector(v: Vector3){
    this.scale = v;
  }

  public rotateX(radians: number){
    this.eulerAngles.x = radians;
  }

  public rotateY(radians: number){
    // this.rotationQuat.rotateY(radians);
    this.eulerAngles.y = radians;
  }

  public rotateZ(radians: number){
    // this.rotationQuat.rotateZ(radians);
    this.eulerAngles.z = radians;
  }

  // public calculateModelMatrix(){
  //   this.modelMatrix = this._identityMatrix.clone();
  //   // apply scale
  //   this.modelMatrix.scale(this.scale);
  //   //apply rotation
  //   this.modelMatrix.multiplyLeft(this._identityMatrix.clone().fromQuaternion(this.rotationQuat));
  //   //apply translation
  //   this.modelMatrix.translate(this.position);
  // }

  addChild(child: Entity) {
    this.children.push(child);
    child.parent = this;
  }

  addChildren(...children: Entity[]) {
    for (const child of children) {
      this.addChild(child);
    }
  }

  getModelMatrix(): Matrix4{
    if(this.parent == null){
      return this.modelMatrix.clone();
    }
    return this.modelMatrix.clone().multiplyLeft(this.parent.getModelMatrix());
  }
}