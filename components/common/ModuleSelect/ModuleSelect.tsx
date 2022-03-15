import styles from './ModuleSelect.module.scss';
import { Module } from '../../../lib/utils/types';
import { ChangeEvent } from 'react';

interface ModuleSelectProps {
  modules: Module[];
  module: Module;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const ModuleSelect = ({
  modules,
  module,
  handleChange,
}: ModuleSelectProps) => {
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
