import { FC, useState, useEffect, useContext } from "react";
import { MessageBar, MessageBarType, IMessageBarProps, IMessageBarStyles, useTheme } from "@fluentui/react";
import {styles} from './message.styles';
import {ThemeContext, ThemeEnum} from '../../../providers/theme/theme.provider';

interface Props {
  type: MessageBarType ;
  text: string;
  onClose: () => void;
  closeDelay: number;
}

const MessageBarComponent:FC<Props> = ({type, text, onClose, closeDelay=6}) => {
  const [delay, setDelay] = useState<number>(closeDelay * 1000);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const {palette} = useTheme();
  const {currentTheme} = useContext(ThemeContext);

  const partial:IMessageBarStyles = {
    root: {
      position: 'absolute',
      top: '0',
      left: '0',
      padding: '1.2rem 1rem',
      boxSizing: 'border-box',
      width: '100%',
      backgroundColor: currentTheme === ThemeEnum.Light ? 
          palette['green'] : palette['greenLight'],
      color: palette['white'],
      i: {
        color: palette['white'] + '!important',
      },
      span: {
        fontSize: '16px'
      }
    },
  }

  const handleClose = () => {
    setShowMessage(false);
    onClose();
  };

  useEffect(() => {
      setShowMessage(true);
    let t = setTimeout(() => {
      clearTimeout(t);
      setShowMessage(false);
    }, delay);
  }, [delay])
    
    return (
      <>
        {showMessage && (
          <MessageBar 
            isMultiline = {false}
            messageBarType={MessageBarType[type]}
            onDismiss={() => handleClose()}
            styles={partial}
          >{text}</MessageBar>        
        )  
      }
    </>
  );
}

export default MessageBarComponent
