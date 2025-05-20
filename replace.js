const fs = require('fs');
const path = require('path');

// Function to walk through directories
function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      // Only include text files that we can safely modify
      const ext = path.extname(filepath).toLowerCase();
      const validExts = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.md', '.sql', '.json', '.svg'];
      if (validExts.includes(ext)) {
        filelist.push(filepath);
      }
    }
  });
  return filelist;
}

// Main function
function replaceInFiles() {
  const rootDir = __dirname;
  console.log('Starting search for files...');
  
  const files = walkSync(rootDir);
  console.log(`Found ${files.length} files to check`);
  
  let totalReplaced = 0;
  
  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Skip binary files or very large files
      if (content.length > 1000000 || /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(content)) {
        return;
      }
      
      // Check for both old and new format to ensure all references are updated
      if (content.includes('lovable') || content.includes('eyefemm-uploads')) {
        console.log(`Checking file: ${file}`);
        
        // Replace all instances of lovable references with eyefemm-uploads
        const newContent = content.replace(/\/lovable-uploads\//g, '/eyefemm-uploads/')
                               .replace(/lovable-uploads\//g, 'eyefemm-uploads/')
                               .replace(/https:\/\/lovable-uploads\.s3\.amazonaws\.com\//g, 'https://eyefemm-uploads.s3.amazonaws.com/')
                               .replace(/lovable\.dev/g, 'eyefemm.com')
                               .replace(/Lovable AI/gi, 'EyeFemm');
        
        
        // Only write if changes were made
        if (content !== newContent) {
          fs.writeFileSync(file, newContent, 'utf8');
          console.log(`Updated: ${file}`);
          totalReplaced++;
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });
  
  console.log(`Replacement complete. Updated ${totalReplaced} files.`);
}

// Run the replacement
replaceInFiles();
