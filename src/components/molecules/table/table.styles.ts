import { mergeStyleSets } from "@fluentui/react";

export const styles = mergeStyleSets({
  tableHeading: {
    fontWeight: 'normal',
    color: '#333'
  },
  listStyle: {
    height: 'auto',
    boxShadow: "rgb(0 0 0 / 13%) 0px 0px 1px 1px",
    backgroundColor: "#fff",
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
  addButtonWrap: {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersWrapper: {
    border: '1px solid green',
    width: '50%',
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
      flex: '0 0 200px',
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