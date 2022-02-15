
import Joi from 'joi'
import dotenv from 'dotenv'
dotenv.config()
const envSchema = Joi.object({
  REACT_APP_REDIRECT_URL: Joi.string().required(),
  REACT_APP_API_KEY: Joi.string().required(),
  REACT_APP_CLIENT_ID: Joi.string().required(),
  REACT_APP_CLIENT_SECRET: Joi.string().required(),
  REACT_APP_JWTSECRET: Joi.string().required()
}).unknown().required()

const { error, value: envVars } = envSchema.validate(process.env)
if (error) {
  throw new Error(`Config ENV validation error: ${error.message}`)
}

const config = {
  redirectUrl: envVars.REACT_APP_REDIRECT_URL,
  apiKey: envVars.REACT_APP_API_KEY,
  clientId: envVars.REACT_APP_CLIENT_ID,
  clientSecset: envVars.REACT_APP_CLIENT_SECRET,
  jwtSecret: envVars.REACT_APP_JWTSECRET
}

export default config