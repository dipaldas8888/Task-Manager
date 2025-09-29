import React from "react";

export default function TaskList({ tasks = [], onComplete }) {
  if (!tasks.length) {
    return <div className="p-4 text-sm text-slate-500">No tasks here.</div>;
  }
  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li
          key={t.id}
          className="p-3 bg-white rounded shadow flex justify-between items-start"
        >
          <div>
            <div className="font-semibold">{t.title}</div>
            {t.description ? (
              <div className="text-sm text-slate-600">{t.description}</div>
            ) : null}
            <div className="text-xs text-slate-400">
              Created: {new Date(t.created_at).toLocaleString()}
            </div>
          </div>
          <div>
            {!t.completed && (
              <button
                onClick={() => onComplete(t.id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Complete
              </button>
            )}
            {t.completed && (
              <span className="text-sm text-green-700">Done</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
