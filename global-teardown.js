import fs from 'fs';

export default async function globalTeardown() {
const filePath = 'data/storageState.json';

console.log("globalTeardown: clean up storage state file")
if (fs.existsSync(filePath)) {
  fs.unlinkSync(filePath);
  console.log("globalTeardown: storage state file deleted")
}
console.log("globalTeardown: ready")
}