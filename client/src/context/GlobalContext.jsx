import React, {createContext, useContext} from 'react';

const GlobalContextDefaultValues = {
    isAccSuccess: false,
    setIsAccSuccess: (isAccSuccess) => isAccSuccess,
};

export const GlobalContext = createContext(GlobalContextDefaultValues);

export function useGlobalContext() {
    return useContext(GlobalContext);
}

const useProvideGlobal = () => {
    const [isAccSuccess, setIsAccSuccess] = React.useState(false);

    return {
        isAccSuccess,
        setIsAccSuccess,
    };
};

export const GlobalProvider = (props) => {
    const globalData = useProvideGlobal();
    return (
        <GlobalContext.Provider value={globalData}>
            {props.children}
        </GlobalContext.Provider>
    );
};
