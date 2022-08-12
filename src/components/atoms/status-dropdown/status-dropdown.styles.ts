import { mergeStyleSets } from "@fluentui/react";

export const styles = mergeStyleSets({ 
  wrapper: { 
    display: 'flex',
    alignItems: 'flex-end',
    '& > div:last-child': {
      flex: '0 0 20px',     
    },
    '& > div:first-child': {
      flex: '1',     
    },
}});