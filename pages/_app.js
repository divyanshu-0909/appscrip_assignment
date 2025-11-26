import '../styles/global.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { FilterProvider } from '../context/FilterContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <FilterProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </FilterProvider>
  );
}
