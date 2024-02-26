import fs from 'fs'

const file = 'instrukce.txt'

getInstructions((instructions) => {
    const matches = instructions.match(/[^\s]+\.txt/g);
    if (matches && matches.length >= 2) {
      const [fileName1, fileName2] = matches.slice(0, 2);
      console.log("File Name 1:", fileName1);
      console.log("File Name 2:", fileName2);
      copyFileContents(fileName1, fileName2);
    } else {
      console.error("File names not found or less than two names ending with '.txt'");
    }
})

function getInstructions(callback) {
  fs.readFile(file, (err, data) => {
    if (err) {
        console.error(err.message)
    } else {
      callback(data.toString())
    }
  })
}

function copyFileContents(sourceFile, finishFile){
    fs.readFile(sourceFile, (err, data) => {
        if (err) {
          console.error(`Error reading ${sourceFile}:`, err);
        } else {
          fs.writeFile(finishFile, data,{ flag: 'wx' },(err) => {
            if (err) {
              console.error(`Error writing to ${finishFile}:`, err);
            } else {
              console.log(`Contents of ${sourceFile} copied to ${finishFile}`);
            }
          });
        }
      });
}