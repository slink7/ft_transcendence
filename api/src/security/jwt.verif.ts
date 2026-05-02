import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
    id: number;
    username: string;
    id_theme: number;
}

export function jwtAuth(req: Request,res: Response,next: NextFunction ) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({
            error: "Missing authorization header"
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            error: "Missing token"
        });
    }
    console.log("authHeader =", authHeader);
    console.log("token =", token);
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        req.user = decoded as UserPayload;
        next();
    }
    catch (err) {
        return res.status(401).send({
            error: "Invalid or expired token"
        });
    }
}