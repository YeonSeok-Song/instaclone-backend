import client from '../../client';
import fs from "fs";
import bcrypt from 'bcrypt';
import {protectResolver} from "../users.utils";
import { uploadToS3 } from '../../shared/shared.utils';
import { GraphQLUpload } from 'graphql-upload';

export default {
    Upload: GraphQLUpload,
    Mutation : {
        editProfile: protectResolver(
            async (_, {
                firstName,
                lastName,
                userName,
                email,
                password:newPassword,
                bio,
                avatar
            },{loggedInUser}) => {
                let avatarUrl = null;
                if(avatar){
                    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatar");
                    // const {filename, createReadStream} = await avatar;
                    // const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`
                    // const readStream = createReadStream();
                    // const writeStream = fs.createWriteStream(process.cwd() + "\\upload\\" + newFileName);
                    // readStream.pipe(writeStream);
                    // avatarUrl = `http://localhost:4000/static/${newFileName}`;
                }
                let uglyPassword = null;
                if(newPassword){
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        bio,
                        ...(uglyPassword && {password:uglyPassword}),
                        ...(avatarUrl && {avatar:avatarUrl}),
                    },
                })
                if(updatedUser.id){
                    return{
                        ok:true,
                    }
                }
                else{
                    return{
                        ok:false,
                        error: "Could not update profile."
                    }
                }
            }
        )
    },
};