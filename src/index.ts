#!/usr/bin/env node
import child_process from 'node:child_process'
import promptSync from 'prompt-sync'

import { type ChatCompletionRequest, getChatResponse } from './modules/ai'
import { promisify } from 'node:util';

(async () => {
  await execCommand('cls')
  console.log('Welcome to PowerAI')
  console.log("Type 'exit' to quit")
  while (true) {
    const userRequest = promptSync()('PowerAI:> ')
    if (userRequest === 'exit') {
      break
    }
    const result = await askGpt(userRequest)
    console.log(result)
    const res = await execCommand(result) // Add 'await' keyword here
    console.log(res)
  }
})().catch((e) => {
  console.error(e)
})

async function askGpt (userRequest: string): Promise<string> {
  const req: ChatCompletionRequest = {
    messages: [
      {
        role: 'system',
        content:
          'You are a powershell command generation assistant. You will be given a description of the commands and a text description on what needs to be done. Respond with only the command without explanation and without ```, you may add arguments and parameters based on the question. if you need a directory path assume the user wants the current directory. Try always to use single quote.'
      },

      {
        role: 'user',
        content: userRequest
      }
    ],
    model: 'gpt-3.5-turbo'
  }

  return await getChatResponse(req) ?? ''
}

async function execCommand (command: string): Promise<string> {
  const exec = promisify(child_process.exec)
  const { stdout, stderr } = await exec(`powershell.exe -Command "${command}"`)
  return stderr === '' ? stdout : stderr
}
