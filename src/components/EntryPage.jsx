import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const STATUSES = ["ToDo", "inProgress", "Done"];

const STATUS_STYLES = {
  ToDo: "bg-black text-yellow-400 border-2 border-yellow-400",
  inProgress: "bg-yellow-400 text-black",
  Done: "bg-red-600 text-white",
};

export function EntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entries, setEntries] = useState(
    JSON.parse(localStorage.getItem("entries") || "[]")
  );
  const [newComment, setNewComment] = useState("");

  const entry = entries.find((e) => String(e.id) === String(id));

  function save(updatedEntry) {
    const updated = entries.map((e) =>
      String(e.id) === String(id) ? updatedEntry : e
    );
    localStorage.setItem("entries", JSON.stringify(updated));
    setEntries(updated);
  }

  function handleStatusChange(status) {
    save({ ...entry, status });
  }

  function handleAddComment(e) {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const comment = {
      id: Date.now(),
      text: newComment.trim(),
      createdAt: new Date().toLocaleDateString("uk-UA"),
    };
    save({ ...entry, comments: [...(entry.comments || []), comment] });
    setNewComment("");
  }

  function handleDeleteComment(commentId) {
    save({
      ...entry,
      comments: entry.comments.filter((c) => c.id !== commentId),
    });
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Заявку не знайдено 🤷</p>
          <button
            onClick={() => navigate("/list")}
            className="border-2 border-yellow-400 px-4 py-2 hover:bg-yellow-400 hover:text-black transition-colors"
          >
            Назад до списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-8">
      <div className="max-w-2xl mx-auto">

        {/* Хедер */}
        <div className="border-b-2 border-yellow-400 pb-3 mb-6">
          <button
            onClick={() => navigate("/list")}
            className="text-yellow-700 hover:text-red-500 text-sm mb-4 flex items-center gap-1 transition-colors"
          >
            ← Назад до списку
          </button>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold">{entry.title}</h1>
            <span className="text-yellow-800 text-xs font-mono whitespace-nowrap mt-1">
              #{entry.id}
            </span>
          </div>
          <p className="text-yellow-700 text-xs mt-1">
            Created: {entry.createdAt}
          </p>
        </div>

        {/* Статус */}
        <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-yellow-600 mb-2">
            Status
        </p>
        <select
            value={entry.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-black border-2 border-yellow-400 text-yellow-400 px-4 py-2 text-sm font-bold focus:outline-none focus:border-red-500 cursor-pointer"
        >
            {STATUSES.map((s) => (
            <option key={s} value={s} className="bg-black text-yellow-400">
                {s}
            </option>
            ))}
        </select>
        </div>

        {/* Опис */}
        {entry.description && (
          <div className="mb-6 border-l-4 border-yellow-400 pl-4">
            <p className="text-xs font-bold uppercase tracking-widest text-yellow-600 mb-1">
              Description
            </p>
            <p className="text-yellow-400">{entry.description}</p>
          </div>
        )}

        {/* Коментарі */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-600 mb-3">
            Comments ({entry.comments?.length || 0})
          </p>

          {entry.comments?.length === 0 || !entry.comments ? (
            <p className="text-yellow-800 text-sm mb-4 italic">
              No Comments here.
            </p>
          ) : (
            <div className="flex flex-col gap-2 mb-4">
              {entry.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-yellow-800 p-3 flex justify-between items-start hover:border-yellow-400 transition-colors"
                >
                  <div>
                    <p className="text-yellow-400 text-sm">{comment.text}</p>
                    <p className="text-yellow-800 text-xs mt-1">
                      {comment.createdAt}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-yellow-800 hover:text-red-500 transition-colors ml-4 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Форма нового коментаря */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Додати коментар..."
              className="flex-1 bg-black border-2 border-yellow-400 text-yellow-400 px-3 py-2 text-sm focus:outline-none focus:border-red-500 placeholder-yellow-800"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-colors"
            >
              Додати
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}