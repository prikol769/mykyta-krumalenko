import React from 'react';
import './FormInput.scss';

const FormInput = ({placeholder, name, type, label, errorMessage, ...rest}) => {
    return (
        <div className="input__wrapper">
            <label className="input__wrapper__label">{label}</label>
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                {...rest}
            />
            {errorMessage ? <p className="input__wrapper__error">{errorMessage}</p> : null}
        </div>
    );
};

export default FormInput;
