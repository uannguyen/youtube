
import Joi from 'joi'
import dotenv from 'dotenv'
dotenv.config()
const envSchema = Joi.object({
  REACT_APP_ACCESS_TYPE: Joi.string().required(),
  REACT_APP_RESPONSE_TYPE: Joi.string().required(),
  REACT_APP_REDIRECT_URL: Joi.string().required(),
  REACT_APP_USER_SCOPE: Joi.string().required(),
  REACT_APP_YOUTUBE_SCOPE: Joi.string().required(),
  REACT_APP_STATE: Joi.string().required(),
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
  accessType: envVars.REACT_APP_ACCESS_TYPE,
  responseType: envVars.REACT_APP_RESPONSE_TYPE,
  redirectUrl: envVars.REACT_APP_REDIRECT_URL,
  userScope: envVars.REACT_APP_USER_SCOPE,
  youtubeScope: envVars.REACT_APP_YOUTUBE_SCOPE,
  state: envVars.REACT_APP_STATE,
  apiKey: envVars.REACT_APP_API_KEY,
  clientId: envVars.REACT_APP_CLIENT_ID,
  clientSecset: envVars.REACT_APP_CLIENT_SECRET,
  jwtSecret: envVars.REACT_APP_JWTSECRET
}

export default config