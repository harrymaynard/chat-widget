import { sign, verify} from 'jsonwebtoken'

export const createAccessToken = (userId: string) => {
  const payload = {
    userId,
  }
  const options = {
    expiresIn: process.env.AUTH_EXPIRATION_DURATION
  }
  return sign(payload, process.env.AUTH_SECRET as string, options)
}

exports.verifyJWT = (token: string) => {
  try {
    return verify(token, process.env.AUTH_SECRET as string)
  } catch (error) {
    throw error
  }
}
