import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Zap, Copy, Check } from 'lucide-react';

export default function NEXUSTerminalPoster() {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('system');
  const [text, setText] = useState('AntManThePro');
  const [fontSize, setFontSize] = useState(12);
  const [complexity, setComplexity] = useState(0.7);
  const [colorScheme, setColorScheme] = useState('nexus');
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [canvasImage, setCanvasImage] = useState(null);

  const colorSchemes = {
    nexus: {
      primary: '#00ff87',
      secondary: '#60efff',
      accent: '#ff0080',
      warning: '#ffcc00',
      bg: '#0a0e27',
      text: '#e0e0e0'
    },
    hacker: {
      primary: '#00ff41',
      secondary: '#ff006e',
      accent: '#00d9ff',
      warning: '#ffbe0b',
      bg: '#0d0221',
      text: '#cccccc'
    },
    cyber: {
      primary: '#ff006e',
      secondary: '#00f5ff',
      accent: '#ffbe0b',
      warning: '#8338ec',
      bg: '#1a1a2e',
      text: '#eeeeee'
    }
  };

  const chars = {
    dense: '█▓▒░@%#*+=-:. ',
    medium: '█▓▒░@#*+=:. ',
    sparse: '█▓░@#+:. '
  };

  const systemData = {
    'CPU': 'Intel i9 Turbo',
    'GPU': 'NVIDIA RTX 4090',
    'RAM': '128GB DDR5',
    'SSD': '4TB NVMe',
    'Kernel': 'Linux 6.8.0',
    'Shell': '/bin/bash',
    'Node': 'v20.10.0',
    'React': '18.3.1',
    'WebGL': 'ANGLE',
    'Display': '4K @ 144Hz'
  };

  const generateASCIIArt = (ctx, width, height) => {
    const scheme = colorSchemes[colorScheme];
    const charSet = chars.dense;
    const charWidth = fontSize * 0.6;
    const charHeight = fontSize * 1.2;
    const cols = Math.floor(width / charWidth);
    const rows = Math.floor(height / charHeight);

    // Clear canvas with gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, scheme.bg);
    gradient.addColorStop(0.5, `${scheme.bg}dd`);
    gradient.addColorStop(1, scheme.bg);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add noise texture
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 8;
      data[i + 3] = Math.max(0, data[i + 3] - noise);
    }
    ctx.putImageData(imageData, 0, 0);

    // Draw text-based visualization
    ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
    ctx.textBaseline = 'top';
    ctx.letterSpacing = '-2px';

    let colorIndex = 0;
    const colors = [scheme.primary, scheme.secondary, scheme.accent, scheme.warning];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 1 - complexity) continue;

        const char = charSet[Math.floor(Math.random() * charSet.length)];
        const x = c * charWidth;
        const y = r * charHeight;

        // Glow effect
        ctx.shadowColor = colors[colorIndex % colors.length];
        ctx.shadowBlur = 8;
        ctx.globalAlpha = 0.6;

        ctx.fillStyle = colors[colorIndex % colors.length];
        ctx.fillText(char, x, y);

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        colorIndex++;
      }
    }

    // Draw main text
    ctx.font = `bold ${fontSize * 3}px 'Courier New', monospace`;
    ctx.fillStyle = scheme.primary;
    ctx.shadowColor = scheme.accent;
    ctx.shadowBlur = 20;
    ctx.textAlign = 'center';
    ctx.globalAlpha = 0.95;
    ctx.fillText(text, width / 2, height / 3);

    // Draw system info overlay
    ctx.font = `${fontSize * 0.8}px 'Courier New', monospace`;
    ctx.globalAlpha = 0.7;
    ctx.textAlign = 'left';
    let infoY = height * 0.6;

    Object.entries(systemData).slice(0, 5).forEach(([key, value]) => {
      ctx.fillStyle = scheme.secondary;
      ctx.fillText(`${key}:`, 20, infoY);
      ctx.fillStyle = scheme.primary;
      ctx.fillText(value, 150, infoY);
      infoY += fontSize + 5;
    });

    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 1200 * dpr;
    const height = 800 * dpr;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    generateASCIIArt(ctx, 1200, 800);
    setCanvasImage(canvas.toDataURL('image/png'));
  }, [text, fontSize, complexity, colorScheme]);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = canvasImage;
    link.download = `nexus-terminal-${Date.now()}.png`;
    link.click();
  };

  const copyToClipboard = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colorSchemes[colorScheme].bg }}>
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1
            className="text-4xl md:text-6xl font-black mb-2 tracking-tighter"
            style={{ color: colorSchemes[colorScheme].primary }}
          >
            ⚡ NEXUS Terminal Poster
          </h1>
          <p style={{ color: colorSchemes[colorScheme].secondary }} className="text-lg">
            Generate stunning ANSI-art terminal posters for your portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div
              className="rounded-lg p-6 border-2"
              style={{
                backgroundColor: `${colorSchemes[colorScheme].bg}cc`,
                borderColor: colorSchemes[colorScheme].primary
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: colorSchemes[colorScheme].primary }}>
                Configuration
              </h2>

              {/* Text Input */}
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: colorSchemes[colorScheme].secondary }}
                >
                  Display Text
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value.substring(0, 20))}
                  className="w-full px-3 py-2 rounded border-2"
                  style={{
                    borderColor: colorSchemes[colorScheme].accent,
                    backgroundColor: `${colorSchemes[colorScheme].bg}88`,
                    color: colorSchemes[colorScheme].primary
                  }}
                  maxLength="20"
                />
              </div>

              {/* Font Size */}
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: colorSchemes[colorScheme].secondary }}
                >
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="8"
                  max="18"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Complexity */}
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: colorSchemes[colorScheme].secondary }}
                >
                  Complexity: {Math.round(complexity * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={complexity}
                  onChange={(e) => setComplexity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Color Scheme */}
              <div className="mb-6">
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: colorSchemes[colorScheme].secondary }}
                >
                  Color Scheme
                </label>
                <div className="space-y-2">
                  {Object.keys(colorSchemes).map((scheme) => (
                    <button
                      key={scheme}
                      onClick={() => setColorScheme(scheme)}
                      className={`w-full px-4 py-2 rounded font-semibold capitalize transition-all transform ${
                        colorScheme === scheme ? 'scale-105 shadow-lg' : ''
                      }`}
                      style={{
                        backgroundColor: colorSchemes[scheme].primary,
                        color: colorSchemes[scheme].bg,
                        opacity: colorScheme === scheme ? 1 : 0.6
                      }}
                    >
                      {scheme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={downloadImage}
                  className="w-full px-4 py-3 rounded font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  style={{
                    backgroundColor: colorSchemes[colorScheme].primary,
                    color: colorSchemes[colorScheme].bg
                  }}
                >
                  <Download size={18} /> Download
                </button>
                <button
                  onClick={copyToClipboard}
                  className="w-full px-4 py-3 rounded font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all border-2"
                  style={{
                    borderColor: colorSchemes[colorScheme].secondary,
                    color: colorSchemes[colorScheme].secondary
                  }}
                >
                  {copied ? (
                    <>
                      <Check size={18} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} /> Copy to Clipboard
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Stats Box */}
            <div
              className="rounded-lg p-6 border-2"
              style={{
                backgroundColor: `${colorSchemes[colorScheme].bg}cc`,
                borderColor: colorSchemes[colorScheme].accent
              }}
            >
              <h3 className="text-sm font-bold mb-3" style={{ color: colorSchemes[colorScheme].accent }}>
                Portfolio Stats
              </h3>
              <div className="space-y-2 text-sm">
                <p style={{ color: colorSchemes[colorScheme].secondary }}>
                  <span style={{ color: colorSchemes[colorScheme].primary }}>●</span> Canvas Rendering Engine
                </p>
                <p style={{ color: colorSchemes[colorScheme].secondary }}>
                  <span style={{ color: colorSchemes[colorScheme].accent }}>●</span> Real-time Generation
                </p>
                <p style={{ color: colorSchemes[colorScheme].secondary }}>
                  <span style={{ color: colorSchemes[colorScheme].warning }}>●</span> High-DPI Support
                </p>
                <p style={{ color: colorSchemes[colorScheme].secondary }}>
                  <span style={{ color: colorSchemes[colorScheme].primary }}>●</span> Responsive Design
                </p>
              </div>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="lg:col-span-2">
            <div
              className="rounded-lg overflow-hidden border-3 shadow-2xl"
              style={{
                borderColor: colorSchemes[colorScheme].primary,
                boxShadow: `0 0 40px ${colorSchemes[colorScheme].primary}44`
              }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-auto"
                style={{
                  filter: `drop-shadow(0 0 20px ${colorSchemes[colorScheme].accent}88)`,
                  display: showPreview ? 'block' : 'none'
                }}
              />
              {!showPreview && (
                <div
                  className="w-full h-96 flex items-center justify-center"
                  style={{ backgroundColor: colorSchemes[colorScheme].bg }}
                >
                  <p style={{ color: colorSchemes[colorScheme].secondary }}>Preview loading...</p>
                </div>
              )}
            </div>

            {/* Mobile Info */}
            <div className="mt-4 p-4 rounded lg:hidden border-2" style={{ borderColor: colorSchemes[colorScheme].secondary }}>
              <p className="text-sm" style={{ color: colorSchemes[colorScheme].secondary }}>
                💡 Tap "Download" to save your poster. Works perfectly on mobile!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2" style={{ borderColor: colorSchemes[colorScheme].accent }}>
          <p
            className="text-center text-sm"
            style={{ color: colorSchemes[colorScheme].secondary }}
          >
            Built with React, Canvas API, and algorithmic rendering • AntManThePro © 2025
          </p>
        </div>
      </div>
    </div>
  );
}