import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export default {
    Mutation : {
        login: async(_, {userName, password}) => {
            //find user with args.username
            const user = await client.user.findFirst({where : {userName}});
            if(!user) {
                return {
                    ok: false,
                    error: "User not found.",
                };
            }
            //check password with args.password
            const passwordOk = await bcrypt.compare(password, user.password);
            if(!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password",
                };
            }
            //issue a token and sned it to the user
            const token = await jwt.sign({id : user.id}, process.env.SECRET_KEY, { expiresIn: "7d" });
            return {
                ok:true,
                token
            }
        },
    }
    
}