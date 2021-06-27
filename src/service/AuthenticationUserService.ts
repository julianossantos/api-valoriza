import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface iAuthenticationRequest {
    email: string;
    password: string;
}

class AuthenticationUserService {

    async execute({email, password}: iAuthenticationRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            //Retorna o email/senha incorreta para nao dar informacoes para pessoas maliciosas se eh o email ou senha que esta incorreto
            throw new Error("Email/Password incorrect")
        }

        const passwordmatch = await compare(password, user.password);

        if(!passwordmatch){
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            email: user.email
        },"a0b812630567ad46bc15b7b2e4961fc9", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token;
    }
}

export { AuthenticationUserService }