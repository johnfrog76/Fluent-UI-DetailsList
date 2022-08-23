import { useState, useContext } from "react";

import {
  TextField,
  Dropdown,
  SpinButton,
  Checkbox,
  ComboBox,
  ChoiceGroup,
  useTheme,
} from "@fluentui/react";
import { TooltipHost } from "@fluentui/react/lib/Tooltip";
import CustomDatePickerComponent from '../date-picker/custom-date-picker';
import { ThemeContext, ThemeEnum } from "../../../providers/theme/theme.provider";
export const InputTypes = {
  TEXTFIELD: "textfield",
  DROPDOWN: "dropdown",
  DATEPICKER: "datepicker",
  CHECKBOX: "checkbox",
  COMBOBOX: "combobox",
  SPINBUTTON: "spinbutton",
  FILE: "file",
  CHOICEGROUP: "choicegroup",
  NUMBER: "number"
};

const calloutProps = { gapSpace: 0 };

const CustomInput = ({ type, toolTipInfo, name, onChange, ...otherProps }) => {
  const { palette } = useTheme();
  const { currentTheme } = useContext(ThemeContext);
  const requiredColor = currentTheme === ThemeEnum.Dark ? palette['red'] : palette['darkRed'];
  const requiredStyle = { root: { 'label::after': { color: requiredColor}} };
  const [options, setOptions] = useState([]);

  onChange = onChange ? onChange : () => {};

  const onChangeHandler = async (event, option) => {
    if (option.selected) {
      setOptions((prevOptions) => prevOptions.concat(option));
    } else {
      setOptions((prevOptions) =>
        prevOptions.filter((o) => o.key !== option.key)
      );
    }
    onChange({
      target: {
        value: options,
        name: name,
        type: type,
      },
    });
  };

  const toolTipProps = {
    onRenderContent: () => (
      <div>{toolTipInfo && toolTipInfo.map((t) => <div key={t}>{t}</div>)}</div>
    ),
  };

  let inputItem;

  if (type === "textfield") {
    inputItem = (
      <TextField
        {...otherProps}
        styles={requiredStyle}
        name={name}
        onChange={(e) =>
          onChange({
            target: { type: type, value: e.target.value, name: name },
          })
        }
      />
    );
  } else if (type === "dropdown") {
    inputItem = (
      <Dropdown
        {...otherProps}
        name={name}
        onChange={(e, item) =>
          onChange({ target: { type: type, value: item, name: name } })
        }
      />
    );
  } else if (type === "datepicker") {
    inputItem = (
      <CustomDatePickerComponent
        {...otherProps}
        name={name}
        handleChange={(value) =>
          onChange({ target: { value: value, type: type, name: name } })
        }
      />
    );
  } else if (type === "spinbutton") {
    inputItem = (
      <SpinButton
        {...otherProps}
        name={name}
        onChange={(e, item) =>
          onChange({ target: { type: type, value: item, name: name } })
        }
      />
    );
  } else if (type === "checkbox") {
    inputItem = (
      <Checkbox
        {...otherProps}
        name={name}
        onChange={(e, item) =>
          onChange({ target: { type: type, value: !!item, name: name } })
        }
      />
    );
  } else if (type === "combobox") {
    inputItem = (
      <ComboBox {...otherProps} name={name} onChange={onChangeHandler} />
    );
  } else if (type == "file") {
    inputItem = (
      <div>
        <input type="file" {...otherProps} name={name} onChange={onChange} />
      </div>
    );
  } else if (type === "choicegroup") {
    inputItem = (
      <ChoiceGroup
        {...otherProps}
        name={name}
        onChange={(e, item) => {
          onChange({
            target: {
              type: type,
              value: item.key,
              name: name,
            },
          });
        }}
      />
    );
  } else if(type === InputTypes.NUMBER) {
    inputItem = (
      <TextField type={InputTypes.NUMBER} name={name} onChange={onChange} {...otherProps} />
    );
  }

  return toolTipInfo ? (
    <TooltipHost calloutProps={calloutProps} tooltipProps={toolTipProps}>
      {inputItem}
    </TooltipHost>
  ) : (
    inputItem
  );
};

export default CustomInput;
