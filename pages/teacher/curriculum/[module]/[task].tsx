import { Layout } from '../../../../components/common/Layout/Layout';
import { InferPagePropsType } from '../../../../lib/types';
import { TasksMenu } from '../../../../components/tasks/TasksMenu/TasksMenu';
import styles from '../../../../components/pagesStyles/tasksPage.module.scss';
import { TaskSection } from '../../../../components/tasks/TaskSection/TaskSection';
import { fetchUserTasksByModule } from '../../../../apiHelpers/tasks';
import { fetchUserModules } from '../../../../apiHelpers/modules';
import { withServerSideAuth } from '../../../../lib/auth/withServerSideAuth';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner/LoadingSpinner';

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
    refetch: refetchModules,
    isLoading: isModulesLoading,
  } = useQuery('modules', fetchUserModules);
  const module =
    modules && modules.find(m => m.module_version_id === moduleId)!;

  const {
    data: tasks,
    isLoading: isTasksLoading,
    refetch: refetchTasks,
  } = useQuery(['tasks', moduleId], () => fetchUserTasksByModule(moduleId));
  const task = tasks && tasks.find(t => t.task_data.id === taskId);

  const isLoading = isModulesLoading || isTasksLoading;

  const refetchAll = async () => {
    await refetchModules();
    await refetchTasks();
  };

  return (
    <Layout title="Curriculum" headerTitle="Curriculum" user={user}>
      <div className={styles.tasksWrapper}>
        {modules && module && tasks && task ? (
          <>
            <TasksMenu
              tasksPathPrefix={'/teacher/curriculum'}
              modules={modules}
              module={module}
              tasks={tasks}
              task={task}
            />
            <TaskSection task={task.task_data} module={module} />
          </>
        ) : (
          <LoadingSpinner isLoading={isLoading} refetch={refetchAll} />
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = withServerSideAuth('teacher')(
  async ({ user }) => {
    return {
      props: {
        user,
      },
    };
  }
);
