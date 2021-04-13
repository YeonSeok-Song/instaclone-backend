import client from "../../client";

export default {
    Query: {
        seePhotoLikes: async(_, {id, lastLk}) => {
            const likes = await client.like.findMany({
                //cursor pagination
                take : 10,
                skip : lastLk ? 1 : 0,
                ...(lastLk && {cursor : {
                    id : lastLk
                }}),
                where: {
                    photoId: id,
                },
                select: {
                    user: true,
                },
            });
            return likes.map((like) => like.user);
        }
    }
}