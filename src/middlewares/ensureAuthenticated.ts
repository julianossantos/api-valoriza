import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    //enviado via Bearer
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).end();
    }

    //ignora a 1 posição (Bearer ...) e pega somente a 2 posicao que é o token
    const [, token] = authToken.split(" ");

    try{

        const { sub } = verify(token, "a0b812630567ad46bc15b7b2e4961fc9") as IPayload;

        request.user_id = sub;

        return next();

    }catch(err){
        return response.status(401).end();
    }

    
    
}
