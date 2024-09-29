import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [xp, setXP] = useState(0.1);
  const [level, setLevel] = useState(1);
  const [body_weight, setWeight] = useState(0);
  const [current_week, setWeek] = useState(1);

  const contextValue = { xp, setXP, level, setLevel, body_weight, setWeight, current_week, setWeek };
  
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};