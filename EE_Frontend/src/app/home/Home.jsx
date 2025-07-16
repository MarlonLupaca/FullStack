import Header from '@/app/Components/Header';
import Bentos from './Bentos';
import Info from './Info';
import Carousel from './Carousel';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="">
      <Header />
      <Bentos />
      <div className="h-fit flex flex-col justify-center items-center my-20">
        <span className="text-primary font-[700] text-[35px] block text-center">¿Cómo lo hacemos?</span>
        <Info />
      </div>
      <section className="h-[70vh] flex flex-col justify-center items-center pb-10">
        <span className="text-primary font-[700] text-[35px] block text-center">Productos Estrellas</span>
        <Carousel />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
