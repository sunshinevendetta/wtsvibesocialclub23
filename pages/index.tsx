import { useState } from 'react';
import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { NFT_CONTRACT_ADDRESS2 } from "../consts/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Link from 'next/link';

const uniqueCodes = [
  "389H01", "4514Z7", "408V59", "296C47", "D67775", "03A645", "2K1347", "98545U", "Y26450", "H74659",
  "6455I7", "X02488", "014F88", "946L90", "9K6484", "E58912", "321U34", "1275X5", "379F94", "45144G",
  "4Q5767", "S94764", "95W269", "966H20", "97T781", "3L4426", "010L16", "275H16", "845V75", "85O700",
  "Y00780", "181E70", "J82065", "0Y6312", "81070E", "70G435", "5233I2", "H69555", "127A35", "443D47",
  "V01234", "73795G", "9H4102", "E15797", "1X0266", "3064M9", "D76535", "65L806", "2M1495", "6W1172",
  "S90296", "316V24", "37083E", "83369G", "181Q03", "278L34", "7171X4", "6204T5", "R18525", "41I617",
  "12200Z", "00554C", "5790U7", "2M3965", "42X091", "D60943", "497G00", "2A3127", "51E574", "44A485",
  "Q93639", "0Q1151", "2A2587", "35B594", "51852N", "50I637", "N85484", "8V7037", "75I624", "Q68181",
  "40L623", "40C039", "3146B0", "54X759", "1F6750", "51868D", "P47524", "3H6767", "K31937", "6F9214",
  "B41788", "868L35", "R25267", "46V197", "40N471", "4V1702", "44715A", "7318Y7", "N22401", "08297Z", "F75934", "074I95", "8I3617", "J22970", "2R6544", "93663Y", "V09098", "9T4539", "5A9420", "9757T7", "4957O9", "05Z572", "80T581", "8J1430",
  "2Y7929", "407J21", "10D410", "27B238", "489072", "7538T8"
];

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS2);
  const { data: contractMetadata } = useContractMetadata(contract);

  const [selectedClanTokenId, setSelectedClanTokenId] = useState<number | null>(null);
  const [clanCode, setClanCode] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [usedCodes, setUsedCodes] = useState<Set<string>>(new Set());

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClanCode(e.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    const tokenId = uniqueCodes.indexOf(clanCode);
    if (tokenId !== -1 && !usedCodes.has(clanCode)) {
      setSelectedClanTokenId(tokenId);
      setUsedCodes(new Set([...usedCodes, clanCode]));
    } else {
      alert('Código inválido o ya utilizado.');
      setSelectedClanTokenId(null);
    }
  };

  const claimNFT = async (tokenId: number) => {
    if (!contract) {
      alert('No se pudo cargar el contrato. Por favor, recarga la página.');
      return;
    }

    try {
      const tx = await contract.erc1155.claim(tokenId, 1);
      console.log(tx);
      setConfirmation(true);
      alert(`¡Felicidades! Has obtenido tu acceso para el ${contractMetadata?.name}!.`);
    } catch (error) {
      console.error('Error al reclamar acceso:', error);
      alert('Hubo un error al reclamar tu acceso. Por favor, inténtalo de nuevo.');
    }
  };

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
            placeholder="Ingresa el código secreto"
            className={styles.codeInput}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Confirmar Código
          </button>
          <Link href="/inst" passHref>
            <button className={styles.instruccionesButton}>Instrucciones</button>
          </Link>
          {selectedClanTokenId !== null && !confirmation && (
            <Web3Button
              contractAddress={NFT_CONTRACT_ADDRESS2}
              action={() => claimNFT(selectedClanTokenId)}
              className={styles.claimButton}
            >
              Obtener
            </Web3Button>
          )}
          {confirmation && selectedClanTokenId !== null && (
            <>
              <p>Felicidades ya tienes tu acceso para ${contractMetadata?.name}, nos vemos en Phonique en Palmas 555, Lomas de Chapultepec a las 10 pm.
              ***DRESS TO IMPRESS*** MANDATORY</p>
              <Link href="/medallas" passHref>
                <button className={styles.clanButtonAccess}>Pulsa para ver tu ticket</button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <ConnectWallet
            theme={"dark"}
            btnTitle={"conecta"}
            modalTitle={"ingresa tu mail o usa tu cuenta Google"}
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
