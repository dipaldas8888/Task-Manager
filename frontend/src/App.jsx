import React, { useEffect, useState } from "react";
import { fetchTasks, addTask, completeTask } from "./api";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function App() {
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const all = await fetchTasks();
      setPending(all.filter((t) => !t.completed));
      setCompleted(all.filter((t) => t.completed));
    } catch (err) {
      alert("Failed to load tasks: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(payload) {
    const created = await addTask(payload);
    setPending((prev) => [created, ...prev]);
  }

  async function handleComplete(taskId) {
    await completeTask(taskId);
    // move item from pending to completed in local state
    setPending((prev) => prev.filter((t) => t.id !== taskId));
    const done = (await fetchTasks("completed")).find((t) => t.id === taskId);
    if (done) setCompleted((prev) => [done, ...prev]);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <AddTask onAdd={handleAdd} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold mb-2">Pending</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList tasks={pending} onComplete={handleComplete} />
          )}
        </div>
        <div>
          <h2 className="font-semibold mb-2">Completed</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList tasks={completed} onComplete={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
}
