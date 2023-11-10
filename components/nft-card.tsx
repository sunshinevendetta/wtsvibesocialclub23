import React from 'react';
import dynamic from 'next/dynamic';
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";

// Dynamically import the ModelViewerComponent with SSR disabled
const ModelViewerComponent = dynamic(() => import('../components/ModelViewerComponent'), {
  ssr: false,
  loading: () => <p>Loading 3D model...</p>,
});

// Removed 'quantity' from NFTProps
type NFTProps = {
    nft: NFT;
    is3D?: boolean;
};

const NFTCard: React.FC<NFTProps> = ({ nft, is3D = false }) => {
    // Safely access the animation URL and name, ensuring they are strings
    const animationUrl = typeof nft.metadata.animation_url === 'string' ? nft.metadata.animation_url : '';
    const name = typeof nft.metadata.name === 'string' ? nft.metadata.name : 'NFT';

    // Determine if the ModelViewerComponent should be rendered
    const shouldRenderModelViewer = is3D && animationUrl.endsWith('.glb');

    return (
        <div className={styles.nftCard}>
            {shouldRenderModelViewer ? (
                <ModelViewerComponent glbUrl={animationUrl} alt={name} />
            ) : (
                <ThirdwebNftMedia metadata={nft.metadata} width="100%" height="auto" />
            )}
            <div className={styles.nftCardContent}>
                <p>Eres parte de: {name}</p>
                <p>Tu wallet: {nft.owner}</p>
            </div>
        </div>
    );
};

export default NFTCard;
