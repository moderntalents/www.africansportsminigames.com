import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminGallery from './AdminGallery';
import AdminPosters from './AdminPosters';
import AdminCoachStreams from './AdminCoachStreams';
import { LogOut, Images, FileImage, Radio } from 'lucide-react';

type Tab = 'gallery' | 'posters' | 'streams';

export default function AdminApp() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('asmg_admin') === 'true'
  );
  const [activeTab, setActiveTab] = useState<Tab>('gallery');

  function handleLogin() {
    sessionStorage.setItem('asmg_admin', 'true');
    setUnlocked(true);
  }

  function handleSignOut() {
    sessionStorage.removeItem('asmg_admin');
    setUnlocked(false);
  }

  if (!unlocked) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Images className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-gray-900">ASMG Admin</span>
            </div>

            <nav className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Images className="w-3.5 h-3.5" />
                Gallery
              </button>
              <button
                onClick={() => setActiveTab('posters')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'posters'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileImage className="w-3.5 h-3.5" />
                Posters
              </button>
              <button
                onClick={() => setActiveTab('streams')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'streams'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                Live Streams
              </button>
            </nav>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'gallery' && <AdminGallery />}
        {activeTab === 'posters' && <AdminPosters />}
        {activeTab === 'streams' && <AdminCoachStreams />}
      </main>
    </div>
  );
}
