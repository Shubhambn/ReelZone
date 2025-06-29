"use client";
import React, { FC, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

interface FileUploadProps {
  label: string;
  onUploadComplete: (url: string) => void;
}
const FileUpload: FC<FileUploadProps> = ({ label, onUploadComplete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const authenticator = async () => {
    const response = await fetch("/api/imagekit-auth");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Auth failed: ${JSON.stringify(data)}`);
    }

    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setError(null);
    setSuccess(null);

    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      setIsUploading(false);
      return;
    }

    const file = fileInput.files[0];
    try {
      const { signature, expire, token, publicKey } = await authenticator();
      abortControllerRef.current = new AbortController();

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: abortControllerRef.current.signal,
      });

      if (uploadResponse.url) {
        onUploadComplete(uploadResponse.url);
        setSuccess("Upload successful!");
      } else {
        throw new Error("No URL returned after upload.");
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
        setError("Upload was cancelled.");
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
        setError("Invalid upload request.");
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
        setError("Check your internet connection.");
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
        setError("Server error. Try again later.");
      } else {
        console.error("Upload error:", error);
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm space-y-3 w-full max-w-md">
      <label className="block text-sm font-medium">{label}</label>
      <input type="file" ref={fileInputRef} className="w-full" />
      <div className="flex gap-2">
        <button
          type="button"
          disabled={isUploading}
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Upload File
        </button>
        <button
          type="button"
          disabled={!isUploading}
          onClick={() => abortControllerRef.current?.abort()}
          className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
        >
          Cancel Upload
        </button>
      </div>

      {isUploading && (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="animate-spin w-4 h-4" />
          <span className="text-sm">Uploading...</span>
        </div>
      )}

      {progress > 0 && (
        <progress
          value={progress}
          max={100}
          className="w-full h-2 rounded bg-gray-200 [&::-webkit-progress-value]:bg-blue-500"
        />
      )}

      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
    </div>
  );
};

export default FileUpload;
