import React, {useEffect, useState, useCallback} from 'react';
import './Plans.scss';
import {getQuotes} from '../../utils/fetchApi';
import {FormSelect, QuoteCard, ModalCompare} from '../../components';
import {
    selectViewConst,
    sortByPriceConst,
    sortByNameConst,
    filterByBestSellersConst,
    filterByTypeConst, filterBySectionConst
} from '../../utils/constants';

const Plans = () => {
    const [quotesData, setQuotesData] = useState([]);
    const [quotesDataFilter, setQuotesDataFilter] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalCompareOpen, setModalCompareOpen] = useState(false);

    const [optionsActions, setOptionsActions] = useState({
        view: selectViewConst.LIST,
        sortByPrice: '',
        sortByName: '',
        filterByBestSellers: '',
        filterByType: '',
        filterBySection: '',
    });

    const [selectedQuotes, setSelectedQuotes] = React.useState([]);


    useEffect(() => {
        const fetchDataQuotes = async () => {
            setLoading(true);
            const {quotes} = await getQuotes();
            setQuotesData(quotes);
            setQuotesDataFilter(quotes);
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

        if(name === "sortByPrice"){
            setOptionsActions({...optionsActions, [name]: value, sortByName: ''});
        }else if(name === "sortByName"){
            setOptionsActions({...optionsActions, [name]: value, sortByPrice: ''});
        } else {
            setOptionsActions({...optionsActions, [name]: value});
        }

    }

    const onClickChecked = useCallback((selectedId) => {
        if(selectedQuotes.includes(selectedId)){
            setSelectedQuotes((current) => current.filter((id) => id !== selectedId));
        }else {
            setSelectedQuotes([...selectedQuotes, selectedId]);
        }
    }, [selectedQuotes]);


    const filterByBestSellerHandle = (result) => {
        if(optionsActions.filterByBestSellers === filterByBestSellersConst.BEST_SELLERS){
            return result.filter((item) => item.bestSellers);
        }
        else if(optionsActions.filterByBestSellers === filterByBestSellersConst.NO_BEST_SELLERS){
            return result.filter((item) => !item.bestSellers);
        }else {
            return result;
        }
    }

    const filterByTypeHandler = (result) => {
        if(optionsActions.filterByType){
            return result.filter((item) => item.type === optionsActions.filterByType);
        } else {
            return result;
        }
    }

    const filterBySectionHandler = (result) => {
        if(optionsActions.filterBySection){
            return result.filter((item) => item.section === optionsActions.filterBySection);
        } else {
            return result;
        }
    }

    const sortByPriceHandler = (result) => {
        if(optionsActions.sortByPrice === sortByPriceConst.HIGH_PRICE){
            return [...result].sort((a, b) => b.price - a.price);
        }
        else if(optionsActions.sortByPrice === sortByPriceConst.LOW_RICE) {
            return [...result].sort((a, b) => a.price - b.price);
        } else {
            return [...result].sort((a, b) => a.id - b.id);
        }
    };

    const sortByNameHandler = (result) => {
        if(optionsActions.sortByName === sortByNameConst.AZ){
            return [...result].sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);
        }
        else if(optionsActions.sortByName === sortByNameConst.ZA) {
            return [...result].sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1);
        } else {
            return [...result].sort((a, b) => a.id - b.id);
        }
    };

    const sortHandler = (result) => {
        if(optionsActions.sortByPrice) {
            return sortByPriceHandler(result);
        } else if(optionsActions.sortByName){
            return sortByNameHandler(result);
        }else {
            return result
        }
    }

    useEffect(() => {
        let result = quotesData;
        result = filterByBestSellerHandle(result);
        result = filterByTypeHandler(result);
        result = filterBySectionHandler(result);
        result = sortHandler(result);

        const filteredSelectedId = selectedQuotes.filter((selectedQuote) => {
            return result.some((el) => {
                return el.id === selectedQuote;
            });
        });
        setSelectedQuotes([...filteredSelectedId]);
        setQuotesDataFilter(result);
    }, [
        optionsActions.sortByPrice,
        optionsActions.sortByName,
        optionsActions.filterByBestSellers,
        optionsActions.filterByType,
        optionsActions.filterBySection
    ]);

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
                <FormSelect
                    name="filterByBestSellers"
                    label="Filter By Best Sellers"
                    value={optionsActions.filterByBestSellers}
                    options={filterByBestSellers}
                    onChange={handleChange}
                    style={{maxWidth: 200}}
                    emptyOption
                />
                <FormSelect
                    name="filterByType"
                    label="Filter By Type"
                    value={optionsActions.filterByType}
                    options={filterByType}
                    onChange={handleChange}
                    style={{maxWidth: 200}}
                    emptyOption
                />
                <FormSelect
                    name="filterBySection"
                    label="Filter By Section"
                    value={optionsActions.filterBySection}
                    options={filterBySection}
                    onChange={handleChange}
                    style={{maxWidth: 200}}
                    emptyOption
                />
                <div className="compare__container">
                    <button
                        className="compare__container__btn"
                        disabled={selectedQuotes.length > 4 || selectedQuotes.length < 2}
                        onClick={() => setModalCompareOpen(true)}
                    >Compare {selectedQuotes.length} plans
                    </button>
                </div>
            </div>
            {errMessage ? <p style={{color: 'red'}}>{errMessage}</p> : null}
            {loading ? <p>...Loading</p> : null}
            {!quotesDataFilter.length && !loading ? <p>No results</p> : null}
            <div
                className={["quotes__container", optionsActions.view === selectViewConst.LIST ? "view__list" : "view__grid"].join(' ')}>
                {
                    quotesDataFilter.length && !loading
                        ? <>
                            {quotesDataFilter.map((quote) => {
                                return (
                                    <QuoteCard
                                        key={quote.id}
                                        quoteData={quote}
                                        selected={selectedQuotes.includes(quote.id)}
                                        onClickChecked={(id) => onClickChecked(id)}
                                    />
                                )
                            })}
                        </>
                        : null
                }
            </div>
            {modalCompareOpen
                ? <ModalCompare
                    setModalCompareOpen={setModalCompareOpen}
                    quotesDataFilter={quotesDataFilter}
                    selectedPlansId={selectedQuotes}/>
                : null
            }
        </div>
    );
};

const selectView = [
    {title: 'List', value: selectViewConst.LIST},
    {title: 'Grid', value: selectViewConst.GRID},
];

const sortByPrice = [
    {title: 'High Price', value: sortByPriceConst.HIGH_PRICE},
    {title: 'Low Price', value: sortByPriceConst.LOW_RICE},
];

const sortByName = [
    {title: 'A - Z', value: sortByNameConst.AZ},
    {title: 'Z - A', value: sortByNameConst.ZA},
];

const filterByBestSellers = [
    {title: 'Best Sellers', value: filterByBestSellersConst.BEST_SELLERS},
    {title: 'No Best Sellers', value: filterByBestSellersConst.NO_BEST_SELLERS},
];

const filterByType = [
    {title: 'Comprehensive', value: filterByTypeConst.COMPREHENSIVE},
    {title: 'Fixed', value: filterByTypeConst.FIXED},
];

const filterBySection = [
    {title: 'Travel Medical', value: filterBySectionConst.TRAVEL_MEDICAL},
    {title: 'International Travel Medical', value: filterBySectionConst.INTERNATIONAL_TRAVEL_MEDICAL},
    {title: 'Student Medical', value: filterBySectionConst.STUDENT_MEDICAL},
    {title: 'J1 Medical', value: filterBySectionConst.J1_MEDICAL},
];

export default Plans;
