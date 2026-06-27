import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  ToDo: "bg-black text-yellow-400 border border-yellow-400",
  inProgress: "bg-yellow-400 text-black",
  Done: "bg-red-600 text-white",
};

export function SuccessPage() {
  const [entries, setEntries] = useState(
    JSON.parse(localStorage.getItem("entries") || "[]")
  );
  const navigate = useNavigate();

  function handleDelete(id) {
    const updated = entries.filter((entry) => entry.id !== id);
    localStorage.setItem("entries", JSON.stringify(updated));
    setEntries(updated);
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between border-b-2 border-yellow-400 pb-2 mb-2">
          <h1 className="text-3xl font-bold">FatFluence</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-black font-bold px-4 py-2 hover:bg-red-500 hover:text-white transition-colors text-sm"
          >
            + New Ticket
          </button>
        </div>
        <p className="text-yellow-600 mb-8 text-sm">Reports</p>

        {entries.length === 0 ? (
          <div className="border-2 border-yellow-400 border-dashed p-12 text-center">
            <p className="text-yellow-600 text-lg">No Tickets.</p>
            <p className="text-yellow-800 text-sm mt-1">
              This is suspicious.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="border-2 border-yellow-400 p-4 flex items-start justify-between hover:border-red-500 transition-colors group"
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => navigate(`/entry/${entry.id}`)}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-yellow-700 text-xs font-mono">
                      #{entry.id}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 ${STATUS_STYLES[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                    {entry.comments?.length > 0 && (
                      <span className="text-yellow-700 text-xs">
                        💬 {entry.comments.length}
                      </span>
                    )}
                  </div>
                  <p className="font-bold text-yellow-400 group-hover:text-red-400 transition-colors">
                    {entry.title}
                  </p>
                  {entry.description && (
                    <p className="text-yellow-700 text-sm mt-1 line-clamp-1">
                      {entry.description}
                    </p>
                  )}
                  <p className="text-yellow-800 text-xs mt-2">
                    {entry.createdAt}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(entry.id)}
                  className="ml-4 text-yellow-700 hover:text-red-500 transition-colors text-lg"
                  title="Видалити"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}