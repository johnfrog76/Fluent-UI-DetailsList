import { mergeStyleSets, DefaultPalette, ISpinnerProps } from "@fluentui/react";

export const styles = mergeStyleSets({
  tableHeading: {
    fontWeight: 'normal',
  },
  listStyle: {
    height: 'auto',
    boxShadow: "rgb(0 0 0 / 13%) 0px 0px 1px 1px",
    backgroundColor: "transparent",
    padding: "0",
    overflowY: "auto",
    overflowX: "auto",
    "::-webkit-scrollbar": {
      width: "5px",
      height: "5px",
      "& > div": {
        minWidth: "900px",
        borderRight: "1px solid #efefef",
      }
    },
    "::-webkit-scrollbar-track": {
      background: '#f2f2f2',
      height: '5px',
      width: '5px',
    },
    "::-webkit-scrollbar-thumb": {
      height: "5px",
      width: "5px",
      border: '0',
      ":hover": {
        backgroundColor: '#555',
      },
      backgroundColor: "#999",
      borderRadius: "0",
    },
  },
  pill: {
    backgroundColor: 'white',
    color: '#333',
    fontSize: '12px',
    lineHeight: '24px',
    padding: '0.15rem 0.25rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  tableToolbar: {
    "@media(max-width: 767px)": {
      display: 'block',
    },
  },
  addButtonWrap: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: '1rem',
    "@media(max-width: 767px)": {
      display: 'block',
      paddingLeft: '0',
      marginBottom: '1.5rem',
      button: {
        width: '100%',
        '> span > span': {
          flexGrow: 'unset'
        }
      },
    },
  },
  filtersWrapper: {
    width: '60%',
    "@media(max-width: 767px)": {
      width: '100%',
    },
    display: 'flex',
    alignItems: 'flex-start',
    margin: '0 0 0.5rem 0',
    '&> div:first-child': {
      flex: '1',
    },
    '&> div:last-child': {
      flex: '0 1 150px',
      marginLeft: '1rem',
    }
  }
});

export const spinnerStyles: Partial<ISpinnerProps> = {
  root: {},
  circle: {
    borderColor: 'teal #00808063 #00808063',
    borderWidth: '0.25rem',
    width: '3rem',
    height: '3rem'
  },
  label: {
    color: 'teal',
    fontSize: '1rem',
    fontWeight: '600'
  }
}