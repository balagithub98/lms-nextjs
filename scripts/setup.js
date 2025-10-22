const fs = require('fs');
const path = require('path');

// Create necessary directories
const directories = [
  'data',
  'public/uploads',
  'static/admin'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

console.log('Setup complete!');
console.log('Run "npm run dev" to start the development server.');
console.log('Visit http://localhost:3000 to view the application.');
console.log('Visit http://localhost:3000/admin to access the CMS.');
