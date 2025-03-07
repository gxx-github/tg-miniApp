import './index.scss'
interface Token {
  name: string
  symbol: string
  balance: string
  price?: number
  logo?: string
}

interface TokenListProps {
  tokens: Token[]
  isLoading: boolean
}

export default function TokenList({ tokens, isLoading }: TokenListProps) {
  // 如果正在加载，显示骨架屏
  if (isLoading) {
    return (
      <div className={`card tokenList`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className='skeletonToken'>
            <div className='skeletonLogo'></div>
            <div className='skeletonInfo'>
              <div className='skeletonName'></div>
              <div className='skeletonBalance'></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 如果没有代币，显示空状态
  if (!tokens || tokens.length === 0) {
    return (
      <div className={`card emptyState`}>
        <p>暂无代币</p>
      </div>
    )
  }

  // 显示代币列表
  return (
    <div className={`card tokenList`}>
      {tokens.map((token, index) => (
        <div key={index} className='tokenItem'>
          <div className='tokenLogo'>
            {token.logo ? (
              <img src={token.logo || "/placeholder.svg"} alt={token.symbol} />
            ) : (
              <div className='defaultLogo'>{token.symbol.charAt(0)}</div>
            )}
          </div>

          <div className='tokenInfo'>
            <div className='tokenName'>{token.name}</div>
            <div className='tokenSymbol'>{token.symbol}</div>
          </div>

          <div className='tokenBalance'>
            <div className='tokenAmount'>{token.balance}</div>
            {token.price && (
              <div className='tokenValue'>≈ ${(Number(token.balance) * token.price).toFixed(2)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

