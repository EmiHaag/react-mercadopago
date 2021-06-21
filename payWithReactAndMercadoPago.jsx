import React, { useEffect } from "react";

import { Container, Jumbotron } from "react-bootstrap";

import { useCookies } from "react-cookie";

const Payment = () => {
  const [cookies, setCookie] = useCookies("cookieAddress");

  //create and append script to our component button, with the given preference id.
  const mountScript = (prefId) => {
    
    const script = document.createElement("script");

    script.src ="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    
    //prefId is given from the backend
    script.setAttribute("data-preference-id", prefId);

    document.getElementById("btnPagar").appendChild(script);
  };
  useEffect(() => {
    //I'm collecting data from cookies here, but it can capture the data from a form or any other data . 
    let datos = [cookies.compra, cookies.cookieAddress];
    
   //We send data to our backend for getting preference id from there.
    //You must ensure that your backend is creating and returning the preference-id created
    fetch("/yourBackendResponseFile.xxx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => mountScript(data));
  });

  return (
    <Container>
      <Jumbotron>
        <p>
          Para el pago utilizamos la plataforma de Mercado Pago
          <img
            src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.14.4/mercadopago/logo__large.png"
            alt="icono mercadopago"
            title="logo mercadopago"
            style={{ width: "120px" }}
          />
        </p>
        <p>
          Al hacer click en pagar, se mostrará una ventana de mercadopago para
          poder realizar la operación. Si el pago es exitoso te mostraremos los
          detalles de tu compra y nos pondremos en contacto con vos para
          confirmar los datos de envío.
        </p>
        <!--Here we are appending the mercadopago script with the given pref id-->
        <h3 id="btnPagar"></h3>
      </Jumbotron>
    </Container>
  );
};

export default Payment;
