import { Material } from '../Material'

export class MaterialLoader {
  static async load(filename: string): Promise<Material> {
    try {
      const response = await fetch(`/models/${filename}.mtl`);
      const data = await response.text();
      return MaterialLoader.parseData(data);
    } catch(e){
      console.error(e);
    }
  }

  static parseData(data: string): Material {
    const material: Material = {
      Ns: 0,
      Ka: [],
      Kd: [],
      Ks: [],
      Ke: [],
      Ni: 0,
      d: 0,
      illum: 0,
      color: [1,1,1],
      textures: []
    }

    const lines: string[] = data.split("\n");
    lines.forEach(line => {
      const lineSegments = line.split(" ");
      if (lineSegments[0] == 'Ns') material.Ns = +lineSegments[1];
      if (lineSegments[0] == 'Ka') material.Ka = [+lineSegments[1], +lineSegments[2], +lineSegments[3]];
      if (lineSegments[0] == 'Kd') material.Kd = [+lineSegments[1], +lineSegments[2], +lineSegments[3]];
      if (lineSegments[0] == 'Ks') material.Ks = [+lineSegments[1], +lineSegments[2], +lineSegments[3]];
      if (lineSegments[0] == 'Ke') material.Ke = [+lineSegments[1], +lineSegments[2], +lineSegments[3]];
      if (lineSegments[0] == 'Ni') material.Ni = +lineSegments[1];
      if (lineSegments[0] == 'd') material.d = +lineSegments[1];
      if (lineSegments[0] == 'illum') material.illum = +lineSegments[1];
    });

    return material;
  }
}
