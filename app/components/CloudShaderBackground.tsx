'use client';
import React, { useEffect, useRef } from 'react';

const vertexShaderSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Pure mathematical procedural GLSL shader — Zero external texture dependencies
// Fast, robust, vibrant, and runs smoothly on all mobile & desktop GPUs
const fragmentShaderSource = `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;

// Analytical 3D Hash & Noise
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(mix(hash(p + vec3(0,0,0)), hash(p + vec3(1,0,0)), f.x),
        mix(hash(p + vec3(0,1,0)), hash(p + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(p + vec3(0,0,1)), hash(p + vec3(1,0,1)), f.x),
        mix(hash(p + vec3(0,1,1)), hash(p + vec3(1,1,1)), f.x), f.y), f.z
  );
}

// 3-Octave Fractal Brownian Motion for rich cloud volumes
float fbm(vec3 p) {
  float f = 0.500 * noise(p); p *= 2.02;
  f += 0.250 * noise(p); p *= 2.03;
  f += 0.125 * noise(p);
  return f;
}

// Cloud density map with natural wind flow
float map(vec3 p) {
  vec3 q = p - vec3(0.08, 0.02, 0.45) * iTime;
  float d = fbm(q);
  // Shape into horizontal fluffy cloud layer
  float heightFalloff = clamp(1.2 - p.y * 0.6, 0.0, 1.0);
  return clamp((d - 0.35) * 2.2 * heightFalloff, 0.0, 1.0);
}

const vec3 sunDirection = normalize(vec3(-0.7, 0.4, -0.6));

vec4 raymarchClouds(vec3 ro, vec3 rd, vec3 skyCol) {
  vec4 sum = vec4(0.0);
  float t = 0.2;
  
  // Sunlight color highlights
  vec3 sunCol = vec3(1.0, 0.85, 0.55);
  vec3 cloudDark = vec3(0.35, 0.38, 0.44);
  vec3 cloudLight = vec3(1.0, 0.98, 0.94);

  for (int i = 0; i < 28; i++) {
    vec3 pos = ro + t * rd;
    if (pos.y < -3.0 || pos.y > 3.0 || sum.a > 0.95) break;

    float den = map(pos);
    if (den > 0.01) {
      // Direct sun lighting differential
      float dif = clamp((den - map(pos + 0.3 * sunDirection)) / 0.4, 0.0, 1.0);
      vec3 lin = sunCol * dif * 1.5 + vec3(0.65, 0.75, 0.88);
      vec3 col = mix(cloudDark, cloudLight, den) * lin;

      // Atmospheric distance haze
      col = mix(col, skyCol, 1.0 - exp(-0.008 * t * t));
      
      float alpha = den * 0.35;
      sum += vec4(col * alpha, alpha) * (1.0 - sum.a);
    }
    t += max(0.07, 0.05 * t);
  }

  return clamp(sum, 0.0, 1.0);
}

mat3 setCamera(vec3 ro, vec3 ta, float cr) {
  vec3 cw = normalize(ta - ro);
  vec3 cp = vec3(sin(cr), cos(cr), 0.0);
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = normalize(cross(cu, cw));
  return mat3(cu, cv, cw);
}

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;

  // Cinematic golden hour sky backdrop
  float sun = clamp(dot(sunDirection, normalize(vec3(uv, 1.4))), 0.0, 1.0);
  vec3 sky = vec3(0.55, 0.68, 0.78) - uv.y * 0.22 * vec3(0.8, 0.45, 0.7) + 0.15;
  sky += vec3(0.45, 0.28, 0.12) * pow(sun, 4.0);
  sky += vec3(0.8, 0.65, 0.3) * pow(sun, 16.0);

  // Slow, serene automatic camera orbit
  float time = iTime * 0.06;
  float panX = 0.5 + 0.32 * sin(time * 0.5);
  float panY = 0.52 + 0.12 * cos(time * 0.4);

  vec3 ro = 3.6 * normalize(vec3(sin(2.0 * panX + time * 0.25), 0.65 * panY + 0.2, cos(2.0 * panX + time * 0.25))) - vec3(0.0, 0.1, 0.0);
  vec3 ta = vec3(0.0, -0.6, 0.0);
  mat3 ca = setCamera(ro, ta, 0.05 * cos(0.15 * iTime));
  vec3 rd = ca * normalize(vec3(uv, 1.5));

  // Volumetric cloud layer
  vec4 clouds = raymarchClouds(ro, rd, sky);
  vec3 finalColor = sky * (1.0 - clouds.a) + clouds.rgb * 1.15;
  
  // Sunlight lens flare warmth
  finalColor += vec3(0.22, 0.12, 0.04) * pow(sun, 2.2);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function CloudShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    }) || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) return;

    // Compile Shaders
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link failed:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'iResolution');
    const uTime = gl.getUniformLocation(program, 'iTime');

    let animationFrameId: number;
    const startTime = performance.now();

    // Render scale for crisp 60fps execution with native bilinear GPU upsampling
    const renderScale = 0.35;

    const renderLoop = (now: number) => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      const scaledW = Math.max(1, Math.floor(width * renderScale));
      const scaledH = Math.max(1, Math.floor(height * renderScale));

      if (canvas.width !== scaledW || canvas.height !== scaledH) {
        canvas.width = scaledW;
        canvas.height = scaledH;
        gl.viewport(0, 0, scaledW, scaledH);
      }

      const elapsed = (now - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div className="cloud-shader-bg-container" aria-hidden="true">
      <canvas ref={canvasRef} className="cloud-shader-canvas" />
      <div className="cloud-shader-overlay" />
    </div>
  );
}
