import { useState } from 'react';
import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { NFT_CONTRACT_ADDRESS2 } from "../consts/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Link from 'next/link';

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS2);
  const { data: contractMetadata } = useContractMetadata(contract);

  const [selectedClanTokenId, setSelectedClanTokenId] = useState<number | null>(null);
  const [clanCode, setClanCode] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const clanNames = Array.from({ length: 67 }, (_, index) => `medalla ${index + 1}`);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClanCode(e.target.value);
  };

  const handleSubmit = () => {
    const tokenId = parseInt(clanCode, 10) - 1;
    if (tokenId >= 0 && tokenId < 67) {
      setSelectedClanTokenId(tokenId);
    } else {
      alert('Por favor ingresa un código valido, pregunta al encargado del stand por el.');
      setSelectedClanTokenId(null);
    }
  };

  const claimNFT = async (contract: any, tokenId: number) => {
    if (!contract) {
      alert('No se pudo cargar el contrato. Por favor, recarga la página.');
      return;
    }

    try {
      const tx = await contract.erc1155.claim(tokenId, 1);
      console.log(tx);
      setConfirmation(true);
      alert(`¡Felicidades! Has obtenido la ${clanNames[tokenId]}.`);
    } catch (error) {
      console.error('Error al reclamar la medalla:', error);
      alert('Hubo un error al reclamar la medalla. Por favor, inténtalo de nuevo.');
    }
  };

  const clanImages = Array.from({ length: 67 }, (_, index) => `/${index + 1}.png`);
  const clanGradientClasses = Array.from({ length: 67 }, (_, index) => `gradientText${index % 4}`);

  return (
    <div className={styles.container} style={{ backgroundImage: "url(/background.png)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      {address ? (
        <div className={styles.nftClaim}>
          <MediaRenderer src={contractMetadata?.image} width="auto" height="20%" style={{ borderRadius: "20px", maxWidth: "400px" }} />
          <h2>{contractMetadata?.name}</h2>
          <input
            type="text"
            value={clanCode}
            onChange={handleCodeChange}
            maxLength={3}
            placeholder="Ingresa el código secreto (ej. 001)"
            className={styles.codeInput}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Confirmar Código
          </button>
          {selectedClanTokenId !== null && !confirmation && (
            <div className={styles.gridContainer2}>
              <div key={selectedClanTokenId} className={styles.cardClan}>
                <MediaRenderer src={clanImages[selectedClanTokenId]} className={styles.cardClanImage} style={{ width: "130%", height: "130%", borderRadius: "20px", objectFit: "cover" }} />
                <div className={`${styles.cardText} ${styles[clanGradientClasses[selectedClanTokenId]]}`}>
                  {clanNames[selectedClanTokenId]}
                </div>
                <Web3Button
  contractAddress={NFT_CONTRACT_ADDRESS2}
  action={() => claimNFT(contract, selectedClanTokenId)}
  className={styles.claimButton}
>
  <span className="smallText">Obtener</span>
</Web3Button>

              </div>
            </div>
          )}
          {confirmation && selectedClanTokenId !== null && ( // Ensure selectedClanTokenId is not null
            <>
              <p>Felicidades ya tienes la medalla {clanNames[selectedClanTokenId]}!</p>
              <Link href="/medallas" passHref>
                <button className={styles.clanButtonAccess}>Descubre {clanNames[selectedClanTokenId]}</button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <ConnectWallet
            theme={"dark"}
            btnTitle={"conecta"}
            modalTitle={"ingresa tu mail, el boton Google puede ser inestable"}
            modalSize={"compact"}
            welcomeScreen={{
              subtitle: "inicia",
              img: {
                src: "https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/passport/assets/images/logos/logo.svg",
                width: 150,
                height: 150,
              },
            }}
            modalTitleIconUrl={
              "https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/passport/assets/images/preloader.gif"
            }
          />
        </div>
      )}
    </div>
  );
};

export default Home;
