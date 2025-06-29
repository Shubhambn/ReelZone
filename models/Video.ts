import mongoose, {Schema} from "mongoose"

export const Video_Dimension={
    width:1080,
    height:1090
} as const

export interface IVideo{
    _id?:String;
    title:string;
    description:string;
    videoURL:string;
    thumbnailURL:string;
    controls?:boolean;
    transformation:{
        height:number,
        width:number,
        quality:number
    }


}

const VideoSchema=new Schema<IVideo>({
    title:{type:String,required:true},
    description:{type:String,required:true},
    videoURL:{type:String,required:true},
    thumbnailURL:{type:String,required:true},
    controls:{type:Boolean,required:true},
    transformation:{
        height:{type:Number,default: Video_Dimension.height},
        width:{type:Number,default:Video_Dimension.width},
        quality:{type:Number,min:1,max:100}
    }
    
},{timestamps:true})

const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);


export default Video