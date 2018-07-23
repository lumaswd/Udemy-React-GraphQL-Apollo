const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = ({ username, email }, secret, expiresIn) => { // user ==> destructuring ==> username, email
    return jwt.sign({ username, email }, secret, { expiresIn });
}

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
        },

        signupUser: async (root, { signupUserInput: { username, email, password } }, { User }) => {
            const user = await User.findOne({ username });
            if (user) {
                throw new Error('User already exists!');
            }

            const newUser = await new User({
                username,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET, "1hr") };
        },

        signinUser: async (root, { signinUserInput: { username, password } }, { User }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found!');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid Password!');
            }

            return { token: createToken(user, process.env.SECRET, "1hr") };
        }

    }


};
