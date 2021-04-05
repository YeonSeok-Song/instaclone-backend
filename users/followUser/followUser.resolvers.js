import {protectResolver} from "../users.utils";
import client from '../../client';

export default {
    Mutation : {
        followUser: protectResolver(async (_, {userName}, {loggedInUser}) => {
            const checkUser = await client.user.findUnique({where: {userName}});
            if(!checkUser){
                return {
                    ok: false,
                    error : "that user does not exist.",
                };rdgf
            }
            await client.user.update({
                where: {
                    id:loggedInUser.id,
                },
                data : {
                    following: {
                        connect: {
                            userName,
                        }
                    }
                }
            })
            return {
                ok : true,
                error : null
            }
        })
    }
}