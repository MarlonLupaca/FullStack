import Header from '@/app/Components/Header';
import ViewproductContent from '../ViewproductContent';

export default async function Page({ params }) {
  const { code } = params;
  console.log(code);
  return (
    <div>
      <Header />
      <ViewproductContent code={code} />
    </div>
  );
}
