import { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';

const Ribbons = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    gl.canvas.style.position = 'absolute';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines: any[] = [];

    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      
      varying vec2 vUv;
      
      void main() {
          vUv = uv;
          
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= side * uThickness;

          vec4 current = vec4(position, 1);
          current.xy += normal;
          
          gl_Position = current;
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uTime;
      
      varying vec2 vUv;
      
      void main() {
          float alpha = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.0);
          gl_FragColor = vec4(uColor, alpha * 0.5);
      }
    `;

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      lines.forEach(line => line.polyline.resize());
    }

    const colors = ['#1E1E1E', '#2D2D2D', '#3D3D3D'];
    const count = 50;
    const points = Array.from({ length: count }, () => new Vec3());

    colors.forEach((color, i) => {
      const line = {
        spring: 0.03,
        friction: 0.8,
        mouseVelocity: new Vec3(),
        mouseOffset: new Vec3((i - 1) * 0.02, 0, 0),
        points: points.map(p => p.clone()),
      };

      line.polyline = new Polyline(gl, {
        points: line.points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: 15 },
          uTime: { value: 0 },
        },
      });

      line.polyline.mesh.setParent(scene);
      lines.push(line);
    });

    resize();
    window.addEventListener('resize', resize);

    const mouse = new Vec3();
    
    function updateMouse(e: MouseEvent | TouchEvent) {
      const rect = container.getBoundingClientRect();
      const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
      mouse.set(
        (x / rect.width) * 2 - 1,
        (y / rect.height) * -2 + 1,
        0
      );
    }

    container.addEventListener('mousemove', updateMouse);
    container.addEventListener('touchmove', updateMouse);

    const tmp = new Vec3();
    let rafId: number;

    function update() {
      lines.forEach(line => {
        tmp.copy(mouse)
          .add(line.mouseOffset)
          .sub(line.points[0])
          .multiply(line.spring);
        
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);

        for (let i = 1; i < line.points.length; i++) {
          line.points[i].lerp(line.points[i - 1], 0.9);
        }

        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
      rafId = requestAnimationFrame(update);
    }

    update();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', updateMouse);
      container.removeEventListener('touchmove', updateMouse);
      container.removeChild(gl.canvas);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default Ribbons;