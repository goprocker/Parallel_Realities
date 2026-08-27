'use client';
import React, { useEffect, useRef } from 'react';

const vertexShaderSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

#define LOOK 1
#define NOISE_METHOD 1
#define TURBULENCE 0

mat3 setCamera( in vec3 ro, in vec3 ta, float cr ) {
  vec3 cw = normalize(ta - ro);
  vec3 cp = vec3(sin(cr), cos(cr), 0.0);
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = normalize(cross(cu, cw));
  return mat3(cu, cv, cw);
}

float noise( in vec3 x ) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);

  vec2 uv = (p.xy + vec2(37.0, 239.0) * p.z) + f.xy;
  vec2 rg = texture2D(iChannel0, (uv + 0.5) / 256.0).yx;
  float n = mix(rg.x, rg.y, f.z) * 2.0 - 1.0;
  return n;
}

float map5( in vec3 p ) {
  vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
  float f;
  float a = 0.5;
  f  = a * noise(q); q = q * 2.02; a = a * 0.5;
  f += a * noise(q); q = q * 2.03; a = a * 0.5;
  f += a * noise(q); q = q * 2.01; a = a * 0.5;
  f += a * noise(q); q = q * 2.02; a = a * 0.5;
  f += a * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map4( in vec3 p ) {
  vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
  float f;
  float a = 0.5;
  f  = a * noise(q); q = q * 2.02; a = a * 0.5;
  f += a * noise(q); q = q * 2.03; a = a * 0.5;
  f += a * noise(q); q = q * 2.01; a = a * 0.5;
  f += a * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map3( in vec3 p ) {
  vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
  float f;
  float a = 0.5;
  f  = a * noise(q); q = q * 2.02; a = a * 0.5;
  f += a * noise(q); q = q * 2.03; a = a * 0.5;
  f += a * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

float map2( in vec3 p ) {
  vec3 q = p - vec3(0.0, 0.1, 1.0) * iTime;
  float f;
  float a = 0.5;
  f  = a * noise(q); q = q * 2.02; a = a * 0.5;
  f += a * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

const vec3 sundir = vec3(-0.7071, 0.0, -0.7071);

#define MARCH(STEPS,MAPLOD) for(int i=0; i<STEPS; i++) { vec3 pos = ro + t*rd; if( pos.y<-3.0 || pos.y>2.0 || sum.a>0.99 ) break; float den = MAPLOD( pos ); if( den>0.01 ) { float dif = clamp((den - MAPLOD(pos+0.3*sundir))/0.6, 0.0, 1.0 ); vec3 lin = vec3(1.0,0.6,0.3)*dif+vec3(0.91,0.98,1.05); vec4 col = vec4( mix( vec3(1.0,0.95,0.8), vec3(0.25,0.3,0.35), den ), den ); col.xyz *= lin; col.xyz = mix( col.xyz, bgcol, 1.0-exp(-0.003*t*t) ); col.w *= 0.4; col.rgb *= col.a; sum += col*(1.0-sum.a); } t += max(0.06,0.05*t); }

vec4 raymarch( in vec3 ro, in vec3 rd, in vec3 bgcol, in vec2 px ) {
  vec4 sum = vec4(0.0);
  float t = 0.05 * texture2D(iChannel1, px / 256.0).x;
  MARCH(40, map5);
  MARCH(40, map4);
  MARCH(30, map3);
  MARCH(30, map2);
  return clamp(sum, 0.0, 1.0);
}

vec4 render( in vec3 ro, in vec3 rd, in vec2 px ) {
  float sun = clamp(dot(sundir, rd), 0.0, 1.0);
  vec3 col = vec3(0.6, 0.71, 0.75) - rd.y * 0.2 * vec3(1.0, 0.5, 1.0) + 0.075;
  col += 0.2 * vec3(1.0, 0.6, 0.1) * pow(sun, 8.0);
  
  vec4 res = raymarch(ro, rd, col, px);
  col = col * (1.0 - res.w) + res.xyz;
  col += vec3(0.2, 0.08, 0.04) * pow(sun, 3.0);
  return vec4(col, 1.0);
}

void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
  
  // Continuous automatic gentle atmospheric drift & camera orbit
  float autoTime = iTime * 0.09;
  float autoPanX = 0.5 + 0.38 * sin(autoTime * 0.6);
  float autoPanY = 0.52 + 0.18 * cos(autoTime * 0.45);
  
  vec2 m = iMouse.xy / iResolution.xy;
  // If mouse is near center / default, auto flow dominates
  vec2 targetM = mix(vec2(autoPanX, autoPanY), m, 0.22);

  vec3 ro = 4.0 * normalize(vec3(sin(2.2 * targetM.x + autoTime * 0.35), 0.75 * targetM.y + 0.15, cos(2.2 * targetM.x + autoTime * 0.35))) - vec3(0.0, 0.1, 0.0);
  vec3 ta = vec3(0.0, -1.0, 0.0);
  mat3 ca = setCamera(ro, ta, 0.08 * cos(0.2 * iTime));
  vec3 rd = ca * normalize(vec3(p.xy, 1.5));

  gl_FragColor = render(ro, rd, gl_FragCoord.xy);
}
`;

export default function CloudShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) return;

    // Create Shaders
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
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
      console.error(gl.getProgramInfoLog(program));
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
    const uMouse = gl.getUniformLocation(program, 'iMouse');
    const uChannel0 = gl.getUniformLocation(program, 'iChannel0');
    const uChannel1 = gl.getUniformLocation(program, 'iChannel1');

    // Create 256x256 random noise texture (iChannel0)
    const noiseTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, noiseTex);
    const noiseData = new Uint8Array(256 * 256 * 4);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.floor(Math.random() * 256);
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, noiseData);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Create 256x256 dither texture (iChannel1)
    const ditherTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, ditherTex);
    const ditherData = new Uint8Array(256 * 256 * 4);
    for (let i = 0; i < ditherData.length; i++) {
      ditherData[i] = Math.floor(Math.random() * 256);
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, ditherData);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(uChannel0, 0);
    gl.uniform1i(uChannel1, 1);

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = window.innerHeight - e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;
    const startTime = performance.now();

    const renderLoop = (now: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const renderScale = 0.5; // Balanced 0.5x scaling for 60fps volumetric raymarching
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
      gl.uniform2f(uMouse, mouseX * renderScale, mouseY * renderScale);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteTexture(noiseTex);
      gl.deleteTexture(ditherTex);
    };
  }, []);

  return (
    <div className="cloud-shader-bg-container" aria-hidden="true">
      <canvas ref={canvasRef} className="cloud-shader-canvas" />
      <div className="cloud-shader-overlay" />
    </div>
  );
}
