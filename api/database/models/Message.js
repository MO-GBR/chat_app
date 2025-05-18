import { currentTime } from "../../utils/HandleResponse.js";
import { query } from "../connection.js";
import { v4 as uuidv4 } from 'uuid';

const propertiesStringArrray = [
    'unique_id',
    'sender_id',
    'receiver_id',
    'text',
    'image',
    'time'
];

export class Message {
    constructor(sender_id, receiver_id, text, image) {
        this.unique_id = uuidv4();
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.text = text;
        this.image = image;
        this.time = currentTime;
    }

    async save(table) {
        const properties = propertiesStringArrray.join(", ");
        const placholders = propertiesStringArrray.map((_, index) => `$${index + 1}`).join(", ");
        const values = Object.values(this);
        
        const queryText = `INSERT INTO ${table} (${properties}) VALUES (${placholders}) RETURNING *`;
        
        const result = await query(queryText, values);
        return result.rows[0];
    }

    static async findBy(table, find) {
        /*
            const find = {
                username: 'username',
                email: 'email',
            };
        */

        const findKeys = Object.keys(find);
        const findValues = Object.values(find);
        const whereClause = findKeys.map((item, index) => `${item} = $${index + 1}`).join(" AND ");
        const queryText = `SELECT * FROM ${table} WHERE ${whereClause}`;
    
        const result = await query(queryText, findValues);
        return result.rows;
    }
}