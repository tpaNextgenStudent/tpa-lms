import styles from './ModuleSelect.module.scss';
import { Module } from '../../../lib/utils/types';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

interface ModuleSelectProps {
  modules: Module[];
  module: Module;
}

export const ModuleSelect = ({ modules, module }: ModuleSelectProps) => {
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/tasks/${e.target.value}`);
  };

  return (
    <div className={styles.moduleSelectWrapper}>
      <select
        onChange={handleChange}
        className={styles.moduleSelect}
        value={module.id}
        name="module-select"
        id="module-select"
      >
        {modules.map(m => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
};
