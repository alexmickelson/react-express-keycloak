import express from "express";
import * as dotenv from 'dotenv';
import * as helmet from "helmet"
import { OauthService } from "./services/OauthService";
import { UserInfoController } from "./controller/UserInfoController";


dotenv.config();
const app = express();

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "sso.snow.edu"],
    objectSrc: ["'self'", "data:"],
    scriptSrc: ["'self'"],
    frameSrc: ["'self'", "sso.snow.edu"],
    styleSrc: ["'self'"],
    fontSrc: ["'self'"],
    connectSrc: ["'self'", "sso.snow.edu"],
    imgSrc: ["'self'",]
  }
}));

const userInfoController = new UserInfoController();

app.get('/api/user', userInfoController.getUserInfo)
app.get('*', (req, res) => {
  console.log('wrong path', req.path)
});

app.listen(5000, () =>
  console.log(`Example app listening on port 5000!`),
);