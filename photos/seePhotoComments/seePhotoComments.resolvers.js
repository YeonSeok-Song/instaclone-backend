import client from "../../client";

export default {
    Query : {
        seePhotoComments: (_, {id, lastCm}) => client.comment.findMany({
            //cursor pagination
            take : 5,
            skip : lastCm ? 1 : 0,
            ...(lastCm && {cursor : {id : lastCm}}),
            where : {
                photoId : id
            },
            orderBy : {
                createAt : "asc"
            }
        })
    }
}