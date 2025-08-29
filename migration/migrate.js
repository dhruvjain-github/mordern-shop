const { MongoClient } = require('mongodb');
const fs = require('fs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.DATABASE_NAME || 'ecommerce';

async function migrate() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('Starting migration...');
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DATABASE_NAME);

    console.log('Migrating products...');
    const productsData = JSON.parse(fs.readFileSync('/migration/data/products.json', 'utf8'));
    await db.collection('products').deleteMany({});
    const productsResult = await db.collection('products').insertMany(productsData);
    console.log(`Inserted ${productsResult.insertedCount} products`);

    console.log('Migrating categories...');
    const categoriesData = JSON.parse(fs.readFileSync('/migration/data/categories.json', 'utf8'));
    await db.collection('categories').deleteMany({});
    const categoriesResult = await db.collection('categories').insertMany(categoriesData);
    console.log(`Inserted ${categoriesResult.insertedCount} categories`);

    await db.collection('products').createIndex({ "id": 1 }, { unique: true });
    await db.collection('products').createIndex({ "category": 1 });
    await db.collection('categories').createIndex({ "id": 1 }, { unique: true });
    
    console.log('Migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
