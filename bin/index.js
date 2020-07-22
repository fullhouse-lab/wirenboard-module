#!/usr/bin/env node

// TODO: Do nothing if it is not wirenboard

const MODULE_NAME = 'wirenboard-module'

const MODULES_DIR  = '/etc/wb-rules-modules'
const RULES_DIR  = '/etc/wb-rules'

const MODULES = [
  'ebus',
  'greenhouse',
  'zigbee',
  'email',
  'sms',
  'ledstrip',
]

let HELP = `
Available commands:`
MODULES.forEach(name => {
  HELP += `${MODULE_NAME} ${name} \n`
})
HELP += '\n'

const path = require('path')
const fs = require('fs')
const { exec } = require('child_process')

//
//  Files  //
//

const copyModule = (module_name, cb_onDone) => {
  if (!fs.existsSync(MODULES_DIR)){
    fs.mkdirSync(MODULES_DIR)
  }

  fs.copyFile(
    path.resolve(__dirname, '../node_modules/wirenboard-module-' + module_name + '/wb-rules-modules/' + module_name + '.js'),
    path.resolve(MODULES_DIR, module_name + '.js'), err => {
    if (err) throw err
    cb_onDone()
  })
}

const copyRule = (module_name, cb_onDone) => {
  if (!fs.existsSync(RULES_DIR)){
    fs.mkdirSync(RULES_DIR)
  }

  fs.copyFile(
    path.resolve(__dirname, '../node_modules/wirenboard-module-' + module_name + '/wb-rules/' + module_name + '.js'),
    path.resolve(RULES_DIR, module_name + '_rule.js'), err => {
    if (err) throw err
    cb_onDone()
  })
}

//
//  CMD  //
//

const execCommand = (cmd, cb_onDone) => {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log('Error: could not execute command: ' + cmd)
      return
    }

    if (stdout) console.log(stdout)
    if (stderr) console.log(stderr)

    cb_onDone()
  })
}

//
//  Main  //
//

//  get arguments after first two elements  //
const arguments = process.argv.splice(2)

if (!arguments.length) {
  console.log(HELP)
  return
}

arguments.forEach(arg => {
  //  validate name  //
  if (!MODULES.includes(arg)) {
    console.log("Bad module name: " + arg)
    console.log(HELP)
    process.exit()
  }
})

//  copy files  //
let completedCount = 0
arguments.forEach(arg => {
  copyModule(arg, () => {
    copyRule(arg, () => {
      console.log('+ Added module: ' + arg)

      completedCount += 1
      if (completedCount === arguments.length) {
        execCommand('service wb-rules restart', () => {
          console.log('+ Wirenboard rules restarted')
        })
      }
    })
  })
})
