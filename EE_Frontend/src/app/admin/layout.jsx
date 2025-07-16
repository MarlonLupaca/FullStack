import Sidebar from './components_admin/Sidebard';
import Header_Admin from './components_admin/Header_Admin';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }) {
  return (
    <main className="bg-[#f0e9e9] flex h-[100vh] w-[100vw]">
      <Toaster />
      <Sidebar />
      <section className="flex-1 w-full overflow-hidden">
        <Header_Admin />
        <div className="">{children}</div>
      </section>
    </main>
  );
}
