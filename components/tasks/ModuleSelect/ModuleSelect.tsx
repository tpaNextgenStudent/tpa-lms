import styles from './ModuleSelect.module.scss';
import { Module } from '../../../lib/mocks';

interface ModuleSelectProps {
  modules: Module[];
}

export const ModuleSelect = ({ modules }: ModuleSelectProps) => {
  return (
    <select
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
