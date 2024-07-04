import mongoose,{Schema,model} from 'mongoose';
import 'dotenv/config';

let schema = new Schema({
    question:{
        type:String,
        default:null
    },
    answer:{
        type:String,
        default:null
    },
    pdfId:{
        type:String,
        default:null
    },
},{timestamps:true});


export const chatModel: any = model('chat',schema);


