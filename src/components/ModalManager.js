import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ManualSendModal from "./ManualSendModal";
import QRScannerModal from "./QRScannerModal";
import ConfirmationModal from "./ConfirmationModal";
import RequestMoneyModal from "./RequestMoneyModal";
import QRCodeDisplayModal from "./QRCodeDisplayModal";
import { BASE_URL } from "../utils/api";
import styles from "./styles";

const ModalManager = ({ modalRef, modalStage, setModalStage, setShowModal }) => {
    const [sendAmount, setSendAmount] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [message, setMessage] = useState("");
    const [qrData, setQrData] = useState(null);
    const [showQrModal, setShowQrModal] = useState(false);
    const [showRequestMoneyModal, setShowRequestMoneyModal] = useState(false);
    const [showQrDisplayModal, setShowQrDisplayModal] = useState(false);

    useEffect(() => {
        if (qrData) {
            setRecipientEmail(qrData.recipientEmail);
            setSendAmount(qrData.amount);
            setModalStage("manual");
        }
    }, [qrData]);

    const prepareAndSendTransaction = async (recipientEmail, amountInWei) => {
        const response = await fetch(`${BASE_URL}/transactions/prepare-send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipientEmail, amountInWei })
        });
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
    };

    const handleSendMoneyClick = async () => {
        if (!recipientEmail || !sendAmount) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            const amountInWei = web3.utils.toWei(sendAmount, "ether");

            const txData = await prepareAndSendTransaction(recipientEmail, amountInWei);

            const tx = {
                from: account,
                to: txData.to,
                value: txData.value,
                data: txData.data
            };

            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [tx],
            });

            console.log('Transaction Hash:', txHash);
            setMessage(`Send successful! Transaction Hash: ${txHash.transactionHash}`);

            // Reset state after successful transaction
            setShowModal(false);
            setSendAmount("");
            setRecipientEmail("");
            setQrData(null);

        } catch (error) {
            console.error('Send Error:', error);
            setMessage(`Send failed: ${error.message}`);
        }
    };

    const handleQRScanSuccess = (decodedText) => {
        try {
            const data = JSON.parse(decodedText);
            setQrData(data);
            setShowQrModal(false);
            setModalStage("manual"); // Transition to manual entry screen
        } catch (error) {
            console.error("Failed to parse QR code data:", error);
            setMessage("Failed to parse QR code data.");
        }
    };

    const handleGenerateQR = (data) => {
        setQrData(data);
        setShowQrDisplayModal(true);
    };

    const handleSendEmail = (data) => {
        console.log("Requesting money:", data);
        alert(`Money request of $${data.amount} sent to ${data.recipientEmail}`);
        setShowRequestMoneyModal(false);
        setShowModal(false);
    };

    return (
        <div style={styles.modalBackdrop}>
            <div ref={modalRef} style={styles.modalContainer}>
                {modalStage === "initial" && (
                    <>
                        <button style={styles.modalButton} onClick={() => setModalStage("send")}>
                            SEND
                        </button>
                        <button style={styles.modalButton} onClick={() => setShowRequestMoneyModal(true)}>
                            REQUEST
                        </button>
                    </>
                )}
                {modalStage === "send" && (
                    <>
                        <button style={styles.modalButton} onClick={() => setShowQrModal(true)}>
                            Scan QR
                        </button>
                        <button style={styles.modalButton} onClick={() => setModalStage("manual")}>
                            Send manually
                        </button>
                    </>
                )}
                {modalStage === "manual" && (
                    <ManualSendModal
                        sendAmount={sendAmount}
                        recipientEmail={recipientEmail}
                        onAmountChange={(e) => setSendAmount(e.target.value)}
                        onEmailChange={(e) => setRecipientEmail(e.target.value)}
                        onSendMoneyClick={handleSendMoneyClick}
                    />
                )}

                {showQrModal && (
                    <QRScannerModal
                        handleQRScanSuccess={handleQRScanSuccess}
                        handleQRScanError={(error) => console.error("QR scan error:", error)}
                        onClose={() => setShowQrModal(false)}
                    />
                )}

                {showRequestMoneyModal && (
                    <RequestMoneyModal
                        ref={modalRef}
                        onRequestClose={() => {
                            setShowRequestMoneyModal(false);
                            setShowModal(false);
                        }}
                        onGenerateQR={handleGenerateQR}
                        onSendEmail={handleSendEmail}
                    />
                )}

                {showQrDisplayModal && (
                    <QRCodeDisplayModal
                        qrData={qrData}
                        onClose={() => setShowQrDisplayModal(false)}
                    />
                )}

                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default ModalManager;