import {gql} from "apollo-server";

export default gql`
    type Message {
        id : Int!
        payload : String!
        user : User!
        room : Room!
        reed : Boolean!
        createAt : String!
        updateAt : String!
    }
    type Room {
        id : Int!
        unreadTotal : Int!
        users : [User]
        messages : [Message]
        createAt : String!
        updateAt : String!
    }
`