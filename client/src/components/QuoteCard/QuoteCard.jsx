import React from 'react';
import './QuoteCard.scss';
const QuoteCard = ({quoteData, selected, onChangeChecked}) => {
    const {bestSellers, description, name, price, section, type, id} = quoteData;

    return (
        <div className="quoteCard" onClick={() => onChangeChecked(id)}>
            <input className="quoteCard__checkbox" type="checkbox" checked={selected} />
            <p className="quoteCard__name">{name}</p>
            <p className="quoteCard__price">price: {price}$</p>
            <p className="quoteCard__description">{description}</p>
            <p className="quoteCard__bestSellers">{bestSellers ? "Best Sellers" : null}</p>
            <p className="quoteCard__section">{section}</p>
            <p className="quoteCard__type">{type}</p>
        </div>
    );
};

export default QuoteCard;
