const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

describe('Behavior of the database to create, find, update, and delete plans', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('plans');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a plan into the database', async () => {
    const plans = db.collection('plans');

    const mockPlan = {
        _id: '17',
        diet:{
            description: "Description for the diet",
            dietName: "Diet's name",
            calories: 1800,
            protein: 200,
            carbs: 900,
            sugar: 0,
            weight: 175
        },
        workout:{
            description: "Workout description",
            cardio:{
                name: "cardio's exercise name",
                numberDays: 25,
                time: "6:00 am"
            },
            lifting:{
                muscleGroup: "Muscle group name",
                numberDays: 25,
                time: "6:00 pm"
            }
        }
    };
    await plans.insertOne(mockPlan);

    const insertedPlan = await plans.findOne({_id: '17'});
    expect(insertedPlan).toEqual(mockPlan);
  });

  it('should bring all plans registered in the database', async () => {
    const plans = db.collection('plans');

    const findPlans = await plans.find({});

    const foundPlans = await plans.find({});
    expect(findPlans).toEqual(foundPlans);
  });

  it('should bring a plan using its id', async () => {
    const plans = db.collection('plans');

    const findPlan = await plans.find({ _id: '11' });

    const foundPlan = await plans.find({ _id: '11' });
    expect(findPlan).toEqual(foundPlan);
  });

  it('should update a plan already registered in the database', async () => {
    const plans = db.collection('plans');
    const updatedMockPlan = {
        "_id": "16",
        "diet":{
            "description": "Description for the diet modified",
            "dietName": "Diet's name",
            "calories": 1800,
            "protein": 200,
            "carbs": 900,
            "sugar": 0,
            "weight": 175
        },
        "workout":{
            "description": "Workout description",
            "cardio":{
                "name": "cardio's exercise name",
                "numberDays": 25,
                "time": "6:00 am"
            },
            "lifting":{
                "muscleGroup": "Muscle group name",
                "numberDays": 25,
                "time": "6:00 pm"
            }
        }
    };
    
    await plans.updateOne({ _id: '16' }, { $set:{"diet":{"description":"Description for the diet modified"}} });

    const updatedPlan = await plans.findOne({ _id: '16' });
    expect(updatedPlan).toEqual(updatedMockPlan);
  });

  it('should delete a plan from the database', async () => {
    const plans = db.collection('plans');

    await plans.deleteOne({ _id: '10' });

    const deletedPlan = await plans.findOne({ _id: '10' });
    expect(deletedPlan).toEqual(null);
  });
});