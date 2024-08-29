import { writeFileSync } from "fs";
import * as dotenv from "dotenv";
dotenv.config();
const { BackendServerUrl } = process.env;
export async function writeImageToDisk(image: string, email: string) {
    const base64String = image;
    const buffer = Buffer.from(base64String, "base64");
    const fileNameNoExt = `Images/User/${email}`;
    const fileName = `${fileNameNoExt}.jpg`;
    writeFileSync(fileName, buffer);
    console.log(BackendServerUrl +fileNameNoExt);
    return BackendServerUrl +fileNameNoExt;
}
