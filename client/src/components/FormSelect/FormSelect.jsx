import React from 'react';
import './FormSelect.scss';
const FormSelect = ({value, onChange, label, errorMessage, name, options, ...rest}) => {
    return (
        <div className="select__wrapper">
            <label className="select__wrapper__label">{label}</label>
            <select
                value={value}
                onChange={onChange}
                name={name}
                {...rest}
            >
                <option value={""}> -- select an option -- </option>
                {options.map((option) => (
                <option key={option.title} value={option.value}>{option.title}</option>
            ))}
            </select>
            {errorMessage ? <p className="select__wrapper__error">{errorMessage}</p> : null}
        </div>
    );
};

export default FormSelect;
