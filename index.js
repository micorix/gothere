#! /usr/bin/env node

const program = require('commander')
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
program
    .version('0.1.0')
    .option('-c, --config <path>', 'Path to config')
    .parse(process.argv)
  

if(!program.config)
    process.exit()

const configPath = path.join(__dirname, program.config)

const config = require(configPath)
const contents = fs.readFileSync(path.join('./templates/index.ejs'), 'utf8')

const { name, redirects, fallbackUrl, outFilePath } = config
const outFile = ejs.render(contents, {
    name,
    redirects: JSON.stringify(redirects),
    fallbackUrl
})
fse.emptyDir('./tmp').then(() => {
    fs.writeFileSync(path.join(__dirname, outFilePath), outFile, 'utf8')
})