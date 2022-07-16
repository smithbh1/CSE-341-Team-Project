const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

describe('Behavior of the database to create, find, update, and delete users', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('users');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a User into the database', async () => {
    const users = db.collection('users');

    const mockUser = {
        _id: '21',        
        userName: "User name",
        password: "string password",
        age: 30,
        sex: "self description",
        height: "description of height",
        weight: 150
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: '21'});
    expect(insertedUser).toEqual(mockUser);
  });

  it('should bring all users registered in the database', async () => {
    const users = db.collection('users');

    const findUsers = await users.find({});

    const foundUsers = await users.find({});
    expect(findUsers).toEqual(foundUsers);
  });

  it('should bring a User using its id', async () => {
    const users = db.collection('users');

    const findUser = await users.find({ _id: '21' });

    const foundUser = await users.find({ _id: '21' });
    expect(findUser).toEqual(foundUser);
  });

  it('should update a User already registered in the database', async () => {
    const users = db.collection('users');
    const updatedMockUser = {
      _id: '20',        
      userName: "User name modified",
      password: "string password",
      age: 30,
      sex: "self description",
      height: "description of height",
      weight: 150
    };
    
    await users.updateOne({ _id: '20' }, { $set:{
      "userName":"User name modified",
      "password": "string password",
      "age": 30,
      "sex": "self description",
      "height": "description of height",
      "weight": 150
    } });

    const updatedUser = await users.findOne({ _id: '20' });
    expect(updatedUser).toEqual(updatedMockUser);
  });

  it('should delete a User from the database', async () => {
    const users = db.collection('users');

    await users.deleteOne({ _id: '19' });

    const deletedUser = await users.findOne({ _id: '19' });
    expect(deletedUser).toEqual(null);
  });
});