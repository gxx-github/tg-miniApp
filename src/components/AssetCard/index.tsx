
import "./index.scss"

interface AssetCardProps {
  address: string
  balance: string
  isLoading: boolean
}

export default function AssetCard({ address, balance, isLoading }: AssetCardProps) {
  // 格式化地址显示
  const formatAddress = (addr: string) => {
    if (!addr) return ""
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // 复制地址到剪贴板
  const copyAddress = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        alert("地址已复制到剪贴板")
      })
      .catch((err) => {
        console.error("复制失败:", err)
      })
  }

  return (
    <div className={`card assetCard`}>
      {isLoading ? (
        <div className='skeleton'>
          <div className='skeletonBalance'></div>
          <div className='skeletonAddress'></div>
        </div>
      ) : (
        <>
          <div className='balanceContainer'>
            <div className='balanceLabel'>总余额</div>
            <div className='balanceValue'>{balance} TON</div>
            <div className='fiatValue'>≈ $0.00 USD</div>
          </div>

          <div className='addressContainer'>
            <div className='addressLabel'>钱包地址</div>
            <div className='addressValue'>
              <span>{formatAddress(address)}</span>
              <button onClick={copyAddress} className='copyButton'>
                复制
              </button>
            </div>
          </div>

          <div className='actions'>
            <button className='actionButton'>发送</button>
            <button className='actionButton'>接收</button>
            <button className='actionButton'>交换</button>
          </div>
        </>
      )}
    </div>
  )
}

