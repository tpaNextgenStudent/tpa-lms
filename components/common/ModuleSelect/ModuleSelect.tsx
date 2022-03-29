import styles from './ModuleSelect.module.scss';
import { Module } from '../../../lib/utils/types';
import colors from '../../../lib/styles/variables/colors.module.scss';
import ArrowDownIcon from '../../../public/arrow-down.svg';

import Select, {
  SingleValue,
  StylesConfig,
  components,
  DropdownIndicatorProps,
} from 'react-select';
import { IModule } from '../../../api/modules';

export type OptionType = {
  label: string;
  value: string;
};

type IsMulti = false;

const customStyles: StylesConfig<OptionType, IsMulti> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: state.menuIsOpen ? '0' : '64px',
    borderTopLeftRadius: state.menuIsOpen ? '24px' : '64px',
    borderTopRightRadius: state.menuIsOpen ? '24px' : '64px',
    border: `1px solid ${colors.strokeMain}`,
    borderBottom: state.menuIsOpen ? '0' : `1px solid ${colors.strokeMain}`,
    height: '48px',
    margin: 0,
    minWidth: '108px',
    width: '100%',
    ':hover': {
      border: `1px solid ${colors.strokeMain}`,
      borderBottom: state.menuIsOpen ? '0' : `1px solid ${colors.strokeMain}`,
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontWeight: 400,
    padding: '8px 0 8px 16px',
    fontSize: '12px',
    lineHeight: '24px',
    color: colors.fontPrimary,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    padding: '0 16px',
  }),
  menu: (provided, state) => ({
    ...provided,
    minWidth: '108px',
    width: '100%',
    margin: 0,
    borderRadius: 0,
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px',
    boxShadow: 'none',
    border: `1px solid ${colors.strokeMain}`,
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px',
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '12px 16px',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '24px',
    color: colors.fontPrimary,
    backgroundColor: colors.white,
    position: 'relative',
    ':hover': {
      backgroundColor: colors.purpleSecondary,
    },
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      width: 'calc(100% - 8px)',
      transform: 'translateX(-50%)',
      height: '1px',
      backgroundColor: colors.purpleSecondary,
    },
    ':first-child': {
      '::before': {
        content: 'none',
      },
    },
  }),
};

interface ModuleSelectProps {
  modules: IModule[];
  module: IModule;
  handleChange: (value: SingleValue<OptionType>) => void;
}

const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDownIcon />
    </components.DropdownIndicator>
  );
};

export const ModuleSelect = ({
  modules,
  module,
  handleChange,
}: ModuleSelectProps) => {
  const selectOptions = modules.map(m => ({ value: m.id, label: m.name }));
  const defaultValue = selectOptions.filter(
    option => option.value === module.id
  );

  return (
    <div className={styles.moduleSelectWrapper}>
      <Select
        instanceId="module-select"
        onChange={handleChange}
        value={defaultValue}
        options={selectOptions}
        styles={customStyles}
        components={{ DropdownIndicator }}
        isSearchable={false}
        hideSelectedOptions
      />
    </div>
  );
};
