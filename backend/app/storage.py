from threading import Lock
from typing import List, Optional
from datetime import datetime
from .models import Task, TaskCreate

_lock = Lock()
_tasks: List[Task] = []
_next_id = 1

def _get_next_id() -> int:
    global _next_id
    with _lock:
        nid = _next_id
        _next_id += 1
    return nid

def add_task(data: TaskCreate) -> Task:
    task = Task(
        id=_get_next_id(),
        title=data.title,
        description=data.description,
        completed=False,
        created_at=datetime.utcnow()
    )
    with _lock:
        _tasks.append(task)
    return task

def list_tasks(filter_completed: Optional[bool] = None):
    with _lock:
        if filter_completed is None:
            return list(_tasks)
        return [t for t in _tasks if t.completed is filter_completed]

def mark_complete(task_id: int) -> Optional[Task]:
    with _lock:
        for t in _tasks:
            if t.id == task_id:
                t.completed = True
                return t
    return None

def get_task(task_id: int) -> Optional[Task]:
    with _lock:
        for t in _tasks:
            if t.id == task_id:
                return t
    return None
