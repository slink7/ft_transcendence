import { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
    id: number;
    username: string;
    id_theme: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export {};