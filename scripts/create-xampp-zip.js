import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function createXamppZip() {
  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    console.error('dist directory does not exist! Please run build first.');
    process.exit(1);
  }

  const zip = new JSZip();

  function addDirToZip(currentDir, zipFolder) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      if (item.endsWith('.zip')) continue;
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(item);
        addDirToZip(fullPath, subFolder);
      } else {
        const fileData = fs.readFileSync(fullPath);
        zipFolder.file(item, fileData);
      }
    }
  }

  console.log('Packaging dist/ into XAMPP zip...');
  addDirToZip(distDir, zip);

  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const targetPath = path.join(publicDir, 'lab-dlh-bulungan-xampp-siap-pakai.zip');
  fs.writeFileSync(targetPath, content);

  const distTargetPath = path.join(distDir, 'lab-dlh-bulungan-xampp-siap-pakai.zip');
  fs.writeFileSync(distTargetPath, content);
  console.log(`Successfully created ${targetPath} and ${distTargetPath} (${(content.length / 1024).toFixed(1)} KB)`);
}

createXamppZip().catch(console.error);
