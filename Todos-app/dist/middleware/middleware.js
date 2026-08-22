import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
export function middleware(req, res, next) {
    try {
        const headers = req.headers["authorization"];
        if (!headers) {
            res.json({
                message: "Token not found!"
            });
            return;
        }
        const decoded = jwt.verify(headers, process.env.JWT_SECRET_KEY);
        if (decoded) {
            req.userId = decoded.userId;
            next();
        }
    }
    catch (err) {
        res.json({
            message: "Token Invalid or Expire"
        });
    }
}
//# sourceMappingURL=middleware.js.map