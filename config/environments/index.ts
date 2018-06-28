import development from './development'
import production from './production'
import test from './test'

const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'
  
const env = isTest ? test : (isProd ? production : development)
  
export const Environment = env