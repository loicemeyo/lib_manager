const bookModel = async (db) => {

    const collection = await db.createColection('books', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['title', 'author', 'publication', 'available', 'string'],
                properties: {
                    title: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    author: {
                        bsonType: 'string',
                        description: 'must be a string and is required'
                    },
                    publication: {
                        bsonType: 'int',
                        description: 'must be integer and is required'
                    },
                    available: {
                        bsonType: 'boolean',
                        description: 'must be boolean and is required' 
                    }
                    serial: {
                        bsonType: 'string',
                        description: 'must be string and is required'
                    }

                }
            }
        }
    });
    return collection;
}
export default bookModel;