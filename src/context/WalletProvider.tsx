import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"

import { contractAbi, contractAddress } from "../utils/Constant"

interface IWalletProvider {
    connectWallet: any
    currentAccount: string
    tokenInfo: any
}
export const WalletContext = createContext<Partial<IWalletProvider>>({})

const { ethereum }: any = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const dadsContract = new ethers.Contract(contractAddress, contractAbi, signer)
    // console.log({provider, signer, dadsContract})
    return dadsContract
}

export function WalletProvider({ children }: any) {
    const [currentAccount, setCurrentAccount] = useState("")
    const [tokenInfo, setTokenInfo] = useState({})
    const checkWalletConnected = async () => {
        try {
            if (!ethereum)
                return console.log("You need to install Crypto Wallets to use our features!")
            const accounts = await ethereum.request({ method: "eth_accounts" })
            if (!accounts.length) return console.log("Wallet is not connected!")
            setCurrentAccount(accounts[0])
            const info = (await getTokenInfo(accounts[0])) as any
            setTokenInfo(info)
        } catch (error) {
            console.log(error)
        }
    }
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Wallet not connected")
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            if (accounts.length) setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
        }
    }
    const getTokenInfo = async (currentAccount: string) => {
        try {
            const dadsContract = getEthereumContract()
            console.log(await dadsContract.name())
            const name = await dadsContract.name()
            const symbol = await dadsContract.symbol()
            const { _hex } = await dadsContract.balanceOf(currentAccount)
            const balance = ethers.utils.formatEther(_hex)
            return { name, symbol, balance }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkWalletConnected()
    }, [])
    return (
        <WalletContext.Provider value={{ connectWallet, currentAccount, tokenInfo }}>
            {children}
        </WalletContext.Provider>
    )
}

export default function useWallet() {
    return useContext(WalletContext)
}
