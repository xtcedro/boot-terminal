// boot-sequence.js → v1.5.3 | Polished Boot with Consistent Styling + Progress Bar

import { asciiLogo } from './asciiLogo.js';
import { typeLineByLine, clearTerminal } from './typingengine.js';
import { startMatrixRain } from './matrixRain.js';

const CLIENT_NAME = window.CLIENT_NAME ?? "Dominguez Tech Solutions";
const DTS_VERSION = "v1.5.2";

// 🖥️ Frame 1: System Diagnostics
const systemInfo = [
  '[ <span class="ok">OK</span> ] <span class="module">Bootloader</span>: <span class="flicker">Initializing...</span>',
  '[ <span class="ok">OK</span> ] Runtime: <span class="module">Deno + TypeScript</span>',
  '[ <span class="ok">OK</span> ] CPU Architecture: <span class="module">Vision-Driven Execution Layer</span>',
  `[ <span class="ok">OK</span> ] Frontend Service: <span class="module">dominguez-tech-frontend</span>`,
  `[ <span class="ok">OK</span> ] Client: <span class="module">${CLIENT_NAME}</span>`,
  `[ <span class="ok">OK</span> ] Version: <span class="module">${DTS_VERSION}</span>`,
];

// 🧭 Frame 2: Founder Identity & Mission
const missionInfo = [
  '[ <span class="ok">OK</span> ] Founder: <span class="module">Pedro M. Dominguez</span> (Self-taught Systems Architect)',
  '[ <span class="ok">OK</span> ] City of Birth: <span class="module">Ciudad Juárez, México 🇲🇽</span>',
  '[ <span class="ok">OK</span> ] Hometown: <span class="module">Praxedis G. Guerrero → Oklahoma City</span>',
  '[ <span class="ok">OK</span> ] Mission: <span class="module">Empowering small businesses with structured automation</span>',
  '[ <span class="ok">OK</span> ] Launching client interface...',
  '<span class="success">✅ All systems nominal — interface is live.</span>',
];

// ✅ Final Motto with OK class
const finalLine = '<span class="ok">Puro Pa’ Delante 💪 — Todo sea por la familia 🙏</span>';

// 📊 Progress Bar Helper
function updateProgressBar(percent) {
  const bar = document.getElementById('boot-progress-fill');
  if (bar) {
    bar.style.width = `${percent}%`;
  }
}

export async function runBootSequence() {
  if (sessionStorage.getItem('bootShown') === 'true') {
    document.getElementById('main-app')?.style.setProperty('display', 'block');
    return;
  }

  document.body.classList.add('boot-active');
  await loadBootScreen();
  await new Promise(requestAnimationFrame);

  startMatrixRain('matrix-rain', {
    fontSize: 26,
    speed: 32,
    tailGlow: 0.08,
  });

  const output = document.getElementById('boot-output');
  if (!output) return console.error("❌ #boot-output not found.");

  // 🧬 ASCII Logo
  let step = 0;
  const totalSteps = asciiLogo.length + systemInfo.length + missionInfo.length + 3;

  for (const line of asciiLogo) {
    await typeLineByLine(line, output, 5);
    updateProgressBar(++step / totalSteps * 100);
  }

  await new Promise(r => setTimeout(r, 500));

  await typeLineByLine(`<span class="section-title">🖥️ SYSTEM CHECKS:</span>`, output, 30);
  updateProgressBar(++step / totalSteps * 100);

  for (const log of systemInfo) {
    await typeLineByLine(log, output, 30);
    updateProgressBar(++step / totalSteps * 100);
  }

  await new Promise(r => setTimeout(r, 400));

  await typeLineByLine(`<span class="section-title">📡 IDENTITY & MISSION:</span>`, output, 30);
  updateProgressBar(++step / totalSteps * 100);

  for (const log of missionInfo) {
    await typeLineByLine(log, output, 30);
    updateProgressBar(++step / totalSteps * 100);
  }

  await new Promise(r => setTimeout(r, 800));
  clearTerminal(output);
  await typeLineByLine(finalLine, output, 50);
  updateProgressBar(100);

  await new Promise(r => setTimeout(r, 1500));
  sessionStorage.setItem('bootShown', 'true');

  const bootScreen = document.getElementById('boot-screen');
  bootScreen?.classList.add('hide');

  setTimeout(() => {
    bootScreen?.remove();
    document.body.classList.remove('boot-active');
    document.getElementById('main-app')?.style.setProperty('display', 'block');
  }, 600);
}
