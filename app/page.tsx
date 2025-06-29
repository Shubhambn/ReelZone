// app/page.tsx
import Video, { IVideo } from "@/models/Video";
import VideoCard from "@/component/VideoCard";
import clientPromise from "@/lib/mongdb";
import mongoose from "mongoose";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "@/lib/auth"; 


// Fetch & sanitize videos
async function getVideos(): Promise<IVideo[]> {
  const client = await clientPromise;
  const db = client.db();

  if (!mongoose.models.Video) {
    mongoose.model("Video", Video.schema);
  }

  const rawVideos = await db.collection("videos").find().sort({ createdAt: -1 }).toArray();

  // Convert MongoDB docs to plain objects
  const videos: IVideo[] = rawVideos.map((doc) => ({
    _id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    videoURL: doc.videoURL,
    thumbnailURL: doc.thumbnailURL,
    controls: doc.controls,
    transformation: doc.transformation,
  }));
  return videos;
}

export default async function Home() {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/welcome");
  }

  const videos = await getVideos();

  return (
    <section className="h-[calc(100vh-64px)] overflow-y-scroll snap-y snap-mandatory">
      <div className="flex flex-col items-center space-y-4 max-w-xl mx-auto px-2">
        {videos.map((video) => (
          <VideoCard key={video._id?.toString()} video={video} />
        ))}
      </div>
    </section>
  );
}
