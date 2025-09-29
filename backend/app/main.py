from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from .models import TaskCreate, Task
from . import crud

app = FastAPI(title="Task Manager API")


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tasks", response_model=Task, status_code=201)
def create_task(payload: TaskCreate):
    return crud.create_task(payload)

@app.get("/tasks", response_model=list[Task])
def get_tasks(status: Optional[str] = None):
    
    if status and status not in ("all", "pending", "completed"):
        raise HTTPException(status_code=400, detail="status must be one of all|pending|completed")
    if status == "all" or status is None:
        status = None
    return crud.fetch_tasks(status)

@app.put("/tasks/{task_id}/complete", response_model=Task)
def complete_task(task_id: int):
    task = crud.complete_task(task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
