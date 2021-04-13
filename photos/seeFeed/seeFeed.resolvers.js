import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Query: {
        seeFeed: protectResolver((_, {lastFd}, {loggedInUser}) => 
            //cursor pagination
            client.photo.findMany({
                take : 3,
                skip : lastFd ? 1 : 0,
                ...(lastFd && {cursor : {id : lastFd}}),
                where: {
                    OR: [
                        {
                            user: {
                                followers: {
                                        some: {
                                            id : loggedInUser.id,
                                    },
                                },
                            },
                        },
                        {
                            userId: loggedInUser.id,
                        }
                    ]
                },
                orderBy: {
                    createAt:"desc"
                }
            }
        ))
    }
}