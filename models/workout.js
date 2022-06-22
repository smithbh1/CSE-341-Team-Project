
module.exports = (mongoose) => {
    const Workout = mongoose.model(
      'workouts',
      mongoose.Schema({
        workout: {
            description: {
                type: String
            },
            cardio: {
                name: {
                    type: String
                },
                time: {
                    type: String
                },
                pace: {
                    type: String
                },
                avgHeartRate: {
                    type: String
                }
            },
            lifting: {
                muscleGroup: {
                    type: String
                },
                liftName: {
                    type: String
                },
                sets: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                weight: {
                    type: Number
                }
            }
        } 
        
      })
    );
  
    return Workout;
  };