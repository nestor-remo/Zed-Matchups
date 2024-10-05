import { pool } from './database.js';
import './dotenv.js';
import championData from '../data/gifts.js';

const createChampionsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS champions;

        CREATE TABLE IF NOT EXISTS champions (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            difficulty VARCHAR(255) NOT NULL,
            runes VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        )
    `
    try {
        const res = await pool.query(createTableQuery);
        console.log("Champions table created successfully");
    }
    catch (error) {
        console.log("Error creating champions table", error);
    }
}


const seedChampionsTable = async () => {
    await createChampionsTable();
    
    championData.forEach((champion) => {
        const insertQuery = {
            text: 'INSERT INTO champions (name, difficulty, runes, image, description) VALUES ($1, $2, $3, $4, $5)'
        }
        const values = [
            champion.name,
            champion.difficulty,
            champion.Runes,
            champion.image,
            champion.description
        ]    
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.log("Error inserting row into champions table", err);
                return;
            } else {
                console.log(`Inserted ${champion.name} row into champions table`);
            }
        })
    })
    
}

seedChampionsTable();