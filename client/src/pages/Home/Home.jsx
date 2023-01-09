import React, {useState} from 'react';
import './Home.scss';
import {FormInput, FormSelect} from '../../components';

const Home = () => {
    const initialAccState = {
        fields: {
            startDate: "",
            endDate: "",
            citizenship: "",
            ageOrYear: "",
            mailingState: "",
            policyMax: "",
        },
        errors: {
            startDate: "",
            endDate: "",
            citizenship: "",
            ageOrYear: "",
            mailingState: "",
            policyMax: "",
        }
    }
    const [account, setAccount] = useState(initialAccState);
    console.log(account,'account')

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
        if(fields.endDate
            && fields.startDate
            && new Date(fields.endDate).toISOString() <= new Date(fields?.startDate).toISOString()
        ) {
            errors["endDate"] = "The end date should be after the start date";
        }

        //citizenship check
        if(fields.citizenship && !fields.citizenship.match(/^[a-zA-Z]+$/)) {
            errors["citizenship"] = "Should not allow numbers or special characters";
        }

        //mailingState check
        if(fields.mailingState && !fields.mailingState.match(/^[a-zA-Z]+$/)) {
            errors["mailingState"] = "Should not allow numbers or special characters";
        }

        //ageOrYear check
        const ageFromYear = new Date().getFullYear() - fields.ageOrYear

        if((fields.ageOrYear.length < 4 && fields.ageOrYear > 100) || (fields.ageOrYear.length >= 4 && ageFromYear > 100)) {
            errors["ageOrYear"] = "You cannot be more than a 100 years old";
        }

        if((!fields.ageOrYear.match(/^[0-9]*$/)) || (fields.ageOrYear.length >= 4 && ageFromYear < 0)) {
            errors["ageOrYear"] = "Please enter only birth year or age";
        }

        setAccount({...account, errors: {...account.errors, ...errors}});
    }

    const submitAccForm = (e) => {
        e.preventDefault();
        validation();
    }

    const resetForm = (e) => {
        e.preventDefault();
        setAccount(initialAccState);
    }

    return (
        <div className="home">
            <form>
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
                <FormSelect
                    name="policyMax"
                    label="Policy max"
                    value={account.fields.policyMax}
                    options={selectOptions}
                    onChange={handleChange}
                    errorMessage={account.errors.policyMax}
                />
                <FormInput
                    name="citizenship"
                    placeholder="Citizenship"
                    type="text"
                    label="Citizenship"
                    value={account.fields.citizenship}
                    onChange={handleChange}
                    errorMessage={account.errors.citizenship}
                />
                <FormInput
                    name="ageOrYear"
                    placeholder="Age/Year"
                    type="text"
                    label="Age/Year"
                    value={account.fields.ageOrYear}
                    onChange={handleChange}
                    errorMessage={account.errors.ageOrYear}
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
                    <button onClick={submitAccForm}>submit</button>
                    <button onClick={resetForm}>reset</button>
                </div>

            </form>
        </div>
    );
};

const selectOptions = [
    {title: '50,000', value: 50},
    {title: '100,000', value: 100},
    {title: '250,000', value: 250},
    {title: '500,000', value: 500},
];

export default Home;
