"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import FileUpload from "@/component/FileUpload"; // renamed + imported

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !description || !videoURL || !thumbnailURL) {
      setMessage("All fields are required.");
      return;
    }

    const payload = {
      title,
      description,
      videoURL,
      thumbnailURL,
      controls: true,
      transformation: {
        height: 1080,
        width: 1920,
        quality: 90,
      },
    };

    try {
      setUploading(true);
      await apiClient.createVideo(payload);
      console.log("Payload about to be sent:", payload);

      setMessage("Upload successful!");
      router.push("/");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Upload a New Video</h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FileUpload label="Upload Video File" onUploadComplete={setVideoURL} />
      <FileUpload label="Upload Thumbnail Image" onUploadComplete={setThumbnailURL} />

      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Submitting..." : "Submit"}
      </button>

      {message && (
        <p className={`mt-2 text-sm ${message.includes("failed") ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
