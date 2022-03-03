import styles from './TaskSection.module.scss';
import { Module, Task, UserTask } from '../../../lib/mocks';
import { TaskDescription } from '../TaskDescription/TaskDescription';
import { TaskAction } from '../TaskAction/TaskAction';

interface TaskSectionProps {
  task: UserTask & { task: Task };
  module: Module;
}

const desc = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat vitae nisi lobortis venenatis. Praesent suscipit facilisis arcu, at malesuada mi facilisis eu. Suspendisse vehicula mauris ultricies tellus rutrum tristique. In tincidunt orci at lectus euismod faucibus. Sed enim urna, venenatis eu pretium viverra, pellentesque sed sem. Aliquam ut mollis nulla, at lobortis est. Quisque in accumsan ligula. Proin pharetra sed odio eu aliquet. Aliquam a risus sem. Nulla eleifend arcu at odio tincidunt, vitae sagittis risus molestie. Integer rhoncus purus sit amet tellus pulvinar pretium.

Donec suscipit bibendum neque, et molestie nibh fermentum non. Phasellus posuere massa nec ornare varius. Quisque ac sapien porta lacus malesuada venenatis ac vel massa. Curabitur auctor faucibus tortor, at blandit turpis pretium nec. In quis vulputate nulla. Sed pellentesque pellentesque mi ac sagittis. Nulla sodales egestas leo, quis luctus ipsum faucibus in. Integer posuere nulla in turpis ornare, at porta dui faucibus. Nulla facilisi. Maecenas in tortor quis risus interdum congue non id quam.

Suspendisse vel velit id arcu auctor auctor. Donec tincidunt magna quis lacus congue rhoncus nec non augue. Phasellus rhoncus sapien sed ipsum rutrum, vel mattis lectus auctor. Integer accumsan augue dui, eget feugiat dolor convallis ut. Donec porttitor maximus pharetra. Fusce luctus sapien non pulvinar bibendum. Fusce et lorem orci. Nulla mollis odio eu congue ultricies. Quisque sed urna libero. Pellentesque in ornare mauris. Aliquam vehicula ex lectus, vel malesuada nunc facilisis ut. Quisque risus arcu, convallis quis consequat bibendum, egestas a sem. Sed dapibus ut purus in malesuada. Phasellus diam turpis, vestibulum id vehicula at, gravida eu libero.

Mauris lacinia, nisi non lacinia faucibus, nisi nisl elementum libero, in iaculis nibh arcu sit amet mi. Suspendisse vitae velit non felis tincidunt tempor. Morbi dictum facilisis turpis, a tempor neque vestibulum eu. Vestibulum sit amet enim sed elit mollis consequat vitae nec urna. Aliquam ultrices dignissim libero. Quisque vel lorem malesuada, posuere mi ac, tristique enim. Phasellus luctus libero sed gravida ullamcorper. Vestibulum libero justo, lacinia ut rutrum a, maximus sit amet sem. Sed malesuada pellentesque tellus ut molestie. Phasellus vel sagittis arcu. Duis blandit sollicitudin ante, id venenatis libero maximus non.
`;

export const TaskSection = ({
  task: { task, status },
  module,
}: TaskSectionProps) => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.taskHeader}>
        <span className={styles.taskTitleIcon} aria-hidden={true} />
        <h2 className={styles.taskTitle}>{task.name}</h2>
        <span className={styles.taskModule}>{module.name}</span>
        <button className={styles.fullScreenButton}>full</button>
      </div>
      <div className={styles.taskBadges}>
        <span className={styles.taskBadge}>{status}</span>
        <span className={styles.taskBadge}>{task.type}</span>
      </div>
      <TaskDescription description={desc} />
      <TaskAction task={task} />
    </main>
  );
};
