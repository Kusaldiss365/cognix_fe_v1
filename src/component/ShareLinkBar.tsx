'use client';

import { useRef } from "react";
import { Copy, Share2 } from "lucide-react";

export default function ShareLinkBar({ sessionId }: { sessionId: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const origin = process.env.NEXT_PUBLIC_FRONTEND_ORIGIN || (typeof window !== 'undefined' ? window.location.origin : '');
  const url = new URL(origin + '/chat');
  if (sessionId) url.searchParams.set('session_id', sessionId);
  const shareUrl = url.toString();


  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
        .then(() => {
          console.log("Copied!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center bg-gray-900 border border-gray-700 rounded-full overflow-hidden px-4 py-2 w-fit max-w-full">
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={shareUrl}
          className="bg-transparent text-white text-sm truncate focus:outline-none w-[250px]"
        />

        <button
          type="button"
          onClick={handleCopy}
          className="group text-sm text-white rounded-md px-3 py-1.5 cursor-pointer transition"
        >
          <Copy className="w-4 h-4 text-white group-hover:text-gray-400 transition" />
        </button>

        {/* <button
          type="button"
          className="group text-sm text-white rounded-md px-3 py-1.5 cursor-pointer transition"
        >
          <Share2 className="w-4 h-4 text-white group-hover:text-gray-400 transition" />
        </button> */}
      </div>
    </div>
  );
}
