import { FC, useState, useEffect, useContext, CSSProperties } from "react";
import { IconButton, Stack, SearchBox, ISearchBoxProps, useTheme, Label } from "@fluentui/react";
import CustomInput, { InputTypes } from "../../atoms/input/custom-input.component";

import { styles } from "./search-box.styles";
const partial = {field:{ fontSize: '16px'}};

const containerStackTokens = { childrenGap: 10 };

interface Props {
  placeholder: string;
  search: (searchQuery: string) => void;
  reset: boolean,
  labelText: string;
  showSearchButton?: boolean 
}

const RequestFilterSearchBox: FC<Props> = ({ search, placeholder, reset, labelText, showSearchButton = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  
  const {palette} = useTheme();
  const tabStyle: CSSProperties = {
    backgroundColor: palette['themeDarkAlt'],
    color: palette['white']
  };

  const resetSearch = () => {
    setSearchQuery('');
    search('');
    setCurrentSearch('');
    setSubmitDisabled(false);
  };

  const focusResetSearch = () => {
    search('');
    setCurrentSearch('');
    if (searchQuery?.length > 0) {
      setSubmitDisabled(false);
    }
  }

  const handleSubmitSearch = () => {
    setCurrentSearch(searchQuery);
    search(searchQuery);
    setSubmitDisabled(true);
  };

  useEffect(() => {
    if (reset===true) {
      setSubmitDisabled(false);
      setCurrentSearch('');
      setSearchQuery('')
    }
    
  }, [reset]);
  
  return (
    <Stack tokens={containerStackTokens} style={{width: '100%'}} className={styles.section} horizontal>
      { !showSearchButton ? (
      <Stack className={styles.searchwrap}>

        <Label htmlFor="searchBox1">{currentSearch !== '' ? (
            <span className={styles.activeSearchLabel} style={tabStyle}>{`Searching "${currentSearch}"`}</span>
          ) : labelText }</Label>
        <SearchBox
          id="searchBox1"
          styles={partial}
          placeholder={ placeholder }
          onSearch={() => handleSubmitSearch()}
          onChange={(evt) => {
            if (evt) {
              setSearchQuery(evt.target.value)
            } else {
              setSearchQuery('')
            }
          }}
          value={searchQuery}
          onClear={() => resetSearch()}
          defaultValue={searchQuery}
        />
      </Stack>
      
      ) : (
      <Stack className={styles.searchwrap}>
         <CustomInput
           type={InputTypes.TEXTFIELD}
           className={styles.textinput}
              name='search'
              label={currentSearch !== '' ? (
            <span className={styles.activeSearchLabel} style={tabStyle}>{`Searching "${currentSearch}"`}</span>
          ) : labelText }
           value={searchQuery}
           placeholder={placeholder}
           onKeyPress={(evt) => {
             const pressedEnter = evt.key === "Enter";
             if (pressedEnter) {
               handleSubmitSearch();
               evt.target.blur();
             }
           }}
           onChange={(evt) => setSearchQuery(evt.target.value)}
           onFocus={() => focusResetSearch()}
         />
         <Stack className={styles.actionsWrapper}>
           {
             searchQuery?.length > 0 && (
               <IconButton
                 className={styles.iconbutton}
                 ariaLabel="clear search"
                 iconProps={{ iconName: "cancel" }}
                 title="Clear Search"
                 onClick={() => resetSearch()}
               />
             )
           }
           <IconButton
             className={styles.iconbutton}
             ariaLabel="search"
             iconProps={{ iconName: "search" }}
             disabled={searchQuery === '' || submitDisabled}
             title="Search"
             onClick={() => handleSubmitSearch()}
           />
         </Stack>
      </Stack>
      )
    }
    </Stack>
  );
};

export default RequestFilterSearchBox;