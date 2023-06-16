#!/usr/bin/env node
const {sendMessage, sendPhoto} = require('./telegram-bot')
const {program} = require('commander');
process.env.NTBA_FIX_350 = "true"

program
    .name('npm run app')
    .description('CLI to send telegram messages throw API')
    .opts()


program.command('send-message')
    .description("Sends text message to telegram chat.")
    .arguments('<text>', 'Text of message to be send.')
    .action(text => sendMessage(text))

program.command('send-photo')
    .description("Sends image to telegram chat.")
    .arguments('<path>', 'Path to image')
    .action(pathToImage => sendPhoto(pathToImage))

program.parse();



