import {gql} from "apollo-server";

export default gql`
    type Comment{
        id : Int!
        createAt : String!
        updateAt : String!
        user : User!
        photo : Photo!
        payload : String!
        isMine : Boolean!

    }
`