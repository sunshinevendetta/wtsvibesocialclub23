import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";
import NFTCard from "../components/nft-card";

export default function NFTs() {
    const address = useAddress();

    const {
        contract
    } = useContract(NFT_CONTRACT_ADDRESS);

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsLoading
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.container}>
            <h1>Clanes</h1>
            {ownedNFTsLoading ? (
                <p>Loading...</p>
            ) : (
                ownedNFTs && ownedNFTs.length > 0 ? (
                    ownedNFTs.map((nft) => {
                        return (
                            <NFTCard
                                key={nft.metadata.id}
                                nft={nft}
                            />
                        )
                    })
                ) : (
                    <p>Sin clan</p>
                )
            )}
        </div>
    )
};