import Head from 'next/head';
import { initializeApollo } from '../lib/client';
import {
  useTasksQuery,
  TasksQuery,
  TasksDocument,
  TasksQueryVariables,
} from '../generated/graphql-frontend';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';
import TaskFilter from '../components/TaskFilter';
import { useRouter } from 'next/router';
import { TaskStatus } from '../generated/graphql-frontend';
import Error from 'next/error';
import { GetServerSideProps } from 'next';
import { useRef, useEffect } from 'react';

const isTaskStatus = (value: string): value is TaskStatus =>
  Object.values(TaskStatus).includes(value as TaskStatus);

export default function Home() {
  const router = useRouter();
  const status = Array.isArray(router.query.status) && router.query.status.length ? router.query.status[0] : undefined;

  if (status !== undefined && !isTaskStatus(status)) {
    return <Error statusCode={404} />;
  }

  const prevStatus = useRef(status);

  useEffect(() => {
    prevStatus.current = status;
  }, [status]);

  const result = useTasksQuery({
    variables: { status },
    fetchPolicy:
      prevStatus.current === status ? 'cache-first' : 'cache-and-network',
  });
  const tasks = result.data?.tasks;

  return (
    <div>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTaskForm onSuccess={result.refetch} />
      {result.loading && !tasks ? (
        <p>Loading tasks...</p>
      ) : result.error ? (
        <p>An error occurred.</p>
      ) : tasks && tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <p className="no-tasks-message">You've got no tasks.</p>
      )}
      <TaskFilter status={status} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const status =
    typeof context.params?.status === 'string'
      ? context.params.status
      : undefined;

  if (status === undefined || isTaskStatus(status)) {
    const apolloClient = initializeApollo();

    await apolloClient.query<TasksQuery, TasksQueryVariables>({
      query: TasksDocument,
      variables: { status },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
  return { props: {} };
};
