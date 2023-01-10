import React, {useEffect, useState} from 'react';
import './Plans.scss';
import {getQuotes} from '../../utils/fetchApi';
import {FormSelect, QuoteCard} from '../../components';

const Plans = () => {
    const [quotesData, setQuotesData] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    // console.log(quotesData, 'quotesData');

    const [optionsActions, setOptionsActions] = useState({
        view: 'List',
        sortByPrice: '',
        sortByName: '',
        filter: '',
    });

    const [selectedQuotes, setSelectedQuotes] = React.useState([]);
    // console.log(setSelectedQuotes, 'setSelectedQuotes');


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

    const onClickChecked = (selectedId) => {
        if(selectedQuotes.includes(selectedId)){
            setSelectedQuotes((current) => current.filter((id) => id !== selectedId));
        }else {
            setSelectedQuotes([...selectedQuotes, selectedId]);
        }
    };

    useEffect(() => {
        console.log('optionsActions.sortByPrice')
        if(optionsActions.sortByPrice === "HighPrice"){
            const sortedByHigh = [...quotesData].sort((a, b) => b.price - a.price);
            setQuotesData(sortedByHigh);
        }
        else if(optionsActions.sortByPrice === "LowPrice") {
            const sortedByLow = [...quotesData].sort((a, b) => a.price - b.price);
            setQuotesData(sortedByLow);
        } else {
            const sortedById = [...quotesData].sort((a, b) => a.id - b.id);
            setQuotesData(sortedById);
        }
    }, [optionsActions.sortByPrice]);

    useEffect(() => {
        if(optionsActions.sortByName === "AZ"){
            const sortedByAZ = [...quotesData].sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
            setQuotesData(sortedByAZ);
        }
        else if(optionsActions.sortByPrice === "ZA") {
            const sortedByZA = [...quotesData].sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1);
            setQuotesData(sortedByZA);
        } else {
            const sortedById = [...quotesData].sort((a, b) => a.id - b.id);
            setQuotesData(sortedById);
        }
    }, [optionsActions.sortByName]);


    return (
        <div className="plans__page">
            <div className="action__container">
                <FormSelect
                    name="view"
                    label="View"
                    value={optionsActions.view}
                    options={selectView}
                    onChange={handleChange}
                    style={{maxWidth: 100}}
                />
                <FormSelect
                    name="sortByPrice"
                    label="Sort By Price"
                    value={optionsActions.sortByPrice}
                    options={sortByPrice}
                    onChange={handleChange}
                    style={{maxWidth: 200}}
                    emptyOption
                />
                <FormSelect
                    name="sortByName"
                    label="Sort By Name"
                    value={optionsActions.sortByName}
                    options={sortByName}
                    onChange={handleChange}
                    style={{maxWidth: 200}}
                    emptyOption
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
                            onClickChecked={(id) => onClickChecked(id)}
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

const sortByPrice = [
    {title: 'High Price', value: 'HighPrice'},
    {title: 'Low Price', value: 'LowPrice'},
];

const sortByName = [
    {title: 'A - Z', value: 'AZ'},
    {title: 'Z - A', value: 'ZA'},
];

export default Plans;
