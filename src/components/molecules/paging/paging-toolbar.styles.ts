import { mergeStyleSets, DefaultPalette } from "@fluentui/react";

export const styles = mergeStyleSets({
  toolbar: {
    height: '50px',
    alignItems: 'center',
    padding: '0 10px',
  },
  pageindicator: {
    margin: '0 5px',
  },
  footericon: {
    ":first-of-type": {
      marginRight: "0.25rem",
    },
    ":last-of-type": {
      marginLeft: "0.25rem",
    },
    color: 'inherit',
    ':disabled': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      cursor: 'not-allowed',
    }
  },
  pagingcontrols: {
    display: 'flex',
    alignItems: 'center'
  },
  paginglabel: {
    display: 'flex',
    alignItems: 'center',
    "& > span": {
      "@media(max-width: 767px)": {
        width: '60px',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
        overflow: 'hidden',
      },
    },
  },
  dropdownStyles: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px',
    label: {
      margin: '0 5px 0 0',
      fontWeight: 'normal',
      "@media(max-width: 767px)": {
        display: 'none',
      },
    }
  }
});
