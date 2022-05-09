import fonts from '../../../lib/styles/variables/fonts.module.scss';
import { StylesConfig } from 'react-select';
import colors from '../../../lib/styles/variables/colors.module.scss';
import { OptionType } from './CustomSelect';

type IsMulti = false;

export function getCustomSelectStyles({
  fontWeight = 'regular',
  openSelectToTop = false,
}: {
  fontWeight?: 'regular' | 'bold' | 'medium';
  openSelectToTop?: boolean;
}) {
  const fW =
    fontWeight === 'regular'
      ? fonts.weightRegular
      : fontWeight === 'bold'
      ? fonts.weightBold
      : fonts.weightMedium;

  function getBorderRadius(isOpen: boolean, isTop: boolean) {
    if (isTop) {
      return isOpen ? '0 0 16px 16px' : '64px';
    } else {
      return isOpen ? '16px 16px 0 0' : '64px';
    }
  }

  const customStyles: StylesConfig<OptionType, IsMulti> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: getBorderRadius(state.menuIsOpen, openSelectToTop),
      flexWrap: 'nowrap',
      height: '40px',
      boxShadow: 'none',
      transition: 'none',
      border: state.isFocused
        ? `1px solid ${colors.purplePrimary}`
        : `1px solid ${colors.strokeMain}`,
      borderBottom:
        !openSelectToTop && state.menuIsOpen
          ? '0'
          : `1px solid ${
              state.isFocused ? colors.purplePrimary : colors.strokeMain
            }`,
      borderTop:
        openSelectToTop && state.menuIsOpen
          ? '0'
          : `1px solid ${
              state.isFocused ? colors.purplePrimary : colors.strokeMain
            }`,
      margin: 0,
      width: '100%',
      ':hover': {
        border: `1px solid ${colors.purplePrimary}`,
        borderBottom:
          !state.menuIsOpen || openSelectToTop
            ? `1px solid ${colors.purplePrimary}`
            : 0,
        borderTop:
          !state.menuIsOpen || !openSelectToTop
            ? `1px solid ${colors.purplePrimary}`
            : 0,
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
      fontWeight: fW,
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
      padding: `0 8px`,
    }),
    menu: (provided, state) => ({
      ...provided,
      width: '100%',
      margin: 0,
      borderRadius: 0,
      borderBottomLeftRadius: !openSelectToTop ? '16px' : 0,
      borderBottomRightRadius: !openSelectToTop ? '16px' : 0,
      borderTopLeftRadius: openSelectToTop ? '16px' : 0,
      borderTopRightRadius: openSelectToTop ? '16px' : 0,
      boxShadow: 'none',
      border: `1px solid ${colors.purplePrimary}`,
      borderTop: !openSelectToTop ? 0 : `1px solid ${colors.purplePrimary}`,
      borderBottom: openSelectToTop ? 0 : `1px solid ${colors.purplePrimary}`,
      position: 'absolute',
      '::before': openSelectToTop
        ? {
            content: "''",
            position: 'absolute',
            width: 'calc(100% - 16px)',
            height: '1px',
            backgroundColor: colors.strokeMain,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }
        : {
            content: "''",
            position: 'absolute',
            width: 'calc(100% - 16px)',
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
      borderBottomLeftRadius: !openSelectToTop ? '16px' : 0,
      borderBottomRightRadius: !openSelectToTop ? '16px' : 0,
      borderTopLeftRadius: openSelectToTop ? '16px' : 0,
      borderTopRightRadius: openSelectToTop ? '16px' : 0,
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '8px 16px',
      height: '40px',
      fontWeight: fW,
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
        width: 'calc(100% - 16px)',
        transform: 'translateX(-50%)',
        height: '1px',
        backgroundColor: colors.purpleSecondary,
      },
      ':first-of-type': {
        '::before': {
          content: 'none',
        },
      },
    }),
  };
  return customStyles;
}
