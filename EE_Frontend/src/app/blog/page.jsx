import Header from '../Components/Header';
import Footer from '../home/Footer';
import BlogContent from './BlogContent';

export default async function Page() {
  return (
    <div className="min-h-screen">
      <Header />
      <BlogContent />
      <Footer />
    </div>
  );
}
