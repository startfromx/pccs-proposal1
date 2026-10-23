#!/bin/bash
set -euo pipefail

ROOT="/Users/a2021/Desktop/x/pccs-proposal/Website"
DEMO="$ROOT/demo-loop"

echo "[1/3] Strategist agent"
claude "Act as the PCCS Strategist. Read AGENTS.md, agents/strategist.md, the final copy PDF at Copysheet/Website Copy PCCS Group.pdf, and planning/sitemap.md. Do not edit the main website. For this small demo, define only two homepage sections: the Engineering Future hero and The Engineering preview. Write a concise handoff to demo-loop/01-strategy.md with section goals, approved copy references, and design requirements." \
  --print --model sonnet --permission-mode acceptEdits --add-dir "$ROOT"

echo "[2/3] Design Director agent"
claude "Act as the PCCS Design Director. Read AGENTS.md, agents/design-director.md, and demo-loop/01-strategy.md. Do not edit the main website. Create demo-loop/02-design.md describing the layout, typography hierarchy, colors, spacing, and one restrained animation idea for the two sections." \
  --print --model sonnet --permission-mode acceptEdits --add-dir "$ROOT"

echo "[3/3] Developer agent"
claude "Act as the PCCS Developer. Read AGENTS.md, agents/developer.md, demo-loop/01-strategy.md, and demo-loop/02-design.md. Build only a standalone two-section prototype at demo-loop/index.html with local CSS and JavaScript if needed. Do not edit the main website, do not install packages, do not push to GitHub, and do not deploy. Finish by reporting the files created and how to preview the prototype." \
  --print --model sonnet --permission-mode acceptEdits --add-dir "$ROOT"

echo ""
echo "Demo complete. Open: $DEMO/index.html"
