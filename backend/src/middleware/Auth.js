import jwt from "jsonwebtoken";
async function checkToken(req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ msg: "Acesso negado!" });
    }
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido!" });
  }
}

export { checkToken };