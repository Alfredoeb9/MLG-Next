import path from "path"
import Handlebars from "handlebars";
import fs from "fs";

export const createEmailTemplate = async (templateFile: string, payload: any) => {
  let source = fs.readFileSync(path.join(process.cwd(), `src/app/api/templates/${templateFile}`), {encoding: "utf8"} );
  
  let template = Handlebars.compile(source);
  return template(payload);
}
