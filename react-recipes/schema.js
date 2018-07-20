exports.typeDefs = `

type Query {
    getAllRecipes: [Recipe]
}

type Mutation {
    addRecipe(input: AddRecipeInput): Recipe
}

type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favorites: [Recipe]
}


input AddRecipeInput {
    name: String!
    description: String!
    category: String!
    instructions: String!
    username: String   
}

`;