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
    console.log(tonConnectUI, 'tonConnectUI');

    //   const requestProof = async () => {
    //     try {
    //       // 定义要签名的数据
    //       const payload = {
    //         type: 'ton_proof',
    //         items: [{
    //           name: 'auth',
    //           payload: `Sign in to My App at ${new Date().toISOString()}`
    //         }]
    //       };

    //       // 请求签名
    //       const result = await tonConnectUI.sendRequest(payload);

    //       // 处理结果
    //       console.log('Proof result:', result);

    //     } catch (error) {
    //       console.error('Proof request failed:', error);
    //     }
    //   };


    useEffect(() => {
        // 获取钱包信息和资产
        const loadWalletData = async () => {
            const wallet: any = tonConnectUI.wallet
            console.log(wallet, 'wallet');

            if (wallet) {

                const userAddress = wallet.account.address
                setAddress(userAddress)

                // 获取余额
                const balanceNano = wallet.account.balance || "0"
                const balanceTon = (Number(balanceNano) / 10 ** 9).toFixed(4)
                setBalance(balanceTon)

                // // 获取资产信息
                // try {
                //   setLoading(true, "获取资产信息...")
                //   const assets = await fetchUserAssets(userAddress)

                //   // 设置代币列表
                //   if (assets.tokens) {
                //     setTokens(assets.tokens)
                //   }

                //   // 设置活动列表
                //   if (assets.activities) {
                //     setActivities(assets.activities)
                //   }

                //   setIsDataLoaded(true)
                // } catch (error) {
                //   console.error("获取资产信息失败:", error)
                // } finally {
                //   setLoading(false)
                // }
            }
        }

        loadWalletData()

        // 监听连接状态变化
        const unsubscribe = tonConnectUI.onStatusChange(() => {
            loadWalletData()
        })

        return () => {
            unsubscribe()
        }
    }, [tonConnectUI, setLoading])


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

