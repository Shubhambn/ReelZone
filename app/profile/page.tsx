"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import VideoCard from "@/component/VideoCard";
import { IVideo } from "@/models/Video";
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      const res = await fetch("/api/videos/user");
      const data = await res.json();
      setVideos(data);
    };

    fetchUserVideos();
  }, []);

  if (!session) {
    return <div className="text-center mt-20 text-xl">Please log in to view your profile</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* 🔷 Profile Header */}
      <div className="flex items-center justify-between bg-base-100 p-6 rounded-xl shadow-md border border-base-200">
        <div className="flex items-center gap-4">
        <Image
        src={session.user?.image ?? "/view-3d-cool-modern-bird.jpg"}
        alt="avatar"
        width={96} 
        height={96}
        className="rounded-full border-4 border-primary object-cover shadow"
        />
          <div>
            <h2 className="text-2xl font-bold text-primary">{session.user?.name}</h2>
            <p className="text-sm text-gray-500">@{session.user?.email?.split("@")[0]}</p>
          </div>
        </div>
        <div className="hidden md:flex gap-6 text-center">
          <div>
            <p className="font-bold text-lg">{videos.length}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div>
            <p className="font-bold text-lg">1.2k</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-bold text-lg">301</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
      </div>

      {/* 🎥 Your Video Feed */}
      <div>
        <h3 className="text-xl font-semibold mb-4 border-l-4 border-blue-500 pl-2 text-blue-600">
          👤 Your Posts
        </h3>

        {videos.length === 0 ? (
          <div className="text-center text-gray-500">You haven’t posted anything yet 😶</div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard key={video._id?.toString()} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
