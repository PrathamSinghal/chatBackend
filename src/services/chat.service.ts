import mongoose from 'mongoose';
import * as db from '../model/_index';
import * as Interface from "../interface/pdf.interface";

class chatService {
    constructor() {

    }

    async create(payload: Interface.pdfInterface): Promise<any> {
        try {
            return await db.chatModel.create(payload);
        } catch (error) {
            throw error
        }
    }

    async aggregatePaginate(aggregate: any[], option: { page: Number, limit: Number }) {
        return new Promise(async (resolve, reject) => {
            try {
                var myAggregate = db.chatModel.aggregate(aggregate);
                var data = await db.chatModel.aggregatePaginate(myAggregate, option);
                resolve(data)
            } catch (error) {
                reject(error)
            }

        })
    }

    async list(query?: Object, options?: { page: Number, limit: Number }): Promise<any> {
        try {
            let filter: any = [
                { $sort: { _id: -1 } },
            ];
            return await this.aggregatePaginate(filter, options)
        } catch (error) {

        }
    }


}


export const ChatService = new chatService();