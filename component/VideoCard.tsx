"use client";

import React, { useEffect, useRef, useState } from "react";
import { IVideo } from "@/models/Video";
import { Heart } from "lucide-react";

interface Props {
  video: IVideo;
}

const VideoCard: React.FC<Props> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const vid = videoRef.current;
        if (!vid) return;

        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.8 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] snap-start scroll-mt-16">
      <video
        ref={videoRef}
        src={video.videoURL}
        poster={video.thumbnailURL ?? "/fallback.jpg"}
        controls={false}
        loop
        muted
        className="w-full h-full object-cover rounded-md shadow-lg"
      />

      <div className="absolute bottom-10 left-4 bg-black/50 p-3 rounded-md text-white max-w-[90%]">
        <h3 className="text-lg font-bold">{video.title}</h3>
        <p className="text-sm text-gray-200">{video.description}</p>
      </div>

      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
      >
        <Heart className={liked ? "text-red-500 fill-red-500" : "text-gray-600"} />
      </button>
    </div>
  );
};

export default VideoCard;
