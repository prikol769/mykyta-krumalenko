import React, {useState} from 'react';
import './AccountForm.scss';
import {FormInput, FormSelect} from '../index';
import {createAcc} from '../../utils/fetchApi';
import {useGlobalContext} from '../../context/GlobalContext';
import {useNavigate} from 'react-router';

const AccountForm = () => {
    const {setIsAccSuccess} = useGlobalContext();
    const navigate = useNavigate();

    const initialAccState = {
        fields: {
            startDate: "",
            endDate: "",
            citizenShip: "",
            age: "",
            mailingState: "",
            policyMax: "",
        },
        errors: {
            startDate: "",
            endDate: "",
            citizenShip: "",
            age: "",
            mailingState: "",
            policyMax: "",
        }
    }
    const [account, setAccount] = useState(initialAccState);
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(account, 'account')
    console.log(errMessage, 'errMessage')

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let errors = {}

        errors[name] = "";
        if (name === "startDate" && account.fields.endDate) {
            errors["startDate"] = "";
            errors["endDate"] = "";
        }

        setAccount({
            fields: {...account.fields, [name]: value},
            errors: {...account.errors, ...errors},
        });
    }

    const submitAccForm = async (e) => {
        e.preventDefault();
        if(validation()){
            setLoading(true);
            try{
                const ageFromYear = new Date().getFullYear() - account.fields.age;

                const res = await createAcc({
                    ...account.fields,
                    startDate: new Date(account.fields.startDate),
                    endDate: new Date(account.fields.endDate),
                    age: account.fields.age.length > 3 ? ageFromYear.toString() : account.fields.age,
                });
                if (res.success) {
                    setIsAccSuccess(true);
                    setLoading(false);
                    resetForm(e);
                    navigate(`/plans`);
                } else {
                    setLoading(false);
                    setErrMessage("Some error occurred");
                }
            }catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
    }

    const resetForm = (e) => {
        e.preventDefault();
        setAccount(initialAccState);
        setErrMessage("");
    }

    const validation = () => {
        let {fields} = account;
        let errors = {}
        let formIsValid = true;

        //All fields mandatory check
        for (let name in fields) {
            if (!fields[name]) {
                formIsValid = false;
                errors[name] = "Cannot be empty";
            }
        }

        //endDate check
        if (fields.endDate
            && fields.startDate
            && new Date(fields.endDate).toISOString() <= new Date(fields?.startDate).toISOString()
        ) {
            formIsValid = false;
            errors["endDate"] = "The end date should be after the start date";
        }

        //citizenShip check
        if (fields.citizenShip && !fields.citizenShip.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["citizenShip"] = "Should not allow numbers or special characters";
        }

        //mailingState check
        if (fields.mailingState && !fields.mailingState.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["mailingState"] = "Should not allow numbers or special characters";
        }

        //ageOrYear check
        const ageFromYear = new Date().getFullYear() - fields.age

        if ((fields.age.length < 4 && fields.age > 100) || (fields.age.length >= 4 && ageFromYear > 100)) {
            formIsValid = false;
            errors["age"] = "You cannot be more than a 100 years old";
        }

        if ((!fields.age.match(/^[0-9]*$/)) || (fields.age.length >= 4 && ageFromYear < 0)) {
            formIsValid = false;
            errors["age"] = "Please enter only birth year or age";
        }

        setAccount({...account, errors: {...account.errors, ...errors}});
        return formIsValid;
    }

    return (
        <form className="acc__form" onSubmit={submitAccForm}>
            <div className="date__container">
                <FormInput
                    name="startDate"
                    placeholder="Start Date"
                    type="date"
                    label="Start Date"
                    value={account.fields.startDate}
                    onChange={handleChange}
                    errorMessage={account.errors.startDate}
                />
                <FormInput
                    name="endDate"
                    placeholder="End Date"
                    type="date"
                    label="End Date"
                    value={account.fields.endDate}
                    onChange={handleChange}
                    errorMessage={account.errors.endDate}
                    // min={account.startDate ? new Date(account.startDate.value).toISOString().split("T")[0]: ""}
                />
            </div>
            <FormSelect
                name="policyMax"
                label="Policy max"
                value={account.fields.policyMax}
                options={selectOptions}
                onChange={handleChange}
                errorMessage={account.errors.policyMax}
                emptyOption
            />
            <FormInput
                name="citizenShip"
                placeholder="Citizenship"
                type="text"
                label="Citizenship"
                value={account.fields.citizenShip}
                onChange={handleChange}
                errorMessage={account.errors.citizenShip}
            />
            <FormInput
                name="age"
                placeholder="Age/Year"
                type="text"
                label="Age/Year"
                value={account.fields.age}
                onChange={handleChange}
                errorMessage={account.errors.age}
            />
            <FormInput
                name="mailingState"
                placeholder="Mailing State"
                type="text"
                label="Mailing State"
                value={account.fields.mailingState}
                onChange={handleChange}
                errorMessage={account.errors.mailingState}
            />
            <div className="btn__container">
                <button className="btn__submit" type="submit">submit</button>
                <button className="btn__reset" onClick={resetForm}>reset</button>
                {errMessage ? <p style={{color: 'red'}}>{errMessage}</p> : null}
                {loading ? <p>...Loading</p> : null}
            </div>
        </form>
    );
};

const selectOptions = [
    {title: '50,000', value: 50},
    {title: '100,000', value: 100},
    {title: '250,000', value: 250},
    {title: '500,000', value: 500},
];

export default AccountForm;
