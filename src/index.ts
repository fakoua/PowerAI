#!/usr/bin/env node
import child_process from 'node:child_process'
import promptSync from 'prompt-sync'
import { promisify } from 'node:util'

import OpenAIService from './openai-service'

(async () => {
  const openaiService = new OpenAIService()
  await execCommand('cls')
  console.log('Welcome to PowerAI')
  console.log("Type 'exit' to quit")
  while (true) {
    const userRequest = promptSync()('PowerAI:> ')
    if (userRequest === 'exit') {
      break
    }
    const result = await openaiService.askGpt(userRequest)
    console.log(result)
    const res = await execCommand(result) // Add 'await' keyword here
    console.log(res)
  }
})().catch((e) => {
  console.error(e)
})

async function execCommand (command: string): Promise<string> {
  const exec = promisify(child_process.exec)
  const { stdout, stderr } = await exec(`powershell.exe -Command "${command}"`)
  return stderr === '' ? stdout : stderr
}
