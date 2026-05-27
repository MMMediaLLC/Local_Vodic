import React, { useState } from 'react';
import { useData } from '../lib/DataContext';
import { Settings, Plus, Edit, Trash2, Save, FileText, X } from 'lucide-react';
import { Profile } from '../types';

export default function Admin() {
  const { profiles, categories, updateData } = useData();
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [activeTab, setActiveTab] = useState('profiles');

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setFormData(profile);
  };

  const handleAddNew = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newProfile: Profile = {
      id: newId,
      name: '',
      slug: `novo-${newId}`,
      category: categories[0]?.name || '',
      categorySlug: categories[0]?.slug || '',
      location: 'Гостивар',
      shortDescription: '',
      fullDescription: '',
      phone: '',
      address: '',
      isFeatured: false,
      isVerified: false
    };
    setEditingProfile(newProfile);
    setFormData(newProfile);
  };

  const handleDelete = (id: string) => {
    if (confirm('Дали сте сигурни дека сакате да го избришете овој профил?')) {
      updateData('profiles', profiles.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name) return alert("Името е задолжително");
    
    // Auto-update category slug based on category name selection
    const selectedCategory = categories.find(c => c.name === formData.category);
    if (selectedCategory) {
      formData.categorySlug = selectedCategory.slug;
    }

    // Auto-generate slug if it's new
    if (!formData.slug || formData.slug.startsWith('novo-')) {
      formData.slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const updatedProfiles = profiles.find(p => p.id === formData.id) 
      ? profiles.map(p => p.id === formData.id ? { ...p, ...formData } as Profile : p)
      : [formData as Profile, ...profiles];
      
    updateData('profiles', updatedProfiles);
    setEditingProfile(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[70vh]">
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-bold tracking-tight">GP Админ Панел</h1>
            </div>
            <div className="text-sm bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-medium">
              Без База (JSON)
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-full min-h-[60vh]">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
              <div className="space-y-1">
                <button 
                  onClick={() => { setActiveTab('profiles'); setEditingProfile(null); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-left transition-colors ${activeTab === 'profiles' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <FileText className="w-5 h-5" /> Профили
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 relative">
              {activeTab === 'profiles' && !editingProfile && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Сите профили</h2>
                    <button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-colors">
                      <Plus className="w-4 h-4" /> Додај нов
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Име</th>
                          <th className="px-4 py-3">Категорија</th>
                          <th className="px-4 py-3 text-right">Акции</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {profiles.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                            <td className="px-4 py-3">{p.category}</td>
                            <td className="px-4 py-3 text-right">
                              <button onClick={() => handleEdit(p)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-1">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(p.id)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Edit Profile Form */}
              {editingProfile && (
                <div className="max-w-3xl mx-auto">
                  <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                    <h2 className="text-2xl font-bold text-slate-900">{formData.name ? 'Уреди профил' : 'Нов профил'}</h2>
                    <button onClick={() => setEditingProfile(null)} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 font-medium bg-slate-100 px-3 py-1.5 rounded-lg">
                      <X className="w-4 h-4" /> Откажи
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Име на профилот</label>
                        <input type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Категорија</label>
                        <select value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Краток опис (за листа)</label>
                        <input type="text" value={formData.shortDescription || ''} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Целосен опис</label>
                        <textarea value={formData.fullDescription || ''} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} rows={4} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Телефон</label>
                        <input type="text" value={formData.phone || ''} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Адреса</label>
                        <input type="text" value={formData.address || ''} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Работно време</label>
                        <input type="text" value={formData.workingHours || ''} onChange={e => setFormData({ ...formData, workingHours: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Локација (Град)</label>
                        <input type="text" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Лого (URL)</label>
                        <input type="text" value={formData.logo || ''} onChange={e => setFormData({ ...formData, logo: e.target.value })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Облик на лого</label>
                        <select value={formData.logoShape || 'square'} onChange={e => setFormData({ ...formData, logoShape: e.target.value as 'square' | 'horizontal' })} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                          <option value="square">Коцка (Square)</option>
                          <option value="horizontal">Хоризонтално (Horizontal)</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 flex gap-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={formData.isFeatured || false} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 rounded text-blue-600" />
                          <span className="text-sm font-bold text-slate-700">Истакнат (Home Page)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={formData.isVerified || false} onChange={e => setFormData({ ...formData, isVerified: e.target.checked })} className="w-4 h-4 rounded text-blue-600" />
                          <span className="text-sm font-bold text-slate-700">Врши Проверка (Verified)</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-slate-200 flex justify-end">
                      <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-colors">
                        <Save className="w-5 h-5" /> Зачувај промени
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
