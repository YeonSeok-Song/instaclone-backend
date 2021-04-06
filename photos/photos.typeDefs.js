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
    }
    type Hashtag {
        id : Int!
        createAt : String!
        updateAt : String!
        hashtag : String!
        photos(page:Int!) : [Photo]
        totalPhotos : Int!
    }
`