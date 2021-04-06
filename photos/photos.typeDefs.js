import {gql} from "apollo-server";

export default gql`
    type Photo {
        id : Int!
        createAt : String!
        updateAt : String!
        user : User!
        hashtags : [Hashtag]
        file : String!
        caption : String
        likes : Int!
    }
    type Hashtag {
        id : Int!
        createAt : String!
        updateAt : String!
        hashtag : String!
        photos(page:Int!) : [Photo]
        totalPhotos : Int!
    }
    type Like {
        id : Int!
        photo : Photo!
        createAt : String!
        updateAt : String!
    }
`