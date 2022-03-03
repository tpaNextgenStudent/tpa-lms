import styles from './ModuleSelect.module.scss';
import { Module } from '../../../lib/mocks';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

interface ModuleSelectProps {
  modules: Module[];
}

export const ModuleSelect = ({ modules }: ModuleSelectProps) => {
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/tasks/${e.target.value}`);
  };

  return (
    <select
      onChange={handleChange}
      className={styles.moduleSelect}
      defaultValue={module.id}
      name="module-select"
      id="module-select"
    >
      {modules.map(m => (
        <option key={m.id} value={m.id}>
          {m.name}
        </option>
      ))}
    </select>
  );
};
