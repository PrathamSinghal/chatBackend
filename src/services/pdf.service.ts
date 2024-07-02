import mongoose from 'mongoose';
import * as db from '../model/_index';
import * as Interface from "../interface/pdf.interface";

class pdfService {
    constructor() {

    }

    async create(payload: Interface.pdfInterface): Promise<any> {
        try {
            return await db.pdfModel.create(payload);
        } catch (error) {
            throw error
        }
    }

    async update(query: Object, payload: any): Promise<any> {
        try {
            return await db.pdfModel.findOneAndUpdate(query, payload, { new: true })
        } catch (error) {
            throw error
        }
    }

    async findOne(query: Object) {
        try {
            return await db.pdfModel.findOne(query)
        } catch (error) {
            throw error
        }
    }

    async aggregatePaginate(aggregate: any[], option: { page: Number, limit: Number }) {
        return new Promise(async (resolve, reject) => {
            try {
                var myAggregate = db.pdfModel.aggregate(aggregate);
                var data = await db.pdfModel.aggregatePaginate(myAggregate, option);
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

    async delete(query:any) {
        try {
            return db.pdfModel.deleteOne(query, {isDelete:true})
        } catch (error) {
            throw error
        }
    }

}


export const PdfService = new pdfService();