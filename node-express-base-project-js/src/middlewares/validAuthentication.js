import { verifyToken } from '../utils/token'
export default () => {
    return (req, res, next) => {
        try {
            const token = req.headers['authorization'].split(" ")[1] || "";
            verifyToken(token);
            next();
        } catch (error) {
            return res
                .status(401)
                .json({
                    message: error.message
                });
        }
    };
}