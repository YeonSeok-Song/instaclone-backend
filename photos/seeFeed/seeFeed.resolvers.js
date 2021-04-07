import client from "../../client";
import { protectResolver } from "../../users/users.utils";
//pagination 필요
export default {
    Query: {
        seeFeed: protectResolver((_, __, {loggedInUser}) => client.photo.findMany({
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
        }))
    }
}