import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import fs from 'fs/promises'
import path from 'path'

const transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  }
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, '../resources/mail/auth/');
console.log(templatePath)

transport.use('compile', hbs({
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html'
}))

async function readHtmlTemplate () {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.join(__dirname, '../resources/mail/auth/forgot_password.html');
    console.log(templatePath)
    const htmlContent = await fs.readFile(templatePath, 'utf-8');
    return htmlContent;
  } catch (error) {
    console.error('Erro ao ler o arquivo de template HTML:', error);
    throw error;
  }
}

export { transport, readHtmlTemplate }