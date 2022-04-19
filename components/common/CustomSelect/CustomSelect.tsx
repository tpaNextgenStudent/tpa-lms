import styles from './CustomSelect.module.scss';
import ArrowDownIcon from '../../../public/svg/arrow-down.svg';

import Select, {
  SingleValue,
  components,
  DropdownIndicatorProps,
} from 'react-select';
import clsx from 'clsx';
import { getCustomSelectStyles } from './getCustomSelectStyles';

export type OptionType = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  options: OptionType[];
  value: OptionType;
  handleChange: (value: SingleValue<OptionType>) => void;
  className?: string;
  id: string;
  openSelectToTop?: boolean;
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
  className,
  id,
  openSelectToTop = false,
}: CustomSelectProps) => {
  return (
    <div
      data-cypress="CustomSelect"
      className={clsx(styles.wrapper, className)}
    >
      <Select
        instanceId={id}
        onChange={handleChange}
        value={value}
        options={options}
        styles={getCustomSelectStyles({
          fontWeight: 'medium',
          openSelectToTop,
        })}
        components={{ DropdownIndicator }}
        isSearchable={false}
        hideSelectedOptions
        menuPlacement={openSelectToTop ? 'top' : 'bottom'}
        inputId={id}
      />
    </div>
  );
};
