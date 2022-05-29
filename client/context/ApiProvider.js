import React, {useState, useContext, createContext} from 'react';

const AxiosContext = createContext();

const ApiProvider = ({children}) => {
  const [isValidToken, setIsValidToken] = useState(false);
  return (
    <AxiosContext.Provider value={{isValidToken, setIsValidToken}}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useToken = () => useContext(AxiosContext);

export default ApiProvider;
