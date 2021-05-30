import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import * as argon2 from 'argon2';

@Injectable()
export class UserService {
    async connectToDb(){
        return await open({
			filename: join(__dirname, '../../dataBase/database.db'),
			driver: sqlite3.Database,
		});
    }

    async getUserRow (db, email: string) {
        return await db.get(`SELECT * FROM users WHERE email = '${email}'`);
    }

    async createUserRow (db, email: string, password: string) {
        const hash = await argon2.hash(password);

        return await db.run(`INSERT INTO 'users' ( 'email', 'hash_password' ) VALUES ( '${email}', '${hash}');`);
    }

    async checkHashPassword(password: string, user){
        try {
            const check = await argon2.verify(user.hash_password, password);
            return check;
        } catch (err) {
            return false;

        }
    }

    async createUser(email: string, password: string){
        const db = await this.connectToDb();
        const createRow = await this.createUserRow(db, email, password);
        return createRow;
    }

    async checkUser(email: string){
        const db = await this.connectToDb();
        const row = await this.getUserRow(db, email);
        return row;
    }
}