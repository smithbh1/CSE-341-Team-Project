
module.exports = (mongoose) => {
    const Plan = mongoose.model(
      'plans',
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
            }           
        },
        workout: {
            description: {
                type: String
            },
            cardio: {
                name: {
                    type: String
                },
                numberDays: {
                    type: Number
                },
                time: {
                    type: Number
                }
            },
            lifting: {
                muscleGroup: {
                    type: String
                },
                numberDays: {
                    type: Number
                },
                time: {
                    type: Number
                }
            }
        }     
      })
    );
  
    return Plan;
  };