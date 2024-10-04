#!/bin/bash

# Add environment variables to .env
echo "VITE_TITLE=\"Mangachows\"" >> .env
echo "VITE_API_URL=https://api.mangachows.com/manga/mangadex/" >> .env
echo "VITE_META_URL=https://api.mangachows.com/meta/" >> .env
pm2 restart 1
# Install project dependencies
npm install && npm update && npm cache clean --force

#Build the application
npm build

# Check if NVM is installed
if [ ! -d "$HOME/.nvm" ]; then
  echo "NVM is not installed. Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
else
  echo "NVM is already installed."
fi

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use Node version from .nvmrc
nvm install
nvm use

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
  echo "Installing PM2..."
  npm install -g pm2
fi

# Start the application with PM2
pm2 start npm --name "reader-ui" -- start

# Optional: Set PM2 to auto-start on system reboot
pm2 startup
pm2 save

echo "Installation and setup completed successfully."


