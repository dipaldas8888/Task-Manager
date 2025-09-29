const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function fetchTasks(status) {
  const params = status ? `?status=${encodeURIComponent(status)}` : "";
  const res = await fetch(`${API_BASE}/tasks${params}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function addTask(payload) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to add task: " + text);
  }
  return res.json();
}

export async function completeTask(taskId) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}/complete`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to complete task");
  return res.json();
}
