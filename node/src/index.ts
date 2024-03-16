#!/usr/bin/env node
import child_process from 'node:child_process'
import promptSync from 'prompt-sync'
import { promisify } from 'node:util'

import OpenAIService from './openai-service'

(async () => {
  const openaiService = new OpenAIService()
  if (!openaiService.isIntialized) {
    console.error('OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.')
    console.info('You must set the OPENAI_API_KEY environment variable in your system, using a key obtained from https://platform.openai.com/account/api-keys')
    return
  }
  await execCommand('cls')
  console.log('Welcome to PowerAI')
  console.log("Type 'exit' to quit")
  while (true) {
    try {
      const userRequest = promptSync()('PowerAI:> ')
      if (userRequest === 'exit') {
        break
      }
      const result = await openaiService.askGpt(userRequest)
      console.log(result)
      const res = await execCommand(result) // Add 'await' keyword here
      console.log(res)
    } catch (apiError) {
      console.error(apiError)
    }
  }
})().catch((e) => {
  console.error(e)
})

async function execCommand (command: string): Promise<string> {
  const exec = promisify(child_process.exec)
  const { stdout, stderr } = await exec(`powershell.exe -Command "${command}"`)
  return stderr === '' ? stdout : stderr
}
