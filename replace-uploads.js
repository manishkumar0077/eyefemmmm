const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Extensions to check
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.md', '.sql', '.json'];

// Get all files from a directory recursively
async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.flat().filter(file => {
    const ext = path.extname(file).toLowerCase();
    return extensions.includes(ext);
  });
}

// Replace all occurrences in a file
async function replaceInFile(file) {
  try {
    const content = await readFile(file, 'utf8');
    
    // Check for both old and new format to ensure all references are updated
    if (content.includes('lovable') || content.includes('eyefemm-uploads')) {
      console.log(`Processing ${file}`);
      
      // Replace all instances of lovable references with eyefemm-uploads
      const newContent = content.replace(/\/lovable-uploads\//g, '/eyefemm-uploads/')
                               .replace(/lovable-uploads\//g, 'eyefemm-uploads/')
                               .replace(/https:\/\/lovable-uploads\.s3\.amazonaws\.com\//g, 'https://eyefemm-uploads.s3.amazonaws.com/')
                               .replace(/lovable\.dev/g, 'eyefemm.com')
                               .replace(/Lovable AI/gi, 'EyeFemm');
      
      if (content !== newContent) {
        await writeFile(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
        return true; // File was changed
      }
    }
    return false; // File wasn't changed
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
    return false;
  }
}

// Main function
async function main() {
  const rootDir = path.resolve(__dirname);
  console.log(`Starting replacement in ${rootDir}`);
  
  // Get all files
  const files = await getFiles(rootDir);
  console.log(`Found ${files.length} files to check`);
  
  // Process all files
  let changedCount = 0;
  for (const file of files) {
    const changed = await replaceInFile(file);
    if (changed) changedCount++;
  }
  
  console.log(`Completed! Changed ${changedCount} files.`);
}

main().catch(console.error);
