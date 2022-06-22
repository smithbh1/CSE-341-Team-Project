
module.exports = (mongoose) => {
    const Goal = mongoose.model(
      'goals',
      mongoose.Schema({
        health: {
            description: {
                type: String
            },
            weight: {
                type: Number
            },
            calories: {
                type: Number
            },
            heartRate: {
                type: Number
            }
        },
        physical: {
            description: {
                type: String
            },
            liftName: {
                type: String
            },
            weightTime: {
                type: String
            }
        }        
      })
    );
  
    return Goal;
  };