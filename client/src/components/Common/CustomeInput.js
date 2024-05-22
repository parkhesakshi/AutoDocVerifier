import React from "react";

const CustomeInput = (props) => {
  const {
    field: { name, value, onChange, onBlur },
    form: { errors, touched, setFieldValue },
    label_name,

    handleChange,
    ...rest
  } = props;
  const hasError = errors[name] && touched[name];
  return (
    <div className="form-input mb-2">
      <input
        className={hasError ? "input_error" : ""}
        onChange={(e) => {
          handleChange(name)(e.target.value);
          e.target.value.length !== 0
            ? e.target.classList.add("hasVal")
            : e.target.classList.remove("hasVal");
        }}
        value={value}
        {...rest}
        // onBlur={() => {
        //   setFieldValue(name);
        //   onBlur(name);
        // }}
      />
      <label
        htmlFor={name}
        className={hasError ? "input_label input_label_error" : "input_label"}
      >
        {label_name}
      </label>
      {hasError && <span className="field_error">{errors[name]}</span>}
    </div>
  );
};

export default CustomeInput;
