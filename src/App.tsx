import "./App.css";
import { useAccount, useNetwork, useWalletClient } from "wagmi";
import { getPublicClient } from "@wagmi/core";
import { HatsClient } from "@hatsprotocol/sdk-v1-core";
import { useEffect, useState } from "react";

function App() {
  const { chain } = useNetwork();
  const publicClient = getPublicClient({ chainId: 5 });
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [userAddress, setUserAddress] = useState(address);
  const [isProductDesigner, setIsProductDesigner] = useState<boolean>(false);
  const [isCusSup, setIsCusSup] = useState<boolean>(false);

  const pdhatId = BigInt(
    "161760091391597659884661404783576847334135720567102765703756909641728"
  );

  const cshatId = BigInt(
    "161760091391597468324180298184800455458961011611171096381022569234432"
  );

  const hatsClient = new HatsClient({
    chainId: chain?.id || 5,
    publicClient,
    walletClient: walletClient!,
  });

  useEffect(() => {
    setIsProductDesigner(false);
    setIsCusSup(false);
    hatsProtocol();
  }, [userAddress]);

  const hatsProtocol = async () => {
    const isWearerofPD = await hatsClient.isWearerOfHat({
      wearer: userAddress!,
      hatId: pdhatId,
    });
    if (isWearerofPD) setIsProductDesigner(true);

    const isWearerofCS = await hatsClient.isWearerOfHat({
      wearer: userAddress!,
      hatId: cshatId,
    });
    if (isWearerofCS) setIsCusSup(true);
  };

  return (
    <div className="App">
      <button
        onClick={() =>
          setUserAddress("0x3216187edfd4a808f95f23702ec971e301706f2b")
        }
      >
        <h3>Switch to Product Designer</h3>
      </button>
      <button
        onClick={() =>
          setUserAddress("0x516cafd745ec780d20f61c0d71fe258ea765222d")
        }
      >
        <h3>Switch to Customer Support</h3>
      </button>
      <button onClick={() => setUserAddress(address)}>
        <h3>Switch to Connected Wallet</h3>
      </button>
      <div>
        <h2>Product Designer only content</h2>
        <div
          style={{
            backgroundColor: isProductDesigner ? "green" : "red",
          }}
        >
          <h2>{isProductDesigner ? "Access granted" : "Access denied"}</h2>
        </div>
      </div>
      <div>
        <h2>Customer Support only content</h2>
        <div
          style={{
            backgroundColor: isCusSup ? "green" : "red",
          }}
        >
          <h2>{isCusSup ? "Access granted" : "Access denied"}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
