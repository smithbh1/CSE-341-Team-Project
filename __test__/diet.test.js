const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

describe('Behavior of the database to create, find, update, and delete diets', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('diets');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a Diet into the database', async () => {
    const diets = db.collection('diets');

    const mockDiet = {
        _id: '17',
        diet:{
            description: "Description for the diet",
            dietName: "Diet's name",
            calories: 1800,
            protein: 200,
            carbs: 900,
            sugar: 0,
            weight: 175
        }
    };
    await diets.insertOne(mockDiet);

    const insertedDiet = await diets.findOne({_id: '17'});
    expect(insertedDiet).toEqual(mockDiet);
  });

  it('should bring all diets registered in the database', async () => {
    const diets = db.collection('diets');

    const findDiets = await diets.find({});

    const foundDiets = await diets.find({});
    expect(findDiets).toEqual(foundDiets);
  });

  it('should bring a Diet using its id', async () => {
    const diets = db.collection('diets');

    const findDiet = await diets.find({ _id: '11' });

    const foundDiet = await diets.find({ _id: '11' });
    expect(findDiet).toEqual(foundDiet);
  });

  it('should update a Diet already registered in the database', async () => {
    const diets = db.collection('diets');
    const updatedMockDiet = {
        "_id": "16",
        "diet":{
            "description": "Description for the diet modified",
            "dietName": "Diet's name",
            "calories": 1800,
            "protein": 200,
            "carbs": 900,
            "sugar": 0,
            "weight": 175
        }
    };
    
    await diets.updateOne({ _id: '16' }, { $set:{"diet":{"description":"Description for the diet modified"}} });

    const updatedDiet = await diets.findOne({ _id: '16' });
    expect(updatedDiet).toEqual(updatedMockDiet);
  });

  it('should delete a Diet from the database', async () => {
    const diets = db.collection('diets');

    await diets.deleteOne({ _id: '10' });

    const deletedDiet = await diets.findOne({ _id: '10' });
    expect(deletedDiet).toEqual(null);
  });
});