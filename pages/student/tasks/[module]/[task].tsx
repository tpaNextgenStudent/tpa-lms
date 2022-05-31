import { Layout } from '../../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../../lib/types';
import { TasksMenu } from '../../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../../components/pagesStyles/tasksPage.module.scss';
import { TaskSection } from '../../../../components/tasks/TaskSection/TaskSection';
import { fetchUserTasksByModule } from '../../../../apiHelpers/tasks';
import { fetchUserModules } from '../../../../apiHelpers/modules';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { fetchAttemptsByTask } from '../../../../apiHelpers/attempts';
import { attemptsToComments } from '../../../../utils/attemptsToComments';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner/LoadingSpinner';
import { useMemo } from 'react';

export default function Tasks({
  user,
}: InferPagePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { module: moduleId, task: taskId } = router.query! as {
    module: string;
    task: string;
  };

  const {
    data: modules,
    isFetching: isModulesFetching,
    refetch: refetchModules,
  } = useQuery('modules', fetchUserModules);

  const {
    data: tasks,
    isFetching: isTasksFetching,
    refetch: refetchTasks,
  } = useQuery(['tasks', moduleId], () => fetchUserTasksByModule(moduleId));
  const task = tasks && tasks.find(t => t.task_data.id === taskId);

  const {
    data: attempts,
    refetch: refetchAttempts,
    isFetching: isAttemptsFetching,
  } = useQuery(['attempts', taskId], () => fetchAttemptsByTask(taskId), {
    enabled: router.query.view === 'comments',
  });

  const refetchAll = async () => {
    await refetchModules();
    await refetchTasks();
  };

  const module = useMemo(
    () => modules && modules.find(m => m.module_version_id === moduleId)!,
    [modules, moduleId]
  );
  const comments = useMemo(
    () => attempts && attemptsToComments(attempts),
    [attempts]
  );

  const isLoading = isModulesFetching || isTasksFetching;
  return (
    <Layout
      headerTitle="My Tasks"
      title="My Tasks"
      user={user}
      headerDescription="Find all of yours tasks divided into modules."
    >
      {modules && module && tasks && task ? (
        <div className={styles.tasksWrapper}>
          <TasksMenu
            tasksPathPrefix={'/student/tasks'}
            modules={modules}
            module={module}
            tasks={tasks}
            task={task}
          />
          <TaskSection
            comments={{
              data: comments,
              refetch: refetchAttempts,
              isLoading: isAttemptsFetching,
            }}
            attempt={task?.last_attempt}
            task={task?.task_data}
            module={module}
            isTaskActionVisible
          />
        </div>
      ) : (
        <LoadingSpinner isLoading={isLoading} refetch={refetchAll} />
      )}
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('student')(
  async ({ user }) => {
    return {
      props: {
        user,
      },
    };
  }
);
