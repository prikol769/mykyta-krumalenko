import React from 'react';
import './ModalCompare.scss';
import {QuoteCard} from '../index';

const ModalCompare = ({selectedPlansId, setModalCompareOpen, quotesDataFilter}) => {

    const filterSelectedQuotes = quotesDataFilter.filter((selectedQuote) => {
            return selectedPlansId.some((el) => {
                return el === selectedQuote.id;
            });
        });


    return (
        <div onClick={() => setModalCompareOpen(false)} className="modal">
            <div onClick={(event) => event.stopPropagation()} className="modal__content">
                <span onClick={() => setModalCompareOpen(false)} className="modal__content__close">&times;</span>
                <h1>Compare {selectedPlansId?.length} plans</h1>
                <div className="modal__quoteCard__container">
                    {filterSelectedQuotes.map((quote) => {
                        return (
                            <QuoteCard
                                key={quote.id}
                                quoteData={quote}
                                onClickChecked={() => {}}
                                style={{
                                    width: 250,
                                    height: 300,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    marginTop: 10,
                                    marginRight: 10,
                                    cursor: 'default'
                                }}
                                noCheck
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ModalCompare;
