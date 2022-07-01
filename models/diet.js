
module.exports = (mongoose) => {
    const Diet = mongoose.model(
      'diets',
      mongoose.Schema({
        diet: {
            description: {
                type: String
            },
            dietName: {
                type: String
            },
            calories: {
                type: Number
            },
            protein: {
                type: Number
            },
            carbs: {
                type: Number
            },
            sugar: {
                type: Number
            },
            weight: {
                type: String
            }           
        }
        
      })
    );
  
    return Diet;
  };