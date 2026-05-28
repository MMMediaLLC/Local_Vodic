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
  addProfile: (profile: Profile) => Promise<void>;
  updateProfile: (profile: Profile) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  approveProfile: (id: string) => Promise<void>;
  isLoading: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

function getAdminToken(): string {
  return sessionStorage.getItem('adminToken') || '';
}

function authHeaders(): HeadersInit {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

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
    fetch('/api/data')
      .then(res => res.json())
      .then(fetchedData => {
        if (fetchedData?.profiles?.length > 0) {
          setData({
            profiles:   fetchedData.profiles,
            categories: fetchedData.categories?.length > 0 ? fetchedData.categories : mockCategories,
            locations:  fetchedData.locations?.length  > 0 ? fetchedData.locations  : mockLocations,
            contacts:   fetchedData.contacts?.length   > 0 ? fetchedData.contacts   : mockContacts,
            articles:   fetchedData.articles?.length   > 0 ? fetchedData.articles   : mockArticles,
          });
        }
        // If Supabase is empty the mock defaults remain — admin seeding will populate it
      })
      .catch(err => console.error('Failed to fetch data, using mock defaults:', err))
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bulk update (за категории, локации, контакти, статии)
  const updateData = async (type: keyof DataState, newData: any) => {
    const nextData = { ...data, [type]: newData };
    setData(nextData);
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(nextData),
      });
    } catch (err) {
      console.error('Failed to save data:', err);
    }
  };

  // Додај профил
  const addProfile = async (profile: Profile) => {
    const res = await fetch('/api/profiles', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(profile),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Грешка ${res.status} при зачувување`);
    }
    const { profile: saved } = await res.json();
    setData(prev => ({ ...prev, profiles: [saved ?? profile, ...prev.profiles] }));
  };

  // Ажурирај профил
  const updateProfile = async (profile: Profile) => {
    const res = await fetch(`/api/profiles/${profile.id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(profile),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Грешка ${res.status} при ажурирање`);
    }
    const { profile: saved } = await res.json().catch(() => ({}));
    setData(prev => ({
      ...prev,
      profiles: prev.profiles.map(p => p.id === profile.id ? (saved ?? profile) : p),
    }));
  };

  // Избриши профил
  const deleteProfile = async (id: string) => {
    const res = await fetch(`/api/profiles/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Грешка ${res.status} при бришење`);
    }
    setData(prev => ({ ...prev, profiles: prev.profiles.filter(p => p.id !== id) }));
  };

  // Одобри pending профил
  const approveProfile = async (id: string) => {
    const res = await fetch(`/api/profiles/${id}/approve`, {
      method: 'POST',
      headers: authHeaders(),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Грешка ${res.status} при одобрување`);
    }
    setData(prev => ({
      ...prev,
      profiles: prev.profiles.map(p => p.id === id ? { ...p, isPending: false } : p),
    }));
  };

  return (
    <DataContext.Provider value={{
      ...data,
      updateData,
      addProfile,
      updateProfile,
      deleteProfile,
      approveProfile,
      isLoading,
    }}>
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
