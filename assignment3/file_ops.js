const fs = require('fs').promises;

async function writeThenRead() {
  try {
    console.log("Writing to file...");
    await fs.writeFile('example.txt', 'Updated text by Richa using async/await!');
    console.log("File written successfully!");

    console.log("Reading from file...");
    const data = await fs.readFile('example.txt', 'utf8');
    console.log("File contents:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

writeThenRead();
