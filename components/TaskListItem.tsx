import React, { useEffect } from 'react';
import {
  Task,
  useDeleteTaskMutation,
  TaskStatus,
  useUpdateTaskMutation,
} from '../generated/graphql-frontend';
import Link from 'next/link';
import { Reference } from '@apollo/client';

interface Props {
  task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    variables: { id: task.id },
    errorPolicy: 'all',
    update: (cache, result) => {
      const deletedTask = result.data?.deleteTask;

      if (deletedTask) {
        cache.modify({
          fields: {
            tasks(taskRefs: Reference[], { readField }) {
              return taskRefs.filter((taskRef) => {
                return readField('id', taskRef) !== deletedTask.id;
              });
            },
          },
        });
      }
    },
  });
  const handleDeleteClick = async () => {
    try {
      await deleteTask();
    } catch (e) {
      // Log the error
      console.log(e);
    }
  };

  useEffect(() => {
    if (error) {
      alert('An error occurred, please try again.');
    }
  }, [error]);

  const [
    updateTask,
    { loading: updateTaskLoading, error: updateTaskError },
  ] = useUpdateTaskMutation({
    errorPolicy: 'all',
  });
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked
      ? TaskStatus.Completed
      : TaskStatus.Active;
    updateTask({ variables: { input: { id: task.id, status: newStatus } } });
  };

  useEffect(() => {
    if (updateTaskError) {
      alert('An error occurred, please try again.');
    }
  }, [updateTaskError]);

  return (
    <li className="task-list-item" key={task.id}>
      <label className="checkbox hover:border-green-300">
        <input
          type="checkbox"
          onChange={handleStatusChange}
          checked={task.status === TaskStatus.Completed}
          disabled={updateTaskLoading}
        />
        <span className="checkbox-mark">&#10003;</span>
      </label>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <a className="task-list-item-title">{task.title}</a>
      </Link>
      <button
        className="task-list-item-delete text-red-500 hover:text-white hover:bg-red-500"
        disabled={loading}
        onClick={handleDeleteClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
};

export default TaskListItem;
