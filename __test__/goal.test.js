const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

describe('Behavior of the database to create, find, update, and delete goals', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('goals');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a Goal into the database', async () => {
    const goals = db.collection('goals');

    const mockGoal = {
        _id: '17',
        health:{
            description: "Description for the Goal",
            weight: 150,
            calories: 1800,
            heartRate: 200
        },
        physical: {
            description: "Description for the Goal",
            liftName: "Workout Name",
            weightTime: "time"
        }
    };
    await goals.insertOne(mockGoal);

    const insertedGoal = await goals.findOne({_id: '17'});
    expect(insertedGoal).toEqual(mockGoal);
  });

  it('should bring all goals registered in the database', async () => {
    const goals = db.collection('goals');

    const findGoals = await goals.find({});

    const foundGoals = await goals.find({});
    expect(findGoals).toEqual(foundGoals);
  });

  it('should bring a Goal using its id', async () => {
    const goals = db.collection('goals');

    const findGoal = await goals.find({ _id: '11' });

    const foundGoal = await goals.find({ _id: '11' });
    expect(findGoal).toEqual(foundGoal);
  });

  it('should update a Goal already registered in the database', async () => {
    const goals = db.collection('goals');
    const updatedMockGoal = {
        "_id": "16",
        "health":{
            "description": "Description for the Goal",
            "weight": 150,
            "calories": 1800,
            "heartRate": 200
        },
        "physical": {
            "description": "Description for the Goal",
            "liftName": "Workout Name",
            "weightTime": "time"
        }
    };
    
    await goals.updateOne({ _id: '16' }, { $set:{"goal":{"description":"Description for the Goal modified"}} });

    const updatedGoal = await goals.findOne({ _id: '16' });
    expect(updatedGoal).toEqual(updatedMockGoal);
  });

  it('should delete a Goal from the database', async () => {
    const goals = db.collection('goals');

    await goals.deleteOne({ _id: '10' });

    const deletedGoal = await goals.findOne({ _id: '10' });
    expect(deletedGoal).toEqual(null);
  });
});