import autoBind from "auto-bind";
import jwt, { TokenExpiredError, VerifyCallback } from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import express from 'express';
import axios from 'axios';
import { NextFunction } from 'express';

class OauthService {
  pem: null | string = null;
  jwk: null | jwkToPem.JWK = null;

  constructor() {
    autoBind(this)
  }

  async authenticateJWT(token: string) {
    if (!this.pem) {
      await this.initializePem();
      console.log(this.pem)
    }
    return jwt.verify(token, this.pem!);
  };
  
  async initializePem() {
    console.log("initializing jwks");
    const response = await axios.get(`http://auth_web:8080/auth/realms/master/protocol/openid-connect/certs`)
    // console.log(response.data)
    this.jwk = response.data.keys[1];
    this.pem = jwkToPem(this.jwk!);
  }

}

export { OauthService }