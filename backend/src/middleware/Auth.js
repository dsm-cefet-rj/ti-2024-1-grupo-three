import jwt from "jsonwebtoken";
async function checkToken(req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      console.error ("Access Token not available");
      return res.status(401).json({ msg: "Acesso negado!" });
    }
    const secret = process.env.SECRET;

    jwt.verify(token, secret);
    console.log ("Token Verified Successfully");
    next();
  } catch (error) {
    console.error ("Token Verify Error" + error);
    res.status(400).json({ msg: "token invalido!" });
  }
}

export { checkToken };