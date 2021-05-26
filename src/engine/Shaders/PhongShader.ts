import { Shader } from "./Shader";

const glsl = x => x;

export const VertexShader = glsl`#version 300 es
  layout(location = 0) in vec3 a_vertex;
  layout(location = 1) in vec3 a_normal;
  layout(location = 2) in vec2 a_textureCoords;

  struct Material {
    vec3 color;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
    float alpha;
  };

  struct Light {
    vec3 color;
    vec3 position;
  };

  uniform mat4 u_M;
  uniform mat4 u_V;
  uniform mat4 u_P;
  uniform Material u_material;
  uniform Light u_light;

  out vec4 l;
  out vec4 n;
  out vec4 v;
  out vec2 itexCoords;

  void main() {
    vec4 lp = vec4(u_light.position, 1.0); //pozcyja światła, przestrzeń świata
    vec4 m_normal = normalize(vec4(a_normal, 0.0));
    vec4 m_vertex = vec4(a_vertex, 1.0);
    l = normalize(u_V * lp - u_V * u_M * m_vertex); //wektor do światła w przestrzeni oka
    v = normalize(vec4(0.0, 0.0, 0.0, 1.0) - u_V * u_M * m_vertex); //wektor do obserwatora w przestrzeni oka
    n = normalize(u_V * u_M * m_normal); //wektor normalny w przestrzeni oka;
    gl_Position = u_P * u_V * u_M * m_vertex;
    itexCoords = a_textureCoords;
  }
`

export const FragmentShader = glsl`#version 300 es
  precision highp float;

  struct Material {
    vec3 color;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
    float alpha;
  };

  struct Light {
    vec3 color;
    vec3 position;
  };

  uniform sampler2D u_texture0;
  uniform Material u_material;
  uniform Light u_light;

  in vec2 itexCoords;
  in vec4 ic;
  in vec4 l;
  in vec4 n;
  in vec4 v;

  out vec4 pixelColor;

  void main() {
    //Znormalizowane interpolowane wektory
    vec4 ml = normalize(l);
    vec4 mn = normalize(n);
    vec4 mv = normalize(v);
    //Wektor odbity
    vec4 mr = reflect(-ml, mn);

    // vec3 kd = u_Kd * u_color.rgb;
    
    //Obliczenie modelu oświetlenia
    // float nl = clamp(dot(mn, ml), 0.0, 1.0);
    // float rv = pow(clamp(dot(mr, mv), 0.0, 1.0), u_Ns);
    // pixelColor = vec4(u_Ka.rgb, 0) + vec4(kd.rgb * nl, u_d) + vec4(u_Ks.rgb*rv, 0);

    vec4 texColor = texture(u_texture0, itexCoords);
    vec3 lightColor = vec3(1.0,1.0,1.0);
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    
    float nl = clamp(dot(mn, ml), 0.0, 1.0);
    float rv = pow(clamp(dot(mr, mv), 0.0, 1.0), u_material.shininess);

    ambient = u_material.ambient * u_light.color;
    diffuse = nl * u_material.diffuse * u_light.color;
    specular = rv * u_material.specular * u_light.color;
    // vec3 phong = (ambient + diffuse + specular) * u_material.color;
    vec3 phong = (ambient + diffuse + specular) * texColor.rgb;
    pixelColor = vec4(phong, u_material.alpha);
  }
`

// export const VertexShader = glsl`#version 300 es
//   layout (location = 0) in vec3 a_vertex;
//   layout (location = 1) in vec3 a_normal;
//   layout (location = 2) in vec3 a_textureCoords;

//   out vec3 FragPos;
//   out vec3 Normal;
//   out vec3 LightPos;

//   // vec3 lightPos = ; // we now define the uniform in the vertex shader and pass the 'view space' lightpos to the fragment shader. lightPos is currently in world space.

//   uniform mat4 u_M;
//   uniform mat4 u_V;
//   uniform mat4 u_P;

//   void main()
//   {
//     vec4 lightPos = vec4(20.0, 20.0, 0.0, 1.0); 
//     gl_Position = u_P * u_V * u_M * vec4(a_vertex, 1.0);
//     FragPos = vec3(u_V * u_M * lightPos);
//     Normal = mat3(transpose(inverse(u_V * u_M))) * a_normal;
//     LightPos = vec3(u_V * lightPos);
//   }
// `;

// export const FragmentShader = glsl`#version 300 es
//   precision highp float;
//   out vec4 FragColor;

//   in vec3 FragPos;
//   in vec3 Normal;
//   in vec3 LightPos;

//   //uniform vec3 lightColor;
//   uniform vec3 u_color;

//   void main()
//   {
//     vec3 lightColor = vec3(1.0,1.0,1.0);
//     // ambient
//     float ambientStrength = 0.1;
//     vec3 ambient = ambientStrength * lightColor;    
    
//      // diffuse 
//     vec3 norm = normalize(Normal);
//     vec3 lightDir = normalize(LightPos - FragPos);
//     float diff = max(dot(norm, lightDir), 0.0);
//     vec3 diffuse = diff * lightColor;
    
//     // specular
//     float specularStrength = 0.5;
//     vec3 viewDir = normalize(-FragPos);
//     vec3 reflectDir = reflect(-lightDir, norm);  
//     float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
//     vec3 specular = specularStrength * spec * lightColor; 
    
//     vec3 result = (ambient + diffuse + specular) * u_color;
//     FragColor = vec4(result, 1.0);
//   }
// `;

export class PhongShader extends Shader {
  constructor(gl:WebGL2RenderingContext){
    super(gl,VertexShader, FragmentShader);
  }
}