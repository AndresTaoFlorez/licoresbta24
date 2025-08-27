
import { Helmet } from "react-helmet";
import WhatsAppButton from '../WhatsAppButton';
import Products from '../Products/index.jsx';
import Categories from '../Categories/index.jsx';

const ContentBody = () => {

  return (
    <div className="relative flex flex-col items-center justify-center pb-12">
      <Helmet>
        <title>Licores Bogotá 24 - Licoresbta24.club</title>
        <meta name="description" content="Compra bebidas en Bogotá las 24 horas con entrega rápida." />
      </Helmet>

      <Categories />
      <Products />

      {/* Botón de WhatsApp */}
      <div className="fixed bottom-4 right-4 z-2">
        <WhatsAppButton />
      </div>

    </div>
  );
};

export default ContentBody;
