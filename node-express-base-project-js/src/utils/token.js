/*
@Author: Daniel Reyes Betancourt
@Description: Security using JWT with HS256 to generate and decrypt token.
@Date: 23/10/2019
@Version: 1.0
*/
import {} from "dotenv/config";
import jwt from "jsonwebtoken";
/**
 * @Description: Verify if the Token is valid
 * @param {String} sbToken
 */
const verifyToken = (sbToken) => {
  try {
    /* ====================   JWT Verify ===================== */
    const sbPublicKey = JSON.parse(`"${process.env.TOKEN_PUBLIC_KEY}"`);
    const obVerifyOptions = {
      algorithm: ["HS256"],
      expiresIn: "24h",
    };
    jwt.verify(sbToken, sbPublicKey, obVerifyOptions);
  } catch (error) {
    throw new Error("Not authorized");
  }
};

/**
 * @Description: generate a Token
 */
const generateToken = () => {
  try {
    /*
			====================   JWT Signing =====================
		*/
    const sbPrivateKey = JSON.parse(`"${process.env.TOKEN_PRIVATE_KEY}"`);
    /* Payload */
    const obPayload = {
      application: "skm",
    };
    const obSignOptions = {
      algorithm: "HS256",
      expiresIn: "24h",
    };
    const sbToken = jwt.sign(obPayload, sbPrivateKey, obSignOptions);
    return sbToken;
  } catch (error) {
    throw new Error("Error: The token could not be generated.");
  }
};

export { verifyToken, generateToken };
