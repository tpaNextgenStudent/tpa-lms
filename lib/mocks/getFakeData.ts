import { Cohort, Module, Task, User, UserTask } from '../utils/types';

type Data = {
  user: User;
  cohorts: Cohort[];
  modules: Module[];
  tasks: Task[];
  usersTasks: UserTask[];
};

export const getFakeData = async (): Promise<Data> => {
  const res = await fetch('http://localhost:3000/api/fake');
  const data = await res.json();
  return data;
};
