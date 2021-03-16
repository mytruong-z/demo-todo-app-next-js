import React from 'react';
import Link from 'next/link';
import { TaskStatus } from '../generated/graphql-frontend';

interface Props {
  status?: TaskStatus;
}

const TaskFilter: React.FC<Props> = ({ status }) => {
  return (
    <ul className="task-filter d-flex items-center">
      <li>
        <Link href="/" scroll={false} shallow={true}>
          <a className={`bg-teal-100 focus:outline-none focus:shadow-outline ${!status ? 'task-filter-active btn-active btn-active bg-green-300' : ''}`} >
            All
          </a>
        </Link>
      </li>
    <li>
        <Link
          href="/[status]"
          as={`/${TaskStatus.Active}`}
          scroll={false}
          shallow={true}
        >
          <a
            className={`bg-teal-100 focus:outline-none focus:shadow-outline ${status === TaskStatus.Active ? 'task-filter-active bg-teal-200' : ''}`}>
            Active
          </a>
        </Link>
      </li>
    <li>
        <Link
          href="/[status]"
          as={`/${TaskStatus.Completed}`}
          scroll={false}
          shallow={true}
        >
          <a
            className={`bg-teal-100 focus:outline-none focus:shadow-outline ${status === TaskStatus.Completed ? 'task-filter-active btn-active bg-green-300' : ''}`
            }
          >
            Completed
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default TaskFilter;
