import { loadFilesSync, mergeTypeDefs, mergeResolvers, makeExecutableSchema } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

//불러온걸 바탕으로 스키마 만들기 (서버가 아닌 직접)
// const schema = makeExecutableSchema({typeDefs, resolvers});

// export default schema;