import 'dotenv/config'

export const API_URL = process.env.API_URL;
export const ORIGIN = process.env.ORIGIN;

export const env = {
    ORIGIN: process.env.ORIGIN
}

console.log('process.env', process.env.ORIGIN)
console.log('process.env ORIGIN', ORIGIN)