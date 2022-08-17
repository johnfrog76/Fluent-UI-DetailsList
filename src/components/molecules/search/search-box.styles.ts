import { mergeStyleSets } from "@fluentui/react";

export const styles = mergeStyleSets({
  section: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: '16px',
  },
  iconbutton: {
    color: 'inherit',
    ':disabled': {
      backgroundColor: 'transparent',
      cursor: 'not-allowed',
    },
    ':hover, :active': {
      backgroundColor: 'transparent',
      color: '#0078d4',
    },
    ':focus': {
      borderColor: 'transparent',
    }
  },
  searchwrap: {
    position: 'relative',
    width: '100%',
  },
  actionsWrapper: {
    width: '64px',
    position: 'absolute',
    bottom: '0',
    right: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textinput: {
    input: {
      paddingRight: "100px",
    },
  },
  activeSearchLabel: {
    backgroundColor: '#ccc',
    color: 'inherit',
    padding: '0.25rem 0.75rem',
  }
});
