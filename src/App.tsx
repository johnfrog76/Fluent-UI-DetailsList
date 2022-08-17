import MainPageComponent from './pages/main/main-page.component';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import MyTheme from './providers/theme/theme.provider';
import './styles.css';



export default function App() {
  initializeIcons('https://static2.sharepointonline.com/files/fabric/assets/icons/')
  return (

      <MyTheme>
        <MainPageComponent />
      </MyTheme>
  )
}