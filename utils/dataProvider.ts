import fs from "fs";
import { parse } from "csv-parse/sync";

export class DataProvider {
  static getDataFromJson(filePath: string) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    return data;
  }

  static getDataFromCSV(filePath: string) {
    const data = parse(fs.readFileSync(filePath, "utf-8"), {
      columns: true,
      skip_empty_lines: true,
    });

    return data;
  }
}
