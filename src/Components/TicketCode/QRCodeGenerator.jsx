import { useState } from "react";
import QRCode from "qrcode.react";
import QRCodeLink from "qrcode";
import style from "./QRCodeGenerator.module.css";

// https://www.google.com

function QRCodeGenerator() {
  const [link, setLink] = useState('');
  const [qrcodeLink, setQrcodeLink] = useState('');

  function handleGenerate(link_url) {
    QRCodeLink.toDataURL(link_url, {
      width: 1,
      margin: 1,
    }, function(err, url) {
      setQrcodeLink(url);
    });
  }

  function handleQrcode(event) {
    const value = event.target.value;
    setLink(value);
    handleGenerate(value);
  };

  return (
    <div className={style.container}>
      {qrcodeLink && (
        <div>
          <QRCode value={link} />
          <p>Escanea el código QR o abre este enlace:</p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        </div>
      )}

      
      {!qrcodeLink && (
        <div>
          <input
            className={style.input}
            placeholder="Digite su Link..."
            value={link}
            onChange={(event) => handleQrcode(event)}
          />
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;

//////////////////////////////

// import { useState } from "react";  ORIGINAL --> GENERADOR

// import QRCode from "qrcode.react";
// import QRCodeLink from "qrcode";

// import style from "./QRCodeGenerator.module.css";
// import imagen from "./image/qrcode.png"


// // https://www.google.com  

// function  QRCodeGenerator() {
//   const [link, setLink] = useState('');
//   const [qrcodeLink, setQrcodeLink] = useState(''); 
 

// function handleGenerate(link_url){
//   QRCodeLink.toDataURL(link_url,{
//     width: 1,
//     margin: 1,
//   }, function(err, url){
//     setQrcodeLink(url);
//   })
// }


//   function  handleQrcode(event){
//   setLink(event.target.value);
//   handleGenerate(event.target.value);
// };

//   return (
//     <div className={style.container}>
     
//       <QRCode 
//        value={link}
      
//       />

//       <input
//       className={style.input}
//       placeholder="Digite su Link..."
//       value={link}
//       onChange={ (event) => handleQrcode(event)} 

//       />
      
//       <a href={qrcodeLink} download={`qrcode.png`}>Descarga TicketCode</a>
//       <div>

//       <img src={imagen} alt="qrcode" />
//       </div>

//     </div>
//   );
// }

// export default  QRCodeGenerator; 





