import React, {useEffect, useState} from 'react';
import './Plans.scss';
import {getQuotes} from '../../utils/fetchApi';
import {FormSelect, QuoteCard} from '../../components';

const Plans = () => {
    const [quotesData, setQuotesData] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(quotesData, 'quotesData');

    const [optionsActions, setOptionsActions] = useState({
        view: 'List',
        sort: '',
        filter: '',
    });

    const [selectedQuotes, setSelectedQuotes] = React.useState([]);
    console.log(setSelectedQuotes, 'setSelectedQuotes');


    useEffect(() => {
        const fetchDataQuotes = async () => {
            const {quotes} = await getQuotes();
            setQuotesData(quotes);
            setErrMessage("");
            setLoading(false);
        }

        fetchDataQuotes().catch((err) => {
            setLoading(false);
            setErrMessage(err.message);
            console.log(err);
        });
    }, []);


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setOptionsActions({...optionsActions, [name]: value});
    }

    const onChangeChecked = (selectedId) => {
        if(selectedQuotes.includes(selectedId)){
            setSelectedQuotes((current) => current.filter((id) => id !== selectedId));
        }else {
            setSelectedQuotes([...selectedQuotes, selectedId]);
        }
    };

    return (
        <div className="plans__page">
            <div>
                <FormSelect
                    name="view"
                    label="View"
                    value={optionsActions.view}
                    options={selectView}
                    onChange={handleChange}
                    style={{maxWidth: 100}}
                />
            </div>
            <div
                className={["quotes__container", optionsActions.view === "List" ? "view__list" : "view__grid"].join(' ')}>
                {quotesData.map((quote) => {
                    return (
                        <QuoteCard
                            key={quote.id}
                            quoteData={quote}
                            selected={selectedQuotes.includes(quote.id)}
                            onChangeChecked={(id) => onChangeChecked(id)}
                        />
                    )
                })}
            </div>
        </div>
    );
};

const selectView = [
    {title: 'List', value: 'List'},
    {title: 'Grid', value: 'Grid'},
];

export default Plans;
