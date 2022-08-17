import { useContext } from 'react';
import {styles} from './main-page.styles';
import {ThemeContext, ThemeEnum } from '../../providers/theme/theme.provider';
import TableComponent from '../../components/molecules/table/table.component';
import CustomButtonComponent from '../../components/atoms/custom-button/custom-button.component';

const MainPageComponent = () => {
  const {currentTheme, setCurrentTheme} = useContext(ThemeContext)
  const handleClick = () => {
    if (currentTheme === ThemeEnum.Dark) {
      setCurrentTheme(ThemeEnum.Light);
    } else {
     setCurrentTheme(ThemeEnum.Dark);
    }
  };
 
  return (
    <div className={styles.container}>
      <CustomButtonComponent
        text={currentTheme === ThemeEnum.Dark ? 'Light Theme' : 'Dark Theme'}
        iconName={currentTheme === ThemeEnum.Dark ? 'Sunny' : 'ClearNight'}
        handleClick={() => handleClick()}
      />
      <TableComponent />
    </div>
  );  
}
  

export default MainPageComponent;