import { getMongodb } from "../../mongodb"
import jwt from 'jsonwebtoken';


export class AuthUtils {
    static tokengenerate = async ({ id, email, accountid, fullname }: { id: string, email: string, accountid: string, fullname: string }) => {
        const mongodb = await getMongodb()
    const JWT_SECRET:any = process.env['JWT_SECRET'] || 'taskapp_secret_key';

        const payload = {
            id, fullname, email, accountid
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

        await mongodb.collection('Jwttoken').insertOne({ token, accountid, email, fullname, id })

        return token
    }

}