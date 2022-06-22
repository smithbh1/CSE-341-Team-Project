
module.exports = (mongoose) => {
    const User = mongoose.model(
      'users',
      mongoose.Schema({
        userName: {
            type: String
        },
        password: {
            type: String
        },
        age: {
            type: Number
        },
        sex: {
            type: String
        },
        height: {
            type: String
        },
        weight: {
            type: Number
        }
        
      })
    );
  
    return User;
  };