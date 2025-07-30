"use client";
import { useState, useEffect } from "react";

interface Reply {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  replies: Reply[];
  timestamp: string;
}

export default function Community() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem("comments", JSON.stringify(newComments));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newComment: Comment = {
      id: Date.now(),
      author: name || "Anonymous",
      text: message,
      replies: [],
      timestamp: new Date().toLocaleString(),
    };

    const updatedComments = [newComment, ...comments];
    saveComments(updatedComments);

    setName("");
    setMessage("");
  };

  const handleReply = (commentId: number, replyAuthor: string, replyText: string) => {
    if (replyText.trim() === "") return;

    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                author: replyAuthor || "Anonymous",
                text: replyText,
                timestamp: new Date().toLocaleString(),
              },
            ],
          }
        : comment
    );

    saveComments(updatedComments);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-8 bg-white">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Community</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg p-2 h-24"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Send
          </button>
        </form>
      </div>

      {/* Right Side - Forum */}
      <div
        className="w-full md:w-1/2 p-8 text-white bg-cover bg-center overflow-y-auto"
        style={{ backgroundImage: "url('/community.jpeg')" }}
      >
        <h2 className="text-2xl font-bold mb-4">Community Forum</h2>
        {comments.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-black bg-opacity-60 p-4 rounded-lg shadow-md transition transform hover:scale-[1.01]"
              >
                {/* Header con avatar */}
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-full font-bold text-white mr-3">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{comment.author}</p>
                    <span className="text-xs text-gray-300">{comment.timestamp}</span>
                  </div>
                </div>

                {/* Texto */}
                <p className="mb-2">{comment.text}</p>

                {/* Replies */}
                <div className="ml-6 mt-2 space-y-2">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-800 bg-opacity-80 p-2 rounded transition"
                    >
                      <p className="font-semibold text-sm">{reply.author}</p>
                      <span className="text-xs text-gray-400">{reply.timestamp}</span>
                      <p>{reply.text}</p>
                    </div>
                  ))}

                  {/* Reply Form Toggle */}
                  <ReplyForm
                    onReply={(replyAuthor, replyText) =>
                      handleReply(comment.id, replyAuthor, replyText)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Reply Form Component
function ReplyForm({ onReply }: { onReply: (author: string, text: string) => void }) {
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim() === "") return;
    onReply(replyName, replyText);
    setReplyName("");
    setReplyText("");
    setShowForm(false);
  };

  return (
    <div className="mt-2">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="text-purple-400 hover:underline text-sm"
        >
          Reply
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col mt-2 space-y-2">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            className="border rounded p-1 text-black"
          />
          <textarea
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="border rounded p-1 text-black h-16"
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-purple-500 text-white px-3 py-1 rounded">
              Send Reply
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-300 hover:underline text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

