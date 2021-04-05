import {gql} from "apollo-server";

export default gql`
    type Photo {
        id : String!
        createAt : String!
        updateAt : String!
        user : User
        hashtag : [Hashtag]
        file : String!
        caption : String
    }
    type Hashtag {
        id : String!
        createAt : String!
        updateAt : String!
        hashtag : String!
        photos : [Photo]
    }
`