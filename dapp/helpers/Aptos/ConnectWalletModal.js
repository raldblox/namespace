import { useWallet } from "@manahippo/aptos-wallet-adapter"

import Modal from "react-bootstrap/Modal"

const ConnectWalletModal = (props) => {
    const { show, onConnect } = props

    const wallet = useWallet()

    return (
        <Modal id="connectWalletModal" show={show} onHide={onConnect} centered>
            <Modal.Body className="d-flex flex-column">
                {wallet.wallets.map((walletType) => {
                    const adapter = walletType.adapter;
                    return <button key={adapter.name} className="walletAdapterOption" onClick={async () => {
                        await wallet.select(adapter.name);
                        onConnect();
                    }}>
                        <img src={adapter.icon} />
                        <h6 className="mb-0">{adapter.name}</h6>
                    </button>
                })}
            </Modal.Body>
        </Modal>
    )
}

export default ConnectWalletModal;
