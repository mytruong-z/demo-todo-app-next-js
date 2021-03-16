import React, { useState } from 'react';
import {useCreateTaskMutation} from '../generated/graphql-frontend';

interface Props {
  onSuccess: () => void;
}

const CreateTaskForm: React.FC<Props> = ({onSuccess}) => {
  const [title, setTitle] = useState('');
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const [createTask, {loading, error}] = useCreateTaskMutation({
    onCompleted: () => {
      onSuccess();
      setTitle('');
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!loading && title !== "") {
      try {
        await createTask({variables: {input: {title}}});
      } catch (e) {
          //error
      }
    }
  
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="alert-error">An error occurred.</p>}
      <input
        type="text"
        name="title"
        placeholder="What would you like to get done?"
        autoComplete="off"
        className="text-input new-task-text-input bg-white hover:border-green-300 focus:outline-none focus:border-green-300"
        value={title}
        onChange={handleTitleChange}
      />
    </form>
  );
};

export default CreateTaskForm;
