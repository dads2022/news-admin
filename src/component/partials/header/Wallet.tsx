import { useState, useEffect } from "react"
import useWallet from "../../../context/WalletProvider"
import { CopyToClipboard } from "react-copy-to-clipboard"

export default function Wallet() {
    const { currentAccount, connectWallet, tokenInfo } = useWallet()
    const [copyAddressStatus, setCopyAddressStatus] = useState("")
    useEffect(() => {
        const timer = setTimeout(() => {
            setCopyAddressStatus("")
        }, 1500)
        return () => clearTimeout(timer)
    }, [copyAddressStatus])
    return !currentAccount ? (
        <button
            onClick={connectWallet}
            className="px-4 py-2 rounded-2xl border-2 border-blue-200 font-bold bg-blue-100 text-blue-500"
        >
            Connect wallet
        </button>
    ) : (
        <>
            <div className="inline-flex items-center px-4 py-2 border-2 border-yellow-200 rounded-2xl bg-yellow-50 space-x-4">
                <svg
                    version="1.0"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="24px"
                    height="24px"
                    viewBox="0 0 64 64"
                    enableBackground="new 0 0 64 64"
                    xmlSpace="preserve"
                >
                    <polyline
                        fill="#00D9D2"
                        stroke="#9E01FF"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        points="61,44 61,55 1,55 1,15 61,15 61,26 "
                    />
                    <polyline
                        fill="#00D9D2"
                        stroke="#9E01FF"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        points="6,9 54,9 54,15 "
                    />
                    <path
                        fill="#00D9D2"
                        stroke="#9E01FF"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        d="M6,9c-2.762,0-5,2.239-5,5"
                    />
                    <path
                        fill="#00D9D2"
                        stroke="#9E01FF"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        d="M43.125,26c-4.972,0-9,4.029-9,9c0,4.97,4.028,9,9,9 H63V26H43.125z"
                    />
                    <circle
                        fill="#00D9D2"
                        stroke="#9E01FF"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        cx="44"
                        cy="35"
                        r="3"
                    />
                </svg>
                <span className="text-blue-500">
                    {currentAccount.substr(0, 6) +
                        "..." +
                        currentAccount.substr(currentAccount.length - 4, currentAccount.length)}
                </span>
                <CopyToClipboard
                    text={currentAccount}
                    onCopy={() => setCopyAddressStatus("Copied address!")}
                >
                    <svg
                        className="z-10 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </CopyToClipboard>
            </div>
            {/* <p className="inline-flex items-center">{parseInt(tokenInfo.balance)} - {tokenInfo.balance}</p>
            <p className="inline-flex items-center">{tokenInfo.symbol}</p> */}
            {copyAddressStatus && (
                <p className="inline-flex items-center px-4 py-2 font-semibold text-sm text-green-600">
                    {copyAddressStatus}
                </p>
            )}
        </>
    )
}
