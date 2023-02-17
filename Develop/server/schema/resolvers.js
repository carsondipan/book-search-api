const {User} = require('../models/User');

const resolvers = {
    Query: {
        async getSingleUser(_parent, args, context) {
            const { user } = context;
            const foundUser = await User.findOne({
                $or: [{ _id: user ? user._id : args.id }, { username: args.username }
                ],
            });
            return foundUser;
        },
        book: async () => {
            return Book.find({});
        },
        
        async createUser({ body }, res) {
            const user = await User.create(body);
            if (!user) {
                return res.status(400).json({ message: 'Incorrect path'})
            }
        }
    },
    Mutation: {
        
    },
};


module.exports = resolvers;