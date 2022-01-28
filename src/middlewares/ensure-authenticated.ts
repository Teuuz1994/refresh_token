import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken'
import { config } from "../config/jsonwebtoken-config"

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({
      status: 401,
      message: 'Unauthorized'
    })
  }

  const { 1: token } = authToken.split(' ')

  try {
    verify(token, config.secret)
    return next()
  } catch {
    return response.status(401).json({
      status: 401,
      message: 'Unauthorized'
    })
  }
}