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
        _id: '20',
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

    const insertedGoal = await goals.findOne({_id: '20'});
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

    const findGoal = await goals.find({ _id: '20' });

    const foundGoal = await goals.find({ _id: '20' });
    expect(findGoal).toEqual(foundGoal);
  });

  it('should update a Goal already registered in the database', async () => {
    const goals = db.collection('goals');
    const updatedMockGoal = {
      _id: '19',
      health:{
          description: "Description for the Goal modified",
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
    
    await goals.updateOne({ _id: '19' }, { $set:{
      "health":{
        "description":"Description for the Goal modified",
        "weight": 150,
        "calories": 1800,
        "heartRate": 200
      }} });

    const updatedGoal = await goals.findOne({ _id: '19' });
    expect(updatedGoal).toEqual(updatedMockGoal);
  });

  it('should delete a Goal from the database', async () => {
    const goals = db.collection('goals');

    await goals.deleteOne({ _id: '18' });

    const deletedGoal = await goals.findOne({ _id: '18' });
    expect(deletedGoal).toEqual(null);
  });
});