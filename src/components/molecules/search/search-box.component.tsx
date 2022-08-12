import { FC, useState, useEffect } from "react";
import { IconButton, Stack } from "@fluentui/react";
import CustomInput, { InputTypes } from "../../atoms/input/custom-input.component";

import { styles } from "./search-box.styles";

const containerStackTokens = { childrenGap: 10 };

interface Props {
  placeholder: string;
  search: (value: string) => void;
  reset: boolean
}

const RequestFilterSearchBox: FC<Props> = ({ search, placeholder, reset }) => {
  const [value, setValue] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const resetSearch = () => {
    setValue('');
    search('');
    setCurrentSearch('');
    setSubmitDisabled(false);
  };

  const focusResetSearch = () => {
    search('');
    setCurrentSearch('');
    if (value?.length > 0) {
      setSubmitDisabled(false);
    }
  }

  const handleSubmitSearch = () => {
    setCurrentSearch(value);
    search(value);
    setSubmitDisabled(true);
  };

  useEffect(() => {
    if (reset===true) {
      setSubmitDisabled(false);
      setCurrentSearch('');
      setValue('')
    }
    
  }, [reset]);

  return (
    <Stack tokens={containerStackTokens} className={styles.section} horizontal>
      <Stack className={styles.searchwrap}>
        <CustomInput
          type={InputTypes.TEXTFIELD}
          className={styles.textinput}
          name='search'
          label={currentSearch !== '' ? (
            <span className={styles.activeSearchLabel}>{`Searching "${currentSearch}"`}</span>
          ) : 'Enter Search Text'}
          value={value}
          placeholder={placeholder}
          onKeyPress={(evt) => {
            const pressedEnter = evt.key === "Enter";
            if (pressedEnter) {
              handleSubmitSearch();
              evt.target.blur();
            }
          }}
          onChange={(evt) => setValue(evt.target.value)}
          onFocus={() => focusResetSearch()}
        />
        <Stack className={styles.actionsWrapper}>
          {
            value?.length > 0 && (
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
            disabled={value === '' || submitDisabled}
            title="Search"
            onClick={() => handleSubmitSearch()}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RequestFilterSearchBox;