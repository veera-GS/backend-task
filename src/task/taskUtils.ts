import { getMongodb } from "../../mongodb"
import { v4 as uuidv4 } from 'uuid';
    export class TaskUtils {
    static CreateTask = async ({ data, accountid, email }: { email: string, accountid: string, data: any }) => {
        const mongodb = await getMongodb()

        try {
            await mongodb.collection('task').insertOne({ id: uuidv4(), ...data, accountid, email,createdat: new Date() })
        } catch (error) {
            throw new Error('Error on insert task')
        }

        return true
    }

    static updateTask = async ({ accountid, email, data }: { data: any, email: string, accountid: string, }) => {
        const mongodb = await getMongodb()

        try {
            await mongodb.collection('task').updateOne({ id:data.id, email, accountid }, { $set: { ...data, updatedat: new Date() } },
                { upsert: true })
        } catch (error) {
            throw new Error('Error on update task')
        }

        return true
    }

    static checkTask = async ({ accountid, email, id }: { id: string, email: string, accountid: string }) => {
        const mongodb = await getMongodb()

        try {
            const count = await mongodb.collection('task').countDocuments({ id, accountid, email })
            return count
        } catch (error) {
            throw new Error('Error on update task')
        }

    }



    static deleteTask = async ({ accountid, email, id }: { id: string, email: string, accountid: string }) => {
        const mongodb = await getMongodb()

        try {
            await mongodb.collection('task').deleteOne({ id, accountid, email })
            return true
        } catch (error) {
            throw new Error('Error on delete task')
        }

    }

    static listTask = async ({ accountid, email, }: { email: string, accountid: string }) => {
        const mongodb = await getMongodb()

        const payload = {
            accountid, email,
        }

        try {
            let listdata = await mongodb.collection('task').find(payload, { projection: { accountid: 0, email: 0,_id:0 } }).toArray()
            return listdata
        } catch (error) {
            throw new Error('Error on list task')
        }

    }

}