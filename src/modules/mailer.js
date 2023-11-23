import { fileURLToPath } from 'url'
import nodemailer from 'nodemailer'
import mailerhbs from 'nodemailer-express-handlebars'
import path from 'path'

const transport = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS
  }
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const viewPath = path.resolve(path.join(__dirname, '..', 'resources', 'mail', 'auth'))
const image = path.resolve(path.join(__dirname, '..', 'resources', 'mail', 'auth', 'images', 'image-6.png'))

const options = {
  viewEngine: {
    partialsDir: viewPath,
    defaultLayout: false,
  },
  viewPath,
  extName: '.html',
}

transport.use('compile', mailerhbs(options))

export { transport, image }