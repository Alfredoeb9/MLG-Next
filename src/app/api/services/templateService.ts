const path = require("path");
const handlebars = require('handlebars');
const fs = require('fs')
// import fs from "fs-extra";
// import Handlebars from "handlebars";

export  const createEmailTemplate = async (templateFile: any, payload: any) => {
  // console.log({templateFile, payload, cwd: process.cwd()})
  let source = await fs.readFileSync(path.join(process.cwd(), `src/app/api/templates/${templateFile}`), {encoding: "utf8"} );

  
  let template = await handlebars.compile(source);
  // console.log('template', template)
  return template(payload);
}

// path = path.join(__dirname, "../templates");

// const forgotPasswordTemplateSource = fs.readFileSync(
//   `${path}/forgotPassword.html`,
//   { encoding: "utf8" }
// );

// const verifyEmailTemplateSource = fs.readFileSync(
//   path.join(__dirname, "../templates"), 
//   `${path}/verifyEmail.html`,
//   { encoding: "utf8" }
// );
// export const getForgotTemplate = Handlebars.compile(forgotPasswordTemplateSource);
// export const getVerifyEmailTemplate = Handlebars.compile(verifyEmailTemplateSource)
