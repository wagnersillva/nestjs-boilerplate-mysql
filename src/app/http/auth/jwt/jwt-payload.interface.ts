import {IResponseGetRequestInfo} from "../auth-utils";

export interface JwtPayload {
  email: string,
  sub: string,
  hash?: string,
  sessionId?: string,
  expireIn?: Date
}