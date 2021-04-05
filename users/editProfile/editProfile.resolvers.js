import client from '../../client';
import fs from "fs";
import bcrypt from 'bcrypt';
import {protectResolver} from "../users.utils";

export default {
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
                    const {filename, createReadStream} = await avatar;
                    const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`
                    const readStream = createReadStream();
                    const writeStream = fs.createWriteStream(process.cwd() + "\\upload\\" + newFileName);
                    readStream.pipe(writeStream);
                    avatarUrl = `http://localhost:4000/static/${newFileName}`;
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