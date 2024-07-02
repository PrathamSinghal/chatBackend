import mongoose from "mongoose";

class masterService {

    async aggregatePaginate(model, aggregate: any[], option: { page: Number, limit: Number }): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                var myAggregate = model.aggregate(aggregate);
                var data = await model.aggregatePaginate(myAggregate, option);
                resolve(data)
            } catch (error) {
                reject(error)
            }

        })
    }

    async aggregate(model: any, filter: any[]) {
        return new Promise((resolve, reject) => {
            model.aggregate(
                filter
            ).exec(function (err: any, invites: any[]) {
                if (err) {
                    reject(err)
                }
                resolve(invites)
            }
            );
        })
    }

    async genrateObjectId(value:string){
        return new  mongoose.Types.ObjectId(value)
    }




}


export const MasterService = new masterService()