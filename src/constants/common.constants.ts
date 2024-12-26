import dotenv from 'dotenv'
dotenv.config() //for calling process.env.VAR_NAME globally

// Define constant types
export interface CommonConstants {
    APP_NAME: string,
    SERVER_PORT: any,
    QUEUE_BUFFER_NAME: string
}

console.log('111',process.env.APP_NAME)

// Define constants
export const CONSTANTS: CommonConstants = {
    APP_NAME: process.env.APP_NAME || 'N/A',
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    QUEUE_BUFFER_NAME: process.env.QUEUE_BUFFER_NAME || 'N/A'
}

