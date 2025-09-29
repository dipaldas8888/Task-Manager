from typing import List, Optional
from .models import Task, TaskCreate
from . import storage

def create_task(payload: TaskCreate) -> Task:
    return storage.add_task(payload)

def fetch_tasks(status: Optional[str] = None) -> List[Task]:
    
    if status == "pending":
        return storage.list_tasks(filter_completed=False)
    if status == "completed":
        return storage.list_tasks(filter_completed=True)
    return storage.list_tasks(None)

def complete_task(task_id: int) -> Optional[Task]:
    return storage.mark_complete(task_id)
