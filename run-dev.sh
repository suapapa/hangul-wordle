#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
cd /home/suapapa/ws/hermes_codes/hangul-wordle
exec npx vite --host 0.0.0.0 2>&1