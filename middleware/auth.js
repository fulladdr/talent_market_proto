const { User } = require("../server/models/User");
// Is it working?
let auth = (req, res, next) => {
  //인증 처리를 하는 곳.

  //클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  //토큰을 복호화한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //유저가 있으면
    req.token = token;
    req.user = user; //token과 user를 request에 넣어줌.
    //뒤에 app.get에서 token과 user 사용 가능.
    next(); //미들웨어이기 때문에. 계속 갈 수 있게 해줌.
  });
  //유저가 있으면 인증 Okay.

  //유저가 없으면 인증 X.
};

module.exports = { auth };
