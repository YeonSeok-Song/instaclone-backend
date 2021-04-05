import {protectResolver} from "../users.utils";
import client from '../../client';

export default {
    Mutation: {
        unfollowUser: protectResolver(async(_, {userName}, {loggedInUser}) => {
            const checkUser = await client.user.findUnique({
                where: {userName},
            });
            if(!checkUser) {
                return {
                    ok : false,
                    error : "Cant unfollow user.",
                };
            }
            await client.user.update({
                where: {
                    id:loggedInUser.id
                },
                data: {
                    following: {
                        disconnect: {
                            userName,
                        },
                    },
                },
            });
            return {
                ok : true
            }
        })
    }
}