import React, { useState, useEffect } from 'react';
import { useData } from '../lib/DataContext';
import { Settings, Plus, Edit, Trash2, Save, FileText, X, Lock, LogOut, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Profile } from '../types';

// ---------- Login Screen ----------
function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (res.ok) {
        sessionStorage.setItem('adminToken', json.token);
        onLogin(json.token);
      } else {
        setError(json.error || 'Грешка при најава.');
      }
    } catch {
      setError('Серверот не е достапен.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Админ пристап</h1>
          <p className="text-slate-500 text-sm mt-1">GP Локален водич</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Лозинка</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Внесете лозинка..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-colors"
              autoFocus
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 px-4 py-2.5 rounded-lg text-sm font-medium">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={!password || loading}
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Се проверува...' : 'Влез'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- Main Admin Panel ----------
export default function Admin() {
  const { profiles, categories, addProfile, updateProfile, deleteProfile, approveProfile } = useData();
  const [token, setToken] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [activeTab, setActiveTab] = useState<'profiles' | 'pending'>('profiles');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Проверка дали веќе е најавен (sessionStorage)
  useEffect(() => {
    const stored = sessionStorage.getItem('adminToken');
    if (stored) setToken(stored);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (_) {}
    sessionStorage.removeItem('adminToken');
    setToken(null);
  };

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  const activeProfiles = profiles.filter(p => !p.isPending);
  const pendingProfiles = profiles.filter(p => p.isPending);

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setFormData(profile);
    setSaveError('');
  };

  const handleAddNew = () => {
    const newId = Math.random().toString(36).substring(2, 11);
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
      isVerified: false,
      isPending: false,
    };
    setEditingProfile(newProfile);
    setFormData(newProfile);
    setSaveError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Дали сте сигурни дека сакате да го избришете овој профил?')) return;
    try {
      await deleteProfile(id);
    } catch (err: any) {
      alert(err.message || 'Грешка при бришење.');
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveProfile(id);
    } catch (err: any) {
      alert(err.message || 'Грешка при одобрување.');
    }
  };

  const handleSave = async () => {
    if (!formData.name) return alert('Името е задолжително');
    setSaving(true);
    setSaveError('');

    const selectedCategory = categories.find(c => c.name === formData.category);
    if (selectedCategory) formData.categorySlug = selectedCategory.slug;
    if (!formData.slug || formData.slug.startsWith('novo-')) {
      formData.slug = (formData.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const profileToSave = { ...formData, isPending: false } as Profile;
    try {
      if (profiles.find(p => p.id === profileToSave.id)) {
        await updateProfile(profileToSave);
      } else {
        await addProfile(profileToSave);
      }
      setEditingProfile(null);
    } catch (err: any) {
      setSaveError(err.message || 'Грешка при зачувување. Проверете дали сте најавени.');
    } finally {
      setSaving(false);
    }
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
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-300 font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" /> Одјави се
            </button>
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
                  <span className="ml-auto text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{activeProfiles.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('pending'); setEditingProfile(null); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-left transition-colors ${activeTab === 'pending' ? 'bg-amber-100 text-amber-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <Clock className="w-5 h-5" /> На чекање
                  {pendingProfiles.length > 0 && (
                    <span className="ml-auto text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">{pendingProfiles.length}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 relative">

              {/* === TAB: PROFILES === */}
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
                        {activeProfiles.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                              {p.isVerified && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                              {p.name}
                            </td>
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
                        {activeProfiles.length === 0 && (
                          <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400">Нема профили.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* === TAB: PENDING === */}
              {activeTab === 'pending' && !editingProfile && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Пријавени субјекти — На чекање</h2>
                  </div>
                  {pendingProfiles.length === 0 ? (
                    <div className="text-center py-16 text-slate-400">
                      <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">Нема пријавени субјекти на чекање.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingProfiles.map(p => (
                        <div key={p.id} className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-slate-900 text-lg">{p.name}</span>
                              <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-semibold">На чекање</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">{p.category} · {p.location}</p>
                            <p className="text-sm text-slate-500">{p.shortDescription}</p>
                            {p.phone && <p className="text-sm text-slate-600 mt-1">📞 {p.phone}</p>}
                            {p.address && <p className="text-sm text-slate-600">📍 {p.address}</p>}
                            {(p as any).submittedAt && (
                              <p className="text-xs text-slate-400 mt-2">Поднесено: {new Date((p as any).submittedAt).toLocaleString('mk')}</p>
                            )}
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEdit(p)}
                              className="px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Edit className="w-4 h-4" /> Уреди
                            </button>
                            <button
                              onClick={() => handleApprove(p.id)}
                              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Одобри
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" /> Одбиј
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* === EDIT FORM === */}
              {editingProfile && (
                <div className="max-w-3xl mx-auto">
                  <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                    <h2 className="text-2xl font-bold text-slate-900">{formData.name ? 'Уреди профил' : 'Нов профил'}</h2>
                    <button onClick={() => { setEditingProfile(null); setSaveError(''); }} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 font-medium bg-slate-100 px-3 py-1.5 rounded-lg">
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
                          <span className="text-sm font-bold text-slate-700">Верификуван</span>
                        </label>
                      </div>
                    </div>

                    {saveError && (
                      <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 px-4 py-2.5 rounded-lg text-sm font-medium">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        {saveError}
                      </div>
                    )}

                    <div className="pt-6 border-t border-slate-200 flex justify-end">
                      <button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-colors">
                        <Save className="w-5 h-5" /> {saving ? 'Се зачувува...' : 'Зачувај промени'}
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
