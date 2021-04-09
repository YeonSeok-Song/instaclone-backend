import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import {protectResolver} from "../../users/users.utils";
import {processHashtags} from "../photos.utils";

export default {
    Mutation : {
        uploadPhoto: protectResolver(async(_, {file, caption}, {loggedInUser}) => {
            if(caption) {
                //parse caption
                let hashtagObjs = [];
                
                if(caption) {
                    hashtagObjs = processHashtags(caption);
                }
                const fileUrl = await uploadToS3(file, loggedInUser, "uploads");

                //get or create Hashtags
                return client.photo.create({
                    data: {
                        file : fileUrl,
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