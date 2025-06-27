import { authOption } from "@/lib/auth";
import { ConnectionwithDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        await ConnectionwithDatabase()
        const video=await Video.find({}).sort({createdAt:-1}).lean()
        if(!video||(video.length===0)){
            return NextResponse.json(video)
        }
        return NextResponse.json(video)
    }
    catch(error){
        return NextResponse.json(
            {error:"failed to featch video"},
            {status:500}
        )


    }
}

export async function POST(request:NextResponse) {
    try{
        const session=await getServerSession(authOption)
        if(!session){
            return NextResponse.json(
                {error:"unauthorized"},
                {status:401}
            )
        }
        await ConnectionwithDatabase()
        const body=await request.json()
        if(
            !body.title||!body.description||!body.videoURL||!body.thumbnailURL
        ){
            return NextResponse.json(
                {error:"Missing required detail"},
                {status:400}
            )
        }
        const videoData={
            ...body,
            controls:body.controls??true,
            transformation:{
                height:1920,
                width:1080,
                quality:body.transformation?.quality??100
            }


        }
        const newVideo=await Video.create(videoData)
            return NextResponse.json(newVideo)
        

    }
    catch(error){
        return NextResponse.json(
            {error:"failed to create video"},
            {status:400}
        )


    }
    
}