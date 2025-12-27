"use client";
import React from "react";

export default function GalleryPage() {
  const posts = [
    {
      id: 1,
      username: "snehal.ai",
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80",
      caption: "Exploring AI-powered creativity 🤖✨",
      likes: 120,
      comments: 15,
    },
    {
      id: 2,
      username: "tech_vision",
      image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&q=80",
      caption: "Dream. Code. Create.",
      likes: 98,
      comments: 8,
    },
    {
      id: 3,
      username: "creative.bot",
      image: "https://images.unsplash.com/photo-1612831455543-62d97b63d7a3?w=800&q=80",
      caption: "AI art that blows your mind 🤯",
      likes: 210,
      comments: 25,
    },
    {
      id: 4,
      username: "deepthinker",
      image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=800&q=80",
      caption: "Neural networks are the new brush 🧠🎨",
      likes: 75,
      comments: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1b] to-[#1a1a2e] py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#181826] rounded-2xl shadow-lg overflow-hidden hover:shadow-[0_0_25px_rgba(128,0,255,0.3)] transition-all duration-300 transform hover:-translate-y-2"
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-200">@{post.username}</p>
                <div className="text-sm text-gray-400">
                  ❤️ {post.likes} • 💬 {post.comments}
                </div>
              </div>
              <p className="text-gray-400 text-sm">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
