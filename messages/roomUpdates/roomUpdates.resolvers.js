import pubsub from "../../pubsub";
import {NEW_MESSAGE} from "../../constants";
import { withFilter } from "graphql-subscriptions";
import client from "../../client";

export default {
    Subscription : {
        roomUpdates : {
            subscribe : async(root, args, context, info) => {
                const room = await client.room.findFirst({
                    where : {
                        id : args.id,
                        users : {
                            some : {
                                id : context.loggedInUser.id
                            }
                        }
                    },
                    select : {
                        id : true
                    }
                })
                if(!room) {
                    //Don't return null just because doesnt exist room.
                    throw new Error("room is not exist.");
                }
                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async ({roomUpdates}, {id}, {loggedInUser}) => {
                        if(roomUpdates.roomId === id) {
                            const room = await client.room.findFirst({
                                where : {
                                    id : args.id,
                                    users : {
                                        some : {
                                            id : context.loggedInUser.id
                                        }
                                    }
                                },
                                select : {
                                    id : true
                                }
                            })
                            if(!room) {
                                return false;
                            }
                            return true;
                        }
                    }
                )(root, args, context, info);
            }
        }
    }
}