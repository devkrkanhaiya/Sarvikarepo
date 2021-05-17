const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },


    email: {
        type: String,
        required: true
    },

    profile_picture: {
        type: String,
    }

})


// userSchema.plugin(mongoosePaginate);
// userSchema.plugin(random);
// userSchema.plugin(textSearch);
// userSchema.index({ name: 'text', email: 'text', username: 'text', tagline: 'text' });
// module.exports = mongoose.model('User', userSchema);

// const User = mongoose.model('User', userSchema);
// module.exports.AddUser = User;

module.exports = mongoose.model('User', userSchema);