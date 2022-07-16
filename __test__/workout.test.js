const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

describe('Behavior of the database to create, find, update, and delete workouts', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('workouts');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a Workout into the database', async () => {
    const workouts = db.collection('workouts');

    const mockWorkout = {
        _id: '20',
        workout:{
            description: "Description for the diet",
            cardio:{
                name: "cardio name",
                time: "how long",
                pace: "how fast",
                avgHeartRate: "heart Rate"
            },
            lifting:{
                muscleGroup: "Muscle Group Worked",
                liftName: "lift name",
                sets: 5,
                reps: 10,
                weight: 200,
            }
        }
    };
    await workouts.insertOne(mockWorkout);

    const insertedWorkout = await workouts.findOne({_id: '20'});
    expect(insertedWorkout).toEqual(mockWorkout);
  });

  it('should bring all workouts registered in the database', async () => {
    const workouts = db.collection('workouts');

    const findWorkouts = await workouts.find({});

    const foundWorkouts = await workouts.find({});
    expect(findWorkouts).toEqual(foundWorkouts);
  });

  it('should bring a Workout using its id', async () => {
    const workouts = db.collection('workouts');

    const findWorkout = await workouts.find({ _id: '20' });

    const foundWorkout = await workouts.find({ _id: '20' });
    expect(findWorkout).toEqual(foundWorkout);
  });

  it('should update a Workout already registered in the database', async () => {
    const workouts = db.collection('workouts');
    const updatedMockWorkout = {
      _id: '19',
      workout:{
          description: "Description for the diet modified",
          cardio:{
              name: "cardio name",
              time: "how long",
              pace: "how fast",
              avgHeartRate: "heart Rate"
          },
          lifting:{
              muscleGroup: "Muscle Group Worked",
              liftName: "lift name",
              sets: 5,
              reps: 10,
              weight: 200,
          }
      }
    };
    
    await workouts.updateOne({ _id: '19' }, { $set:{
      "workout":{
        "description":"Description for the diet modified",
        "cardio":{
          "name": "cardio name",
          "time": "how long",
          "pace": "how fast",
          "avgHeartRate": "heart Rate"
          },
        "lifting":{
          "muscleGroup": "Muscle Group Worked",
          "liftName": "lift name",
          "sets": 5,
          "reps": 10,
          "weight": 200
        }}} });

    const updatedWorkout = await workouts.findOne({ _id: '19' });
    expect(updatedWorkout).toEqual(updatedMockWorkout);
  });

  it('should delete a Workout from the database', async () => {
    const workouts = db.collection('workouts');

    await workouts.deleteOne({ _id: '18' });

    const deletedWorkout = await workouts.findOne({ _id: '18' });
    expect(deletedWorkout).toEqual(null);
  });
});