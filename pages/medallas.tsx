import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESSES } from "../consts/addresses";
import NFTCard from "../components/nft-card";

export default function Medallas() {
    const address = useAddress();

    // Use the Medallas contract address
    const {
        contract
    } = useContract(CONTRACT_ADDRESSES.Medallas);

    const {
        data: ownedMedallas,
        isLoading: ownedMedallasLoading
    } = useOwnedNFTs(contract, address);

    return (
      <div className={styles.container}>
        <h1>Invites</h1>
        {ownedMedallasLoading ? (
          <p>Loading...</p>
        ) : (
          ownedMedallas && ownedMedallas.length > 0 ? (
            ownedMedallas.map((medalla) => {
              return (
                <NFTCard
                  key={medalla.metadata.id}
                  nft={medalla}
                  is3D={true} // Here you pass the is3D prop as true for Medallas
                />
              )
            })
          ) : (
            <p>Sin Invite </p>
                )
            )}
        </div>
    )
};
