import client from "../../client";
import {protectResolver} from "../../users/users.utils";

export default {
    Mutation : {
        uploadPhoto: protectResolver(async(_, {file, caption}, {loggedInUser}) => {
            if(caption) {
                //parse caption
                let hashtagObjs = [];
                const hashtags = caption.match(/#[\w\-\+\*\%\@\$\!\~\`\^\&\(\)\<\>\/\?\:\"\{\}\[\]]+/g);
                if(hashtags) {
                    hashtagObjs = hashtags.map(hashtag => ({
                        where : {hashtag},
                        create: {hashtag},
                    }));
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