import { useTonConnectUI } from "@tonconnect/ui-react"
import { useEffect, useState } from "react"
import './index.scss'
import { useLoading } from "@/context/LoadingContext"
import AssetCard from "@/components/AssetCard"

export default function AssetsPage() {
    const [tonConnectUI] = useTonConnectUI()
    const { setLoading } = useLoading()
    const [address, setAddress] = useState<string>("")
    const [balance, setBalance] = useState<string>("0")
    const [tokens, setTokens] = useState<any[]>([])
    const [activities, setActivities] = useState<any[]>([])
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    useEffect(() => {
        // 监听连接状态
        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            console.log(wallet,'wallet');
            
          if (wallet) {
            // 获取余额（以纳诺为单位）
            // const balanceNano = wallet.account.balance || '0';
            // console.log(balanceNano,'balanceNano');
            
            // // 转换为 TON 单位（1 TON = 10^9 纳诺）
            // const balanceTon = (Number(balanceNano) / 10**9).toFixed(4);
            
            // setBalance(balanceTon);
            // console.log('TON 余额:', balanceTon);
          }else{
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
                <h1 className='title'>我的资产</h1>
                <button className='refreshButton'>
                    刷新
                </button>
            </div>

            <AssetCard address={address} balance={balance} isLoading={!isDataLoaded} />

            {/* <div className="section-title">代币</div>
      <TokenList tokens={tokens} isLoading={!isDataLoaded} />

      <div className="section-title">最近活动</div>
      <ActivityList activities={activities} isLoading={!isDataLoaded} limit={3} showViewAll={true} /> */}
        </div>
    )
}

