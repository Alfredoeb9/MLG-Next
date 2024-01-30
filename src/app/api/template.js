const handlebars = require('handlebars');
const fs = require('fs');
const util = require('util');
const { resolve, join } = require('path');
const readFile = util.promisify(fs.readFile);

/**
 * @param {{ query: { heading?: "heading"; name?: "luffy"; }; }} req
 * @param {{ setHeader: (arg0: string, arg1: string) => void; write: (arg0: any) => void; end: () => void; status: (arg0: number) => { (): any; new (): any; end: { (): any; new (): any; }; }; }} res
 */
async function templateAPI(req, res) {
  const { heading = 'heading', name = 'luffy' } = req.query;
  try {
    // template is placed in the `templates` dir
    const templateDir = resolve(process.cwd(), 'templates');
    const templateFile = join(templateDir, 'template.hbs');
    let source = await readFile(templateFile, 'utf8');
    // @ts-ignore
    source = handlebars.compile(source);
    // params are being passed here
    // @ts-ignore
    const finalHTML = source({
      heading,
      name,
    });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write(finalHTML);
    res.end();
  } catch (error) {
    return res.status(500).end();
  }
}

export default templateAPI;