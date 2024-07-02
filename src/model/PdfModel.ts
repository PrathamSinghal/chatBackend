import mongoose,{Schema,model} from 'mongoose';
import 'dotenv/config';
import mongoosePaginate ,{paginate}from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose)
let schema = new Schema({
    name:{
        type:String,
        default:null
    },
    size:{
        type:Number,
        default:null
    },
    sharedUrl:{
        type:String,
        default:null
    },
    downloadUrl:{
        type:String,
        default:null
    },
    boxFileId: {
        type:String,
        default:null
    },
    parentFolder: {
        type:String,
        default:null
    },
},{timestamps:true});


schema.plugin(mongoosePaginate)
schema.plugin(aggregatePaginate);
schema.plugin(AutoIncrement, {  inc_field: "pdfNumber" });


export const pdfModel: any = model('pdf',schema)


