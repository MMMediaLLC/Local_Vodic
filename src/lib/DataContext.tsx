import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Category, Profile, Location, UsefulContact, RecommendationArticle } from '../types';
import { mockCategories, mockProfiles, mockLocations, mockContacts, mockArticles } from './mockData';

type DataState = {
  categories: Category[];
  profiles: Profile[];
  locations: Location[];
  contacts: UsefulContact[];
  articles: RecommendationArticle[];
};

type DataContextType = DataState & {
  updateData: (type: keyof DataState, data: any) => Promise<void>;
  isLoading: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataState>({
    categories: mockCategories,
    profiles: mockProfiles,
    locations: mockLocations,
    contacts: mockContacts,
    articles: mockArticles,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch from backend
    fetch('/api/data')
      .then(res => res.json())
      .then(fetchedData => {
        // If the backend has no profiles initially, we can seed it with mockData
        if (fetchedData && Object.keys(fetchedData).length > 0 && fetchedData.profiles && fetchedData.profiles.length > 0) {
          setData(fetchedData);
        } else {
          // Sync default mock data to backend on first load if it's empty
          fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        }
      })
      .catch(err => console.error("Failed to fetch data, using mock defaults:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const updateData = async (type: keyof DataState, newData: any) => {
    const nextData = { ...data, [type]: newData };
    setData(nextData);
    
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextData)
      });
    } catch (err) {
      console.error("Failed to save data:", err);
    }
  };

  return (
    <DataContext.Provider value={{ ...data, updateData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
