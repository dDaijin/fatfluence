import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Enter info");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("entries") || "[]");
    const newEntry = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      status: "ToDo",
      createdAt: new Date().toLocaleDateString("uk-UA"),
      comments: [],
    };

    localStorage.setItem("entries", JSON.stringify([...existing, newEntry]));
    navigate("/list");
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-yellow-400 border-b-2 border-yellow-400 pb-2">
          FatFluence
        </h1>
        

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-yellow-600 mb-1">
              Name Ticket *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Something happend..."
              className="w-full bg-black border-2 border-yellow-400 text-yellow-400 px-4 py-2 focus:outline-none focus:border-red-500 placeholder-yellow-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-yellow-600 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details..."
              rows={4}
              className="w-full bg-black border-2 border-yellow-400 text-yellow-400 px-4 py-2 focus:outline-none focus:border-red-500 placeholder-yellow-800 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold px-6 py-2 hover:bg-red-500 hover:text-white transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => navigate("/list")}
              className="border-2 border-yellow-400 text-yellow-400 px-6 py-2 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}