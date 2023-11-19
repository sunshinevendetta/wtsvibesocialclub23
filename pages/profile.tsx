import React from 'react';
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import NFTCard from "../components/nft-card";
import Link from 'next/link';
import { CONTRACT_ADDRESSES } from "../consts/addresses";

type SectionProps = {
  title: string;
  contractAddress: string;
  address: string;
};

const NFTs = () => {
  const address = useAddress();

  return (
    <div className={`${styles.yourProfileContainerClass} fixed-background`} style={{ backgroundImage: `url('/profile.png')` }}>
      {address ? (
        <>
          <div className={styles.nftGrid}>
            {Object.entries(CONTRACT_ADDRESSES).map(([section, contractAddress]) => (
              <Section
                key={section}
                title={section}
                contractAddress={contractAddress}
                address={address}
              />
            ))}
          </div>
          <div className={styles.rewardsButtonContainer}>
            <Link href="/recompensas" passHref>
              <button className={styles.rewardsButton}>Recompensas</button>
            </Link>
          </div>
        </>
      ) : (
        <div className={styles.loginContainer}>
          <p className={styles.pText}>Inicia sesión</p>
          <Link href="/" passHref>
            <button className={styles.buttonHome}>Conecta</button>
          </Link>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, contractAddress, address }: SectionProps) => {
  const { contract } = useContract(contractAddress);
  const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(contract, address);

  return (
    <div className={styles.section}>
      <h1 className={styles.sectionTitle}>
        <Link href={`/${title.toLowerCase().replace(/\s+/g, '')}`} passHref>
          <span>{title}</span>
        </Link>
      </h1>
      {ownedNFTsLoading ? <p>Loading...</p> : <NFTGallery ownedNFTs={ownedNFTs ?? []} />}
    </div>
  );
};

const NFTGallery = ({ ownedNFTs }: { ownedNFTs: any[] }) => {
  if (!ownedNFTs.length) {
    return <p>No items found. Visit more places and participate in more activities to increase your points and rewards.</p>;
  }

  return (
    <div className={styles.nftGrid}>
      {ownedNFTs.map((nft) => {
        const is3D = nft.metadata.properties?.is3D ?? true;
        return (
          <NFTCard
            key={nft.metadata.id}
            nft={nft}
            is3D={is3D}
          />
        );
      })}
    </div>
  );
};

export default NFTs;
