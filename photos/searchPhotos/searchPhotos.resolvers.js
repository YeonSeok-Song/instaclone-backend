import client from "../../client";

export default {
    Query: {
        searchPhotos: (_, {keyword, page}) => {
            //offset pagination
            if(page === 0) {
                return []
            }
            else {
                return client.photo.findMany({
                    where : {
                        caption: {
                            startsWith : keyword,
                        },
                    },
                    take : 10,
                    skip : (page - 1) * 10,
                });
            }
            
        },
    },
};