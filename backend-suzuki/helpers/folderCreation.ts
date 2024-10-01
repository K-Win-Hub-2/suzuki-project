import fs from "fs";
import path from "path";

const createFolder = (folderName: string) => {
  const upperPathes: any = path.join(__dirname, "..");
  const destinationFolder = path.join(upperPathes, folderName);
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  } else {
    console.log(`Folder already exists.`);
  }
};

export { createFolder };
