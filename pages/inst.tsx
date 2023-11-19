import React from 'react';
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import NFTCard from "../components/nft-card";
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import styles from "../styles/Home.module.css";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, address ?? "");

  const router = useRouter();

  const redirectToMenu = () => {
    router.push('/menu');
  };

  return (
    <div className={styles.containerInst}>
      <div className={styles.instructionContainer}>
        <h1>Instrucciones para conseguir tu INVITE</h1>

        <div className={styles.cardClan2}>
          <img src="/chrome.png" alt="Iniciar sesión" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Abre el sitio en Chrome de preferencia.</p>
        </div>

        <div className={styles.cardClan2}>
          <img src="/instalar.png" alt="Iniciar sesión" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Instala la app, da tap en los 3 puntos del menú de tu navegador y escoge instalar app.</p>
        </div>

        <div className={styles.cardClan2}>
          <img src="/iniciar.png" alt="Iniciar sesión" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Inicia sesión en la plataforma utilizando tu correo electrónico.</p>
        </div>

        <div className={styles.cardClan2}>
          <img src="/mail.png" alt="Conectar mail" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Conectar tu correo electrónico para recibir notificaciones y códigos de acceso.</p>
        </div>

        <div className={styles.cardClan2}>
          <img src="/verificar.png" alt="Verificar código" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Revisa tu bandeja de entrada para el código de verificación y escríbelo en la plataforma.</p>
        </div>

        <div className={styles.cardClan2}>
          <img src="/elegir.png" alt="Elegir clan" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Ingresa tu código de verificación para obtener tu acceso especial.</p>
        </div>

        <div className={styles.cardClan2}>
          <img src="/secreta.png" alt="Página secreta" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Una vez seleccionado, serás redirigido a una página secreta con la información del evento, tu INVITE es un NFT por lo que debes mostrarlo directo de la plataforma al momento de llegar, NO SE ACEPTAN SCREENSHOTS.</p>
        </div>

        <div className={styles.cardClan2}>
          <img src="/stop.png" alt="Página secreta" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>NO SE ACEPTAN SCREENSHOTS COMO IDENTIFICACION TIENES QUE ABRIR LA APP Y MOSTRAR EL INVITE DIRECTO DE TU CELULAR SIN EXCEPCIONES.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/stop.png" alt="Página secreta" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Los codigos son unicos no lo desperdicies SI INGRESAS UN CODIGO DEBES OBTENER TU PASE EN ESE MOMENTO, O EL CODIGO SE PIERDE.</p>
          <div className={styles.cardClan2}>
          <img src="/stop.png" alt="Página secreta" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Al obtener tu INVITE para este evento, tambien estas registrandote en Vibe Social Club, tu guia global donde la realidad aumentada, inteligencia artificial y web3 se unen para brindarte una experiencia extendida en el mundo real.</p>
        </div>
        </div>

        {address && (
          <div className={styles.connectedMenu}>
            <div className={styles.nftCard}>
              {!isLoading && ownedNFTs && ownedNFTs.length > 0 ? (
                ownedNFTs.map((nft) => (
                  <NFTCard
                    key={nft.metadata.id}
                    nft={nft}
                  />
                ))
              ) : (
                <p>Todavía no tienes INVITE.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;