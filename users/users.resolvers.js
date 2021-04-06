import client from '../client';

export default {
    User : {
        //{id} => root
        isFollowing : async ({id}, _, {loggedInUser}) => {
            //로그인한 사람(나)이 지금보고있는 특정사람을 팔로우했는지 확인하는 리솔버
            if (!loggedInUser) {
                return false;
            }
            const exists = await client.user.count({
                where: {
                    userName : loggedInUser.userName,
                    following:{
                        some: {
                            id,
                        },
                    },
                },
            });
            return Boolean(exists)
        },
        isMe : ({id}, _, {loggedInUser}) => {
            if (!loggedInUser) {
                return false;
            }
            else { 
                return id === loggedInUser.id;//true or false 같으면 true
            }
        },
        totalFollowing : ({id}) => client.user.count({
            where : {
                followers: {
                    some: {
                        id,
                    },
                },
            },
        }),
        totalFollowers : ({id}) => client.user.count({
            where: {
                following: {
                    some: {
                        id,
                    },
                },
            },
        }),
        photos : ({id}) => client.user.findUnique({
            where : {id}
        }).photos(),
    },
};