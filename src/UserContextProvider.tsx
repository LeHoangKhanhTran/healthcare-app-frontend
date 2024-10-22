import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';
import config from './Config';
import { User, UserContextType } from './types';


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode, setUserRole: React.Dispatch<React.SetStateAction<string | undefined>>}> = ({ children, setUserRole }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const getUser = async () => {
    try {
      const response: AxiosResponse<User> = await axios.get(`${config.apiUrl}/User/me`, { withCredentials: true });
      if (response.status === 200) {
        const user = response.data as User
        setUser(user);
        setUserRole(user.role)
      }
    } 
    catch (error) {
      console.log(error)
      setUser(null)
      console.log("No user.");
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getUser(); 
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

