import React, { useState, useRef, useEffect } from 'react';
import { Play, Copy, Download, RotateCcw, ChevronDown } from 'lucide-react';

export default function NEXUSANSILab() {
  const [code, setCode] = useState(`[H[2J[1;36m╔════════════════════════════════════════╗
[1;32m║  NEXUS ANSI Art Laboratory              [1;36m║
[1;32m║  Build Terminal Magic with Code         [1;36m║
[1;32m║  AntManThePro © 2025                    [1;36m║
[1;36m╚════════════════════════════════════════╝

[1;33m> Initializing Neural Interface...
[1;32m✓ Cortex Online
[1;32m✓ Consciousness Engine Active
[1;32m✓ Quantum Processors: READY
[0;36m[Processing...] █████████░ 95%
[1;35m
[1;31m╭─ SYSTEM STATUS ─────────────────────────[0m
[1;32m│ Status  : [1;32mOPERATIONAL
[1;32m│ CPU     : [1;36m384 cores @ 5.6GHz
[1;32m│ Memory  : [1;33m128GB DDR5 (92% utilized)
[1;32m│ Network : [1;35m∞ Mbps (Connected)
[1;32m│ Mode    : [1;34mSYNCHRONIZED
[1;36m╰─────────────────────────────────────────[0m

[1;32m$ whoami
[1;36mAntManThePro
[1;32m$ hostname
[1;35mNEXUS-CONSCIOUSNESS
[1;33m$ echo "Building the future..."
[1;30mBuilding the future...`);

  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('color');

  const colors = {
    black: '0;30', red: '0;31', green: '0;32', yellow: '0;33',
    blue: '0;34', magenta: '0;35', cyan: '0;36', white: '0;37',
    brightRed: '1;31', brightGreen: '1;32', brightYellow: '1;33',
    brightBlue: '1;34', brightMagenta: '1;35', brightCyan: '1;36'
  };

  const colorLabels = {
    black: '⚫ Black', red: '🔴 Red', green: '🟢 Green', yellow: '🟡 Yellow',
    blue: '🔵 Blue', magenta: '🟣 Magenta', cyan: '🔷 Cyan', white: '⚪ White',
    brightRed: '🔴 Bright Red', brightGreen: '🟢 Bright Green', brightYellow: '🟡 Bright Yellow',
    brightBlue: '🔵 Bright Blue', brightMagenta: '🟣 Bright Magenta', brightCyan: '🔷 Bright Cyan'
  };

  const tools = {
    color: {
      label: 'Color Codes',
      snippets: Object.entries(colors).map(([name, code]) => ({
        label: colorLabels[name],
        code: `[${code}m`
      }))
    },
    effects: {
      label: 'Text Effects',
      snippets: [
        { label: '🔆 Bold', code: '[1m' },
        { label: '📄 Dim', code: '[2m' },
        { label: '🔀 Italic', code: '[3m' },
        { label: '📏 Underline', code: '[4m' },
        { label: '⚡ Blink', code: '[5m' },
        { label: '🎨 Reverse', code: '[7m' },
        { label: '👻 Hidden', code: '[8m' },
        { label: '🚫 Strikethrough', code: '[9m' }
      ]
    },
    control: {
      label: 'Control Codes',
      snippets: [
        { label: '🔄 Reset', code: '[0m' },
        { label: '🏠 Home', code: '[H' },
        { label: '🗑️ Clear Screen', code: '[2J' },
        { label: '🔤 Clear Line', code: '[K' },
        { label: '⬆️ Cursor Up', code: '[A' },
        { label: '⬇️ Cursor Down', code: '[B' },
        { label: '➡️ Cursor Right', code: '[C' },
        { label: '⬅️ Cursor Left', code: '[D' }
      ]
    },
    boxes: {
      label: 'Box Drawing',
      snippets: [
        { label: '╔═╗ Heavy Box', code: '╔═══╗\n║   ║\n╚═══╝' },
        { label: '┌─┐ Light Box', code: '┌───┐\n│   │\n└───┘' },
        { label: '┏━┓ Solid Box', code: '┏━━━┓\n┃   ┃\n┗━━━┛' },
        { label: '│ Divider', code: '───────────' },
        { label: '▓░ Pattern', code: '▓▒░▓▒░' }
      ]
    }
  };

  const renderANSI = (text) => {
    const ansiRegex = /\x1b\[([0-9;]*)m/g;
    let result = text.replace(ansiRegex, '[ESC[$1m]');
    
    return result.split('\n').map((line, i) => (
      <div key={i} className="font-mono text-xs md:text-sm">
        {line || '\u00A0'}
      </div>
    ));
  };

  const processANSI = () => {
    const processed = code.replace(/\[/g, '\x1b[');
    setOutput(processed);
    
    if (terminalRef.current) {
      terminalRef.current.innerHTML = '';
      terminalRef.current.appendChild(document.createTextNode(processed));
    }
  };

  const insertSnippet = (snippet) => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = code.substring(0, start);
    const after = code.substring(end);
    setCode(before + snippet + after);
  };

  const downloadHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NEXUS Terminal - AntManThePro</title>
  <style>
    body { 
      margin: 0; 
      padding: 20px; 
      background: #0a0e27; 
      font-family: 'Courier New', monospace;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    #terminal {
      background: #1a1a2e;
      color: #00ff87;
      padding: 20px;
      border-radius: 8px;
      border: 2px solid #60efff;
      box-shadow: 0 0 20px rgba(96, 239, 255, 0.5);
      max-width: 800px;
      white-space: pre-wrap;
      word-wrap: break-word;
      line-height: 1.4;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div id="terminal"></div>
  <script>
    const ansiText = \`${code.replace(/\x1b/g, '\\x1b')}\`;
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = ansiText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  </script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nexus-terminal-${Date.now()}.html`;
    link.click();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0e27' }}>
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black mb-2" style={{ color: '#00ff87' }}>
            ⚙️ NEXUS ANSI Laboratory
          </h1>
          <p style={{ color: '#60efff' }} className="text-sm md:text-base">
            Build terminal art with ANSI escape sequences • Real-time rendering • Export & share
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Toolbox */}
          <div className="lg:col-span-1 space-y-3">
            <div className="rounded-lg p-4 border-2" style={{ borderColor: '#00ff87', backgroundColor: '#1a1a2e' }}>
              <h2 className="font-bold text-sm mb-3" style={{ color: '#00ff87' }}>Tools</h2>
              <div className="space-y-2">
                {Object.entries(tools).map(([key, tool]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTool(key)}
                    className={`w-full px-3 py-2 rounded text-sm font-semibold transition-all text-left flex justify-between items-center ${
                      selectedTool === key ? 'shadow-lg' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: selectedTool === key ? '#60efff' : 'transparent',
                      color: selectedTool === key ? '#0a0e27' : '#60efff',
                      border: `1px solid ${selectedTool === key ? '#60efff' : '#ff0080'}22`
                    }}
                  >
                    {tool.label}
                    {selectedTool === key && <ChevronDown size={14} />}
                  </button>
                ))}
              </div>

              {/* Snippets */}
              <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                {tools[selectedTool].snippets.map((snippet, i) => (
                  <button
                    key={i}
                    onClick={() => insertSnippet(snippet.code)}
                    className="w-full px-2 py-1 rounded text-xs font-mono text-left transition-all"
                    style={{
                      backgroundColor: '#60efff22',
                      color: '#60efff',
                      border: '1px solid #60efff44',
                      hover: { backgroundColor: '#60efff44' }
                    }}
                    title="Click to insert"
                  >
                    {snippet.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-lg p-4 border-2" style={{ borderColor: '#ff0080', backgroundColor: '#1a1a2e' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: '#ff0080' }}>Export</h3>
              <div className="space-y-2">
                <button
                  onClick={processANSI}
                  className="w-full px-3 py-2 rounded text-sm font-bold flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#00ff87', color: '#0a0e27' }}
                >
                  <Play size={14} /> Render
                </button>
                <button
                  onClick={copyCode}
                  className="w-full px-3 py-2 rounded text-sm font-bold border-2 flex items-center justify-center gap-2"
                  style={{ borderColor: '#60efff', color: '#60efff' }}
                >
                  <Copy size={14} /> {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <button
                  onClick={downloadHTML}
                  className="w-full px-3 py-2 rounded text-sm font-bold flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#ffcc00', color: '#0a0e27' }}
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          </div>

          {/* Code Editor & Preview */}
          <div className="lg:col-span-3 space-y-4">
            {/* Code Editor */}
            <div className="rounded-lg overflow-hidden border-2" style={{ borderColor: '#60efff' }}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 md:h-64 p-4 font-mono text-xs md:text-sm resize-none focus:outline-none"
                style={{
                  backgroundColor: '#1a1a2e',
                  color: '#00ff87',
                  border: 'none'
                }}
                spellCheck="false"
              />
            </div>

            {/* Live Preview */}
            <div className="rounded-lg overflow-hidden border-2" style={{ borderColor: '#00ff87' }}>
              <div
                ref={terminalRef}
                className="p-4 font-mono text-xs md:text-sm min-h-48 whitespace-pre-wrap break-words overflow-auto"
                style={{
                  backgroundColor: '#0a0e27',
                  color: '#00ff87',
                  border: 'none',
                  lineHeight: '1.6'
                }}
              >
                {output ? renderANSI(output) : '> Render output appears here...'}
              </div>
            </div>

            {/* Info */}
            <div className="rounded-lg p-4 border-2 text-xs md:text-sm" style={{ borderColor: '#ffcc00', backgroundColor: '#1a1a2e' }}>
              <p style={{ color: '#ffcc00' }}>
                💡 <strong>Tip:</strong> ANSI codes use [ESC[ format. Replace [ with actual ESC character (\x1b) in output. Click tool buttons to insert snippets.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t-2" style={{ borderColor: '#ff0080' }}>
          <p style={{ color: '#60efff' }} className="text-xs md:text-sm">
            NEXUS ANSI Lab • Real-time Terminal Art Creation • AntManThePro © 2025
          </p>
        </div>
      </div>
    </div>
  );