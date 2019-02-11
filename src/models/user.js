const userModel = async db => {
  const collection = await db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['email', 'password'],
        properties: {
          name: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          email: {
            bsonType: 'string',
            pattern: "@mongodb\.com$",
            description: 'must be a string and follow the pattern of an email'
          },
          password: {
            bsonType: 'string',
            description: 'must be a string and is required'
          },
          role: {
            bsonType: 'string',
            description: 'must be a string and is required'
          }
        }
      },
    }
  });
  return collection;
};

export default userModel;
