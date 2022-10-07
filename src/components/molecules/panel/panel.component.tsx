import { FC, useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { PrimaryButton, DefaultButton, Label, useTheme, mergeStyleSets } from "@fluentui/react";
import { ThemeContext, ThemeEnum } from '../../../providers/theme/theme.provider';
import { statusItems, formatEarningsField, currencyStringToNumber } from './panel.util';
import { buttonStyles } from './panel.styles';
import CustomInput, { InputTypes } from "../../atoms/input/custom-input.component";
import { iCompanyItem } from '../../../models/company/company';

interface Props {
  isOpen: boolean;
  headerText: string;
  onDismiss: () => void;
  item: iCompanyItem;
  onSubmit: (item: iCompanyItem) => void;
}

export const getEmptyCompanyItem = ():iCompanyItem => {
  return {
    column1: '',
    column2: '',
    column3: 200000,
    column4: new Date().getTime(),
    column5: 6,
    id: uuidv4()  
  }
}

const CustomPanelComponent: FC<Props> = ({ isOpen, onDismiss, onSubmit, headerText, item }) => {
  const [hasError, setHasError] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [fieldIsDirty, setFieldDirty] = useState({});
  const [titleText, setTitleText] = useState<string>('');
  const [formObj, setFormObj] = useState<iCompanyItem | null>(null)
  const onCancel = () => {
    setFormObj(null);
    setIsDirty(false);
    setFieldDirty({})
    onDismiss();
  }
  const {palette} = useTheme();
  const { currentTheme } = useContext(ThemeContext);

  const errorColor = currentTheme === ThemeEnum.Dark ? palette['red'] : palette['redDark'];
  const errorStyle = {root: {color: errorColor}};

  const handleBlur = (evt) => {
    let key = evt.target.name;
    if (key)  {
       setFieldDirty({
         ...fieldIsDirty,
         [key]: !formObj[key] || formObj[key] === ''
       }) 
    }
  };

  const handleChange = (evt) => {
    const { name, value, type} = evt.target;
    
    setIsDirty(true);

    if (type === 'dropdown') {
      if (formObj) {
        setFormObj({...formObj, [name]: value.key})
      } else {
        setFormObj({...item, [name]: value.key})
      }
    } else {
      if (formObj) {
        setFormObj({...formObj, [name]: value})        
      } else {
        setFormObj({...item, [name]: value})
      }
    }
  };

  useEffect(() => {
    if(!formObj && isOpen && !isDirty) {
      setFormObj({...item})
      setTitleText(item.column1)
    }
  }, [isOpen]);

  useEffect(() => {
    let tempError = false;
    for (let foo in fieldIsDirty) {
      if (fieldIsDirty[foo] === true) {
        tempError = true;
        break;
      }
    }
   setHasError(tempError)
  }, [fieldIsDirty]);

  const handleSubmit = () => {
    onSubmit(formObj);
    setFormObj(null);
    setIsDirty(false);
    setFieldDirty({});
    onDismiss();
  }


  const onRenderFooter = () => (
    <>
      <PrimaryButton
          disabled={!isDirty || hasError}
          styles={buttonStyles}
          onClick={() => handleSubmit()}
          text="Save"
      />
      <DefaultButton
        text="Cancel"
        onClick={() => onCancel()} />
    </>
  );

  return (
    <>
      <Panel
        isOpen={isOpen}
        onDismiss={() => onDismiss()}
        type={PanelType.medium}
        headerText={ titleText ? `${headerText} for ${titleText}` : headerText}
        onRenderFooterContent={() => onRenderFooter()}
        isFooterAtBottom={true}
      >
        <div>
          <CustomInput
            type={InputTypes.TEXTFIELD}
            label="Company"
            id="column1Input"
            name="column1"
            required={true}
            maxLength={35}
            value={formObj?.column1}
            onChange={(evt) => handleChange(evt)}
            onKeyUp={(evt) => setTitleText(evt.target.value)}
            onBlur={(evt) => handleBlur(evt)}
          />
          {
            titleText?.length >= 35 && (
              <Label
                styles={errorStyle}
                htmlFor="column1Input"
              >Max length of 35 characters</Label>
            )
          }
          {
            fieldIsDirty['column1'] && (
              <Label
                styles={errorStyle}
                htmlFor="column1Input"
              >Required</Label>
            )
          }
          <CustomInput
            type={InputTypes.TEXTFIELD}
            label="CEO"
            id="column2Input"
            required={true}
            name="column2"
            value={formObj?.column2}
            onChange={(evt) => handleChange(evt)}
            onBlur={(evt) => handleBlur(evt)}
          />
          {
            fieldIsDirty['column2'] && (
              <Label
                htmlFor="column2Input"
                styles={errorStyle}
              >Required</Label>
            )
          }
          <CustomInput
            type={InputTypes.TEXTFIELD}
            label="Earnings"
            name="column3"
            value={formatEarningsField(formObj?.column3)}
            onChange={(evt) => {
              evt.target.value = currencyStringToNumber(evt.target.value || 0);
              handleChange(evt);
            }}
          />
          <CustomInput
            type={InputTypes.DATEPICKER}
            label="Date"
            name="column4"
            value={new Date(formObj?.column4)}
            onChange={(evt) => handleChange(evt)}
          />
          { formObj?.column5 && (
            <CustomInput
              type={InputTypes.DROPDOWN}
              label="Status"
              name="column5"
              options={statusItems}
              defaultSelectedKey={formObj.column5}
              onChange={(evt) => {
                evt.target.name = 'column5';
                handleChange(evt)
              }}
            />
            )
          }
        </div>
      </Panel>
    </>
  )
}

export default CustomPanelComponent;