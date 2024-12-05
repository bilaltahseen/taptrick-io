import * as handlebars from "handlebars";
import path from "path";
import fs from "fs";

export const compileTemplate = (templateName, data) => {
    const templatePath = path.join(__dirname, `../templates/${templateName}.hbs`);
    const template = fs.readFileSync(templatePath, "utf8");
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(data);
};
