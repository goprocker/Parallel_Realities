'use client';
import React, { useEffect, useRef } from 'react';

const vertexShaderSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform sampler2D iChannel0;

// High-speed procedural 3D noise using 2D noise texture
float noise( in vec3 x ) {
  vec3 p = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  vec2 uv = (p.xy + vec2(37.0, 239.0) * p.z) + f.xy;
  vec2 rg = texture2D(iChannel0, (uv + 0.5) / 256.0).yx;
  return mix(rg.x, rg.y, f.z) * 2.0 - 1.0;
}

// 2-Octave Fast Fractal Density Map
float map( in vec3 p ) {
  vec3 q = p - vec3(0.0, 0.08, 0.7) * iTime;
  float f = 0.55 * noise(q);
  q = q * 2.02;
  f += 0.28 * noise(q);
  return clamp(1.4 - p.y - 1.8 + 1.8 * f, 0.0, 1.0);
}

const vec3 sundir = normalize(vec3(-0.7, 0.35, -0.65));

vec4 render( in vec3 ro, in vec3 rd ) {
  float sun = clamp(dot(sundir, rd), 0.0, 1.0);
  
  // Sky ambient background gradient
  vec3 col = vec3(0.72, 0.80, 0.85) - rd.y * 0.18 * vec3(0.85, 0.5, 0.85) + 0.12;
  col += 0.32 * vec3(1.0, 0.78, 0.35) * pow(sun, 5.0);
  
  // Ultra-fast 20-step Volumetric Raymarch
  vec4 sum = vec4(0.0);
  float t = 0.1;
  
  for(int i = 0; i < 22; i++) {
    vec3 pos = ro + t * rd;
    if( pos.y < -2.5 || pos.y > 2.2 || sum.a > 0.94 ) break;
    
    float den = map( pos );
    if( den > 0.01 ) {
      float dif = clamp((den - map(pos + 0.35 * sundir)) / 0.5, 0.0, 1.0 );
      vec3 lin = vec3(1.0, 0.65, 0.35) * dif + vec3(0.92, 0.98, 1.04);
      vec4 c = vec4( mix( vec3(1.0, 0.96, 0.85), vec3(0.28, 0.32, 0.38), den ), den );
      c.xyz *= lin;
      c.w *= 0.45;
      c.rgb *= c.a;
      sum += c * (1.0 - sum.a);
    }
    t += max(0.08, 0.065 * t);
  }
  
  col = col * (1.0 - sum.a) + sum.xyz * 1.15;
  col += vec3(0.26, 0.12, 0.05) * pow(sun, 2.5);
  return vec4(col, 1.0);
}

mat3 setCamera( in vec3 ro, in vec3 ta, float cr ) {
  vec3 cw = normalize(ta - ro);
  vec3 cp = vec3(sin(cr), cos(cr), 0.0);
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = normalize(cross(cu, cw));
  return mat3(cu, cv, cw);
}

void main() {
  vec2 p = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
  
  // Continuous smooth auto-camera flow
  float autoTime = iTime * 0.07;
  float autoPanX = 0.5 + 0.35 * sin(autoTime * 0.55);
  float autoPanY = 0.52 + 0.15 * cos(autoTime * 0.4);

  vec3 ro = 3.8 * normalize(vec3(sin(2.2 * autoPanX + autoTime * 0.3), 0.72 * autoPanY + 0.16, cos(2.2 * autoPanX + autoTime * 0.3))) - vec3(0.0, 0.1, 0.0);
  vec3 ta = vec3(0.0, -1.0, 0.0);
  mat3 ca = setCamera(ro, ta, 0.06 * cos(0.18 * iTime));
  vec3 rd = ca * normalize(vec3(p.xy, 1.5));

  gl_FragColor = render(ro, rd);
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

    // Create Shaders
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
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
    const uChannel0 = gl.getUniformLocation(program, 'iChannel0');

    // Create compact 128x128 noise texture (iChannel0)
    const noiseTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, noiseTex);
    const noiseData = new Uint8Array(128 * 128 * 4);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.floor(Math.random() * 256);
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 128, 128, 0, gl.RGBA, gl.UNSIGNED_BYTE, noiseData);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.uniform1i(uChannel0, 0);

    let animationFrameId: number;
    const startTime = performance.now();

    // Render scale for lightweight 60fps execution with GPU bilinear smoothing
    const renderScale = 0.28;

    const renderLoop = (now: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
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
      gl.deleteTexture(noiseTex);
    };
  }, []);

  return (
    <div className="cloud-shader-bg-container" aria-hidden="true">
      <canvas ref={canvasRef} className="cloud-shader-canvas" />
      <div className="cloud-shader-overlay" />
    </div>
  );
}
