import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";

const line = "I'm leaving you—you only ever preheat me for frozen pizza at 2 AM, you never clean my racks, and frankly, the air fryer treats you better than I ever could.";
if ([...line].length < 1 || [...line].length > 280 || /[\r\n]/.test(line)) {
  throw new Error("Entry must be a single line of 1 to 280 characters");
}

const expected = `${line}\n`;
const outputDirectory = new URL("/output/", import.meta.url);
const outputFile = new URL("entry.txt", outputDirectory);
const temporaryFile = new URL("entry.txt.tmp", outputDirectory);
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(temporaryFile, expected, "utf8");
renameSync(temporaryFile, outputFile);
if (!readFileSync(outputFile).equals(Buffer.from(expected, "utf8"))) {
  throw new Error("Written entry does not match expected bytes");
}
