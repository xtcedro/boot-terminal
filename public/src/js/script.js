import {
  loadBootScreen
} from './load-components.js';

import { marked } from "https://cdn.jsdelivr.net/npm/marked/+esm";
import { runBootSequence } from './boot-sequence.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 🧠 Run terminal-style boot sequence first
  runBootSequence();
});
