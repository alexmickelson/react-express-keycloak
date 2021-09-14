import autoBind from "auto-bind";
import { Request, Response } from "express";
import { OauthService } from "../services/OauthService";

const oauthService = new OauthService();

// const parseCookeis = (req: Request) => {
//   const rawCookies = req.headers.cookie!.split('; ');
//   // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']
 
//   const parsedCookies: {[key: string]: any} = {};
//   rawCookies.forEach(rawCookie=>{
//   const parsedCookie = rawCookie.split('=');
//   // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
//    parsedCookies[parsedCookie[0]] = parsedCookie[1];
//   });
//   return parsedCookies;
//  };


class UserInfoController {
  constructor() {
    autoBind(this) 
  }

  async getUserInfo(req: Request, res: Response) {
    const token = req.headers.authorization!.split(' ')[1]
    const user = await oauthService.authenticateJWT(token)
    res.json({user})
  }
}

export {UserInfoController}