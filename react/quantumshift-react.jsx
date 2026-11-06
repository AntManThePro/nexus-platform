import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Download, Volume2, VolumeX } from 'lucide-react';

export default function QuantumShift() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isRunning, setIsRunning] = useState(true);
  const [mode, setMode] = useState('wave');
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(0.7);
  const [sound, setSound] = useState(false);
  const [particleCount, setParticleCount] = useState(200);

  const modes = {
    wave: {
      name: 'Wave Propagation',
      description: 'Fourier-based harmonic oscillation'
    },
    particle: {
      name: 'Particle Swarm',
      description: 'Emergent flocking behavior'
    },
    neural: {
      name: 'Neural Activation',
      description: 'Graph-based neuron firing'
    },
    fractal: {
      name: 'Fractal Emergence',
      description: 'Recursive geometric pattern'
    }
  };

  const nexusColors = {
    primary: '#00ff87',
    secondary: '#60efff',
    accent: '#ff0080',
    warning: '#ffcc00',
    bg: '#0a0e27'
  };

  const audioContext = useRef(null);
  const oscillators = useRef([]);

  const initAudio = () => {
    if (audioContext.current) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.current = ctx;
  };

  const playTone = (frequency, duration = 0.1) => {
    if (!sound || !audioContext.current) return;

    try {
      const osc = audioContext.current.createOscillator();
      const gain = audioContext.current.createGain();

      osc.connect(gain);
      gain.connect(audioContext.current.destination);

      osc.frequency.value = frequency;
      osc.type = 'sine';

      gain.gain.setValueAtTime(0.1, audioContext.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);

      osc.start(audioContext.current.currentTime);
      osc.stop(audioContext.current.currentTime + duration);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const renderWave = (ctx, width, height, time) => {
    ctx.fillStyle = nexusColors.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = nexusColors.primary;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;

    const waves = 5;
    for (let w = 0; w < waves; w++) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        const y =
          height / 2 +
          Math.sin((x * 0.01 + time * 0.05 * speed + w * 0.5) * Math.PI) * 100 * intensity;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsla(${120 + w * 30}, 100%, 50%, ${0.6 - w * 0.1})`;
      ctx.stroke();
    }

    // Fourier circles
    ctx.fillStyle = nexusColors.secondary;
    ctx.globalAlpha = 0.4;
    const circles = 8;
    for (let i = 0; i < circles; i++) {
      const angle = (time * 0.02 * speed + (i / circles) * Math.PI * 2) % (Math.PI * 2);
      const radius = 50 + i * 15;
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.arc(x, y, 8 + i * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    playTone(220 + Math.sin(time * 0.01) * 100, 0.05);
  };

  const renderParticles = (ctx, width, height, time) => {
    ctx.fillStyle = nexusColors.bg;
    ctx.fillRect(0, 0, width, height);

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + time * 0.01 * speed;
      const distance = 100 + Math.sin(time * 0.005 + i * 0.1) * 50 * intensity;
      const x = width / 2 + Math.cos(angle) * distance;
      const y = height / 2 + Math.sin(angle) * distance;

      particles.push({ x, y, i });
    }

    // Draw connections
    ctx.strokeStyle = nexusColors.secondary;
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
        const dx = particles[j].x - particles[i].x;
        const dy = particles[j].y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    ctx.globalAlpha = 1;
    particles.forEach((p) => {
      const hue = (p.i / particleCount * 360 + time * 0.1) % 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3 + Math.sin(time * 0.02 + p.i) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = nexusColors.primary;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    playTone(440 + Math.random() * 100, 0.05);
  };

  const renderNeural = (ctx, width, height, time) => {
    ctx.fillStyle = nexusColors.bg;
    ctx.fillRect(0, 0, width, height);

    const neurons = 12;
    const layers = 4;
    const positions = [];

    // Create neural network layout
    for (let layer = 0; layer < layers; layer++) {
      for (let neuron = 0; neuron < neurons; neuron++) {
        const x = (layer + 1) * (width / (layers + 1));
        const y = (neuron + 1) * (height / (neurons + 1));
        positions.push({
          x,
          y,
          layer,
          neuron,
          activity: Math.sin(time * 0.01 + layer + neuron) * 0.5 + 0.5
        });
      }
    }

    // Draw synapses
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = nexusColors.secondary;
    ctx.lineWidth = 1;
    for (let i = 0; i < positions.length - neurons; i++) {
      const p1 = positions[i];
      const p2 = positions[i + neurons];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Draw neurons
    ctx.globalAlpha = 1;
    positions.forEach((p) => {
      const size = 4 + p.activity * 6 * intensity;
      const hue = (p.layer * 90 + p.neuron * 30 + time * 0.1) % 360;

      ctx.fillStyle = `hsl(${hue}, 100%, ${40 + p.activity * 40}%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();

      if (p.activity > 0.7) {
        ctx.strokeStyle = nexusColors.accent;
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size + 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    playTone(200 + positions.filter(p => p.activity > 0.7).length * 40, 0.05);
  };

  const renderFractal = (ctx, width, height, time) => {
    ctx.fillStyle = nexusColors.bg;
    ctx.fillRect(0, 0, width, height);

    const drawBranch = (x, y, angle, depth, scale) => {
      if (depth === 0) return;

      const length = 100 * scale * intensity;
      const nextX = x + Math.cos(angle) * length;
      const nextY = y + Math.sin(angle) * length;

      const hue = (angle * 100 + time * 0.05 + depth * 30) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = depth * 1.5;
      ctx.globalAlpha = 0.8;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nextX, nextY);
      ctx.stroke();

      const angleOffset = 0.5 + Math.sin(time * 0.01) * 0.2;
      drawBranch(nextX, nextY, angle - angleOffset, depth - 1, scale * 0.7);
      drawBranch(nextX, nextY, angle + angleOffset, depth - 1, scale * 0.7);
    };

    ctx.globalAlpha = 1;
    const startAngle = Math.PI / 2 + Math.sin(time * 0.005) * 0.3;
    drawBranch(width / 2, height * 0.9, startAngle, 10, 1);

    playTone(330 + Math.sin(time * 0.01) * 100, 0.05);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const time = Date.now() / 1000;

    if (mode === 'wave') renderWave(ctx, canvas.width, canvas.height, time);
    else if (mode === 'particle') renderParticles(ctx, canvas.width, canvas.height, time);
    else if (mode === 'neural') renderNeural(ctx, canvas.width, canvas.height, time);
    else if (mode === 'fractal') renderFractal(ctx, canvas.width, canvas.height, time);

    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    if (sound) initAudio();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mode, speed, intensity, isRunning, particleCount, sound]);

  const downloadFrame = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `quantumshift-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: nexusColors.bg }}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black mb-2" style={{ color: nexusColors.primary }}>
            ⚡ QuantumShift
          </h1>
          <p style={{ color: nexusColors.secondary }} className="text-base md:text-lg">
            Real-time algorithmic art engine • Particle physics • Neural networks • Fractals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Mode Selection */}
            <div className="rounded-lg p-4 border-2" style={{ borderColor: nexusColors.primary, backgroundColor: `${nexusColors.bg}cc` }}>
              <h3 className="font-bold mb-3" style={{ color: nexusColors.primary }}>Render Mode</h3>
              <div className="space-y-2">
                {Object.entries(modes).map(([key, { name }]) => (
                  <button
                    key={key}
                    onClick={() => setMode(key)}
                    className={`w-full px-3 py-2 rounded font-semibold text-sm transition-all ${
                      mode === key ? 'shadow-lg' : 'opacity-60'
                    }`}
                    style={{
                      backgroundColor: mode === key ? nexusColors.primary : 'transparent',
                      color: mode === key ? nexusColors.bg : nexusColors.secondary,
                      border: `1px solid ${mode === key ? nexusColors.primary : nexusColors.accent}44`
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: nexusColors.secondary }}>
                {modes[mode].description}
              </p>
            </div>

            {/* Parameters */}
            <div className="rounded-lg p-4 border-2" style={{ borderColor: nexusColors.secondary, backgroundColor: `${nexusColors.bg}cc` }}>
              <h3 className="font-bold mb-3" style={{ color: nexusColors.secondary }}>Parameters</h3>

              <div className="mb-3">
                <label className="text-xs font-semibold" style={{ color: nexusColors.warning }}>
                  Speed: {speed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="mb-3">
                <label className="text-xs font-semibold" style={{ color: nexusColors.warning }}>
                  Intensity: {Math.round(intensity * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={intensity}
                  onChange={(e) => setIntensity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {mode === 'particle' && (
                <div className="mb-3">
                  <label className="text-xs font-semibold" style={{ color: nexusColors.warning }}>
                    Particles: {particleCount}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="50"
                    value={particleCount}
                    onChange={(e) => setParticleCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="rounded-lg p-4 border-2" style={{ borderColor: nexusColors.accent, backgroundColor: `${nexusColors.bg}cc` }}>
              <h3 className="font-bold mb-3" style={{ color: nexusColors.accent }}>Control</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="w-full px-3 py-2 rounded font-bold flex items-center justify-center gap-2"
                  style={{ backgroundColor: nexusColors.primary, color: nexusColors.bg }}
                >
                  {isRunning ? <Pause size={16} /> : <Play size={16} />}
                  {isRunning ? 'Pause' : 'Play'}
                </button>

                <button
                  onClick={() => setIsRunning(true)}
                  className="w-full px-3 py-2 rounded font-bold flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: nexusColors.secondary, color: nexusColors.secondary }}
                >
                  <RotateCcw size={16} /> Reset
                </button>

                <button
                  onClick={downloadFrame}
                  className="w-full px-3 py-2 rounded font-bold flex items-center justify-center gap-2"
                  style={{ backgroundColor: nexusColors.warning, color: nexusColors.bg }}
                >
                  <Download size={16} /> Frame
                </button>

                <button
                  onClick={() => setSound(!sound)}
                  className={`w-full px-3 py-2 rounded font-bold flex items-center justify-center gap-2 ${
                    sound ? 'opacity-100' : 'opacity-50'
                  }`}
                  style={{ backgroundColor: nexusColors.accent, color: '#fff' }}
                >
                  {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  Audio {sound ? 'On' : 'Off'}
                </button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <div className="rounded-lg overflow-hidden border-3" style={{ borderColor: nexusColors.accent }}>
              <canvas
                ref={canvasRef}
                className="w-full h-auto"
                style={{
                  display: 'block',
                  aspectRatio: '16 / 9',
                  backgroundColor: nexusColors.bg,
                  boxShadow: `0 0 40px ${nexusColors.primary}44`
                }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: nexusColors.secondary }}>
              🎨 Computational art powered by Canvas API • Real-time algorithmic rendering • 60 FPS optimization
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2" style={{ borderColor: nexusColors.secondary }}>
          <p className="text-center text-xs md:text-sm" style={{ color: nexusColors.secondary }}>
            QuantumShift v3.2 • AntManThePro Portfolio • Next-gen algorithmic visualization engine
          </p>
        </div>
      </div>
    </div>
  );
}