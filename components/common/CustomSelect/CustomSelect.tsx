import styles from './CustomSelect.module.scss';
import colors from '../../../lib/styles/variables/colors.module.scss';
import fonts from '../../../lib/styles/variables/fonts.module.scss';
import ArrowDownIcon from '../../../public/svg/arrow-down.svg';

import Select, {
  SingleValue,
  StylesConfig,
  components,
  DropdownIndicatorProps,
} from 'react-select';

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
    flexWrap: 'nowrap',
    height: '48px',
    boxShadow: 'none',
    transition: 'none',
    border: state.isFocused
      ? `1px solid ${colors.purplePrimary}`
      : `1px solid ${colors.strokeMain}`,
    borderBottom: state.menuIsOpen
      ? '0'
      : `1px solid ${
          state.isFocused ? colors.purplePrimary : colors.strokeMain
        }`,
    margin: 0,
    minWidth: '108px',
    width: '100%',
    ':hover': {
      border: `1px solid ${colors.purplePrimary}`,
      borderBottom: !state.menuIsOpen ? `1px solid ${colors.purplePrimary}` : 0,
      backgroundColor: colors.bgTable,
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    overflow: 'hidden',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontWeight: fonts.weightRegular,
    padding: '8px 0 8px 16px',
    fontSize: '12px',
    lineHeight: '24px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
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
    border: `1px solid ${colors.purplePrimary}`,
    borderTop: 0,
    position: 'absolute',
    '::before': {
      content: "''",
      position: 'absolute',
      width: 'calc(100% - 32px)',
      height: '1px',
      backgroundColor: colors.strokeMain,
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1,
    },
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
    fontWeight: fonts.weightMedium,
    fontSize: '12px',
    lineHeight: '24px',
    color: colors.fontPrimary,
    backgroundColor: colors.white,
    position: 'relative',
    ':hover': {
      backgroundColor: colors.bgTable,
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

interface CustomSelectProps {
  options: OptionType[];
  value: OptionType;
  handleChange: (value: SingleValue<OptionType>) => void;
}

const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDownIcon />
    </components.DropdownIndicator>
  );
};

export const CustomSelect = ({
  options,
  value,
  handleChange,
}: CustomSelectProps) => {
  return (
    <div data-cypress="CustomSelect" className={styles.wrapper}>
      <Select
        instanceId="module-select"
        onChange={handleChange}
        value={value}
        options={options}
        styles={customStyles}
        components={{ DropdownIndicator }}
        isSearchable={false}
        hideSelectedOptions
      />
    </div>
  );
};
