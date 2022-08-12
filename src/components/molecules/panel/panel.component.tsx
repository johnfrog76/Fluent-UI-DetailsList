import { FC, useState, useEffect } from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { PrimaryButton, DefaultButton } from "@fluentui/react";
import { statusItems, formatEarningsField, formatDateField } from './panel.util';
import { buttonStyles, errorLabelStyle } from './panel.styles';
import CustomInput, { InputTypes } from "../../atoms/input/custom-input.component";
import { iCompanyItem } from '../../../models/company/company';

interface Props {
  isOpen: boolean;
  headerText: string;
  onDismiss: () => void;
  item: iCompanyItem;
  onSubmit: (item: iCompanyItem) => void;
}

const CustomPanelComponent: FC<Props> = ({ isOpen, onDismiss, onSubmit, headerText, item }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [titleText, setTitleText] = useState<string>('');
  const [formObj, setFormObj] = useState<iCompanyItem | null>(null)
  const onCancel = () => {
    setFormObj(null);
    setIsDirty(false);
    onDismiss();
  }

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

  const handleSubmit = () => {
    onSubmit(formObj)
    setFormObj(null);
    setIsDirty(false);
    onDismiss();
  }


  const onRenderFooter = () => (
    <>
      <PrimaryButton
          disabled={!isDirty}
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
            maxLength={35}
            value={formObj?.column1}
            onChange={(evt) => handleChange(evt)}
            onKeyUp={(evt) => setTitleText(evt.target.value)}
          />
          {
            titleText?.length >= 35 && (
              <label
                className={errorLabelStyle.errorlabel}
                htmlFor="column1Input"
              >Max length of 35 characters</label>
            )
          }
          <CustomInput
            type={InputTypes.TEXTFIELD}
            label="CEO"
            name="column2"
            value={formObj?.column2}
            onChange={(evt) => handleChange(evt)}
          />
          <CustomInput
            type={InputTypes.TEXTFIELD}
            label="Earnings"
            name="column3"
            disabled
            value={formatEarningsField(formObj?.column3)}
            onChange={(evt) => handleChange(evt)}
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
              defaultSelectedKey={formObj?.column5}
              onChange={(evt) => handleChange(evt)}
            />
            )
          }
        </div>
      </Panel>
    </>
  )
}

export default CustomPanelComponent;