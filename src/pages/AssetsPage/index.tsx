import { useTonConnectUI } from "@tonconnect/ui-react"
import { useEffect, useState } from "react"
import './index.scss'
import { useLoading } from "@/context/LoadingContext"
import TokenList from "@/components/TokenList"
const testToken = [
  {
    name: "Toncoin",
    symbol: "TON",
    balance: "10.5000",
    price: 5.23,
  },
  {
    name: "USD Tether",
    symbol: "USDT",
    balance: "25.00",
    price: 1.0,
  },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    balance: "0.0025",
    price: 65000,
  },
]
export default function AssetsPage() {
  const [tonConnectUI] = useTonConnectUI()
  const { setLoading } = useLoading()
  const [address, setAddress] = useState<string>("")
  const [balance, setBalance] = useState<string>("0")
  const [tokens, setTokens] = useState<any[]>(testToken)

  const [activities, setActivities] = useState<any[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    setIsDataLoaded(true)

    // 监听连接状态
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      console.log(wallet, 'wallet');

      if (wallet) {
        // 获取余额（以纳诺为单位）
        // const balanceNano = wallet.account.balance || '0';
        // console.log(balanceNano,'balanceNano');

        // // 转换为 TON 单位（1 TON = 10^9 纳诺）
        // const balanceTon = (Number(balanceNano) / 10**9).toFixed(4);

        // setBalance(balanceTon);
        // console.log('TON 余额:', balanceTon);
        setIsDataLoaded(true)
      } else {
        console.log(111111);

      }
    })
    unsubscribe()
    return () => {
      unsubscribe();
    };
  }, [tonConnectUI]);



  return (
    <div className={`container ${isDataLoaded ? "fade-in" : ""}`}>
      <div className='header'>
        <div className="text">Token</div>
        <div className="text">Balance</div>
      </div>
      <TokenList tokens={tokens} isLoading={!isDataLoaded} />


    </div>
  )
}

