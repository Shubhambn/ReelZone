// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"
import { NextResponse } from "next/server"

export async function GET() {
    // Your application logic to authenticate the user
    // For example, you can check if the user is logged in or has the necessary permissions
    // If the user is not authenticated, you can return an error response

    const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    })
    try{
    return Response.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
    }
    catch(error){
        return NextResponse.json(
            {error:"Imagekit Auth Failed"},
            { status:500})

    }

}
