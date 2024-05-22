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
    <div className="admin_login_form_input">
      <div className="admin_login_form_input_logo">
        <span class="material-symbols-outlined">{props.icon_name}</span>
      </div>
      <input
        className={hasError ? "input_error" : ""}
        onChange={(e) => {
          handleChange(name)(e.target.value);
        }}
        value={value}
        {...rest}
        // onBlur={() => {
        //   setFieldValue(name);
        //   onBlur(name);
        // }}
      />
      {hasError && <span className="field_error">{errors[name]}</span>}
    </div>
  );
};

export default CustomeInput;
