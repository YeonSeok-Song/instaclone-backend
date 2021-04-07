import client from "../../client";
//pagination
export default {
    Query : {
        seePhotoComments: (_, {id, page}) => client.comment.findMany({
            where : {
                photoId : id
            },
            orderBy : {
                createAt : "asc"
            }
        })
    }
}