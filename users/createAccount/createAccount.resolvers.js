import client from '../../client';
import bcrypt from 'bcrypt';

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            userName,
            email,
            password
        }) => {
            //check if email or username are already on DB.
            try{
                const existingUser = await client.user.findFirst({
                    where: {
                        OR : [
                            {
                                userName,
                            },
                            {
                                email,
                            },
                        ],
                    },
                });
                if(existingUser) {
                    return {
                        ok : false,
                        error : "This username/password is already taken",
                    };
                }
                console.log(existingUser);
                //hash password
                const uglyPassword = await bcrypt.hash(password, 10);
                //create를 리턴해서 데이터베이스에 저장
                //브라우저가 똑똑해서 프리즈마가 끝날때까지 기다림.
                //브라우저의 waiting property 사용
                 //save and return the user
                return client.user.create({data: {
                        userName, email, firstName, lastName, password: uglyPassword,
                    },
                });

            }catch(e) {
                return {
                    ok : false,
                    error : "cant create account",
                };
            }
           
        },
    },
};