import jwt from "jsonwebtoken";
async function checkToken(req, res, next) {
  console.log ("CheckTokem - Inicio");
  try {
    const tokenAuth = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTczNTZlYTgwNDNhZjg1Y2VkYjM4NyIsImlhdCI6MTcyNjUzMjAzNCwiZXhwIjoxNzI2NTMyOTM0fQ.rsbNhlAXs4I9JuBJBTnxdD8GYIKl5M-jVWXnWKHeAUI`
    const token = req.headers["authorization"];
    if (!token) {
      console.error ("Access Token not available");
      return res.status(401).json({ msg: "Acesso negado!" });
    }
    console.log ("Token Verify: %s", token);
    const secret = process.env.SECRET;
    console.log (secret);
    console.log (token);
    jwt.verify(token, secret);
    console.log ("Token Verified Successfully");
    req.user = token.id;
    next();
  } catch (error) {
    console.error ("Token Verify Error" + error);
    res.status(400).json({ msg: "token invalido!" });
  }
}

export { checkToken };