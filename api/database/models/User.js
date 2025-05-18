import { currentTime } from "../../utils/HandleResponse.js";
import { query } from "../connection.js";
import { v4 as uuidv4 } from 'uuid';

const propertiesStringArrray = [
    'unique_id',
    'username',
    'email',
    'password',
    'user_image',
    'bio',
    'auth_provider_id',
    'chats',
    'reset_password_token',
    'reset_password_expire',
    'is_active',
    'time'
];

export class User {
    constructor(username, email, password, user_image, bio, auth_provider_id) {
        this.unique_id = uuidv4();
        this.username = username;
        this.email = email;
        this.password = password;
        this.user_image = user_image;
        this.bio = bio;
        this.auth_provider_id = auth_provider_id;
        this.chats = [];
        this.reset_password_token = null;
        this.reset_password_expire = null;
        this.is_active = true;
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

    static async findById(unique_id, table) {
        const queryText = `SELECT * FROM ${table} WHERE unique_id = $1`;
        const values = [unique_id];
        const result = await query(queryText, values);
        return result.rows[0];
    }

    static async findAll(table) {
        const queryText = `SELECT * FROM ${table}`;
        const result = await query(queryText);
        return result.rows;
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
        return result.rows[0];
        // return result.rows; => find many
    }

    static async updateById(uniqueId, table, updates) {
        /*
            const updates = {
                username: 'newUsername',
                email: 'newEmail'
            };
        */
        const setString = Object.keys(updates)
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");
        const values = Object.values(updates);
        values.push(uniqueId);

        const queryText = `UPDATE ${table} SET ${setString} WHERE unique_id = $${values.length}`;
        const result = await query(queryText, values);
        return result.rows[0];
    }

    static async deleteById(uniqueId, table) {
        const queryText = `DELETE FROM ${table} WHERE uniqueId = $1`;
        const values = [uniqueId];
        console.log(queryText, values);
        const result = await query(queryText, values);
        return result.rowCount > 0;
    }

    static async deleteTable(table) {
        const queryText = `DROP TABLE IF EXISTS ${table}`;
        console.log(queryText);
        await query(queryText);
        return true;
    }
}