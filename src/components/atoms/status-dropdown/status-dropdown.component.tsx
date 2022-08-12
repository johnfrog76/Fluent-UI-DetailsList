
import { FC } from "react";
import { IconButton } from "@fluentui/react";
import CustomInput, { InputTypes } from "../input/custom-input.component";
import { recordStatusEnum } from "../../../models/company/company";
import { styles } from './status-dropdown.styles';

const statusItems = Object.keys(recordStatusEnum).filter(k => !isNaN(Number(k))).map(item => {
  return {key: Number(item), text: recordStatusEnum[Number(item)]}
});

statusItems.unshift({key: -1, text: 'select status'});

interface Props {
  label?: string;
  handleChange: (evt) => void;
  currentValue: number;
  onClearValue: () => void;
}


const StatusDropdownComponent:FC<Props> = ({label = undefined, handleChange, currentValue, onClearValue }) => {
  
  return (
    <div className={styles.wrapper}>
      <CustomInput
        type={InputTypes.DROPDOWN}
        label={label}
        name="column5"
        options={statusItems}
        selectedKey={currentValue}
        onChange={(evt) => handleChange(evt)}
        notifyOnReselect={true}
      />
      { currentValue !== -1 && (<IconButton onClick={() => onClearValue()} iconProps={{ iconName: "cancel" }} />)}
      
    </div>
  )
}

export default StatusDropdownComponent;