import {
  DatePicker,
  mergeStyles,
  defaultDatePickerStrings
} from "@fluentui/react";


const styles = mergeStyles({
  maxWidth: '100%',
});


const CustomDatePickerComponent = ({handleChange, ...otherProps}) => {
  return (
    <div className={styles}>
      <DatePicker
        {...otherProps}
        ariaLabel="Select a date"
        strings={defaultDatePickerStrings}
        onSelectDate={(value) => handleChange(value)}
      />
    </div>
  );
};
export default CustomDatePickerComponent;