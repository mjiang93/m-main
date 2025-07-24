const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting M-Client React Application...');
console.log('📦 Installing basic dependencies first...');

// Install basic React dependencies
const installBasic = spawn('npm', ['install', 'react', 'react-dom', 'react-scripts', 'typescript', '@types/react', '@types/react-dom'], {
  cwd: path.join(__dirname),
  stdio: 'inherit',
  shell: true
});

installBasic.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Basic dependencies installed successfully!');
    console.log('🎯 Starting development server...');
    
    // Start the React development server
    const startServer = spawn('npm', ['start'], {
      cwd: path.join(__dirname),
      stdio: 'inherit',
      shell: true
    });
    
    startServer.on('close', (serverCode) => {
      console.log(`Development server exited with code ${serverCode}`);
    });
    
  } else {
    console.error('❌ Failed to install basic dependencies');
    console.log('💡 You can try running: npm install react react-dom react-scripts typescript');
  }
});