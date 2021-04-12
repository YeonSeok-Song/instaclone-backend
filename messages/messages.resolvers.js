import client from "../client";
//message 페이지 알규먼트 적용 가능
export default {
    Room : {
        users : ({id}) => client.room.findUnique({
            where : {
                id
            }
        }).users(),
        messages : ({id}) => client.message.findMany({
            where : {
                roomId : id,
            }
        }),
        unreadTotal : ({id}, _, {loggedInUser}) => {
            if(!loggedInUser) {
                return 0
            }
            //count for Received message not read
            return client.message.count({
                where : {
                    read : false,
                    roomId : id,
                    user : {
                        id : {
                            not : loggedInUser.id
                        }
                    }
                }
            })
        },
    },
    Message : {
        user : ({id}) => client.message.findUnique({where: {id}}).user(),
        //if you want to create delete butten in frontend, typeing isMine
    }
}