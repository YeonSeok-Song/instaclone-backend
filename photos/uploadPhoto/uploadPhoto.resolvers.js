import client from "../../client";
import {protectResolver} from "../../users/users.utils";
import {processHashtags} from "../photos.utils";

export default {
    Mutation : {
        uploadPhoto: protectResolver(async(_, {file, caption}, {loggedInUser}) => {
            if(caption) {
                //parse caption
                let hashtagObjs = [];
                
                if(caption) {
                    hashtagObj = processHashtags(caption);
                }
                
                //get or create Hashtags
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id : loggedInUser.id,
                            },
                        },
                        ...(hashtagObjs.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObjs,
                            },
                        }),
                    }
                })
            }
            //save the photo with the parsed hashtags
            //add the photo to the hashtags
        })
    }
}