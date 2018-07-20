exports.resolvers = {


    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            return await Recipe.find()
        }
    },


    Mutation: {

        addRecipe: async (
            root, // 1st argument ==> parente element (in this case root)
            { input: { name, description, category, instructions, username } }, // 2nd argument ==> args destructuring 
            { Recipe }) => { // 3rd argument ==> context destructuring
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();

            return newRecipe;
        }

    }


};
