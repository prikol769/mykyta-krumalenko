import React, {useEffect, useState} from 'react';
import './Plans.scss';
import {getQuotes} from '../../utils/fetchApi';

const Plans = () => {
    const [quotesData, setQuotesData] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(quotesData, 'quotesData');
    console.log(errMessage, 'errMessage');
    console.log(loading, 'loading');

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

    return (
        <div>
            Plans
        </div>
    );
};

export default Plans;
