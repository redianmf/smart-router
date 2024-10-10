import { existsSync, mkdirSync, writeFileSync } from "fs";

export async function saveToFile(fileName: string, data: string) {
  try {
    const basePath = "./logz";

    // Create dir if not exist
    if (!existsSync(basePath)) {
      mkdirSync(basePath);
    }

    const path = `${basePath}/${fileName}`;
    writeFileSync(path, data);
    console.log("Saved to file");
  } catch (error) {
    console.log(error);
  }
}
