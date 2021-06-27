import { Request, Response } from "express";
import { AuthenticationUserService } from "../service/AuthenticationUserService";

class AuthenticationUserController {

    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const authenticateUserService = new AuthenticationUserService();

        const token = await authenticateUserService.execute({
            email,
            password
        });

        return response.json(token);
    }
}

export { AuthenticationUserController }