import type React from "react"
import "./listCard.scss"
import goodsImg from '../../assets/home/goods.png'
import dropTips from '../../assets/home/drop.svg'
import normalTips from '../../assets/home/normal.svg'
import { TimerDom } from "../Timer"
interface ShopCardProps {
    level: "S" | "A" | "B" | "C"
    imageUrl: string
    title: string
    description: string
    progress: number // 0-100
    activeListNum: number // 0-100
    className?: string
    handleDraw?: (e: any) => void
    handleClaim?: (e: any) => void
}

const listCard: React.FC<ShopCardProps> = ({ level, imageUrl, title, description, progress, className = "", handleDraw, handleClaim, activeListNum }) => {
    // 确保进度值在 0-100 之间
    const normalizedProgress = Math.min(100, Math.max(0, progress))

    // 根据等级获取对应的类名
    const getLevelClassName = () => {
        switch (level) {
            case "S":
                return dropTips
            case "A":
                return normalTips
            default:
                return ""
        }
    }

    return (
        <div className={`list-card ${className}`}>
            {/* 商品等级标签 */}
            <div className={`level-tag ${getLevelClassName()}`}>
                <img src={getLevelClassName()} alt="" />
            </div>
            <div className="card-wrapper">
                {/* 商品图片 */}
                <div className="image-wrapper">
                    <img src={goodsImg} alt={title} className="product-image" />

                    <div className={`itemLabel-tag labeltag${activeListNum}`}>
                        {
                            activeListNum === 0 && <span>
                                End: <TimerDom timer={1741418898} onZero={()=>{
                                    
                                }}></TimerDom>
                            </span>
                        }
                        {
                            activeListNum === 1 && <span>
                                Start: <TimerDom timer={1741418898} onZero={()=>{
                                    
                                }}></TimerDom>
                            </span>
                        }
                        {
                            activeListNum === 2 && <span>
                               Go to Draw
                            </span>
                        }
                        {
                            activeListNum === 3 && <span>
                               You Won!
                            </span>
                        }
                        {
                            activeListNum === 4 && <span>
                               Not Reached
                            </span>
                        }

                    </div>
                </div>

                {/* 商品信息 */}
                <div className="card-content">
                    <h3 className="product-title">{title}</h3>
                    {
                        activeListNum === 0 && <div className="card-0">
                            <div className="product-rest">
                                Entries Remaining: 100
                            </div>
                            <div className="product-price">
                                1 USDT / Entries
                            </div>
                            {/* 进度条 */}
                            <div className="progress-wrapper">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${normalizedProgress}%` }} />

                                </div>
                                <span>{normalizedProgress}%</span>
                            </div>
                        </div>
                    }
                    {
                        activeListNum === 1 && <div className="card-1">
                            <div className="product-rest">
                                Round Number : 100
                            </div>
                            <div className="product-rest">
                                Total Entries Required : 100
                            </div>
                            <div className="product-price">
                                1 USDT / Entries
                            </div>
                        </div>
                    }
                    {
                        activeListNum === 2 && <div className="card-2">
                            <div className="product-rest">
                                Round Number : <span className="color1">2025136</span>
                            </div>
                            <div className="product-rest">
                                Participants : <span className="color1">2025136</span>
                            </div>
                            <div className="product-rest">
                                Total Draw Amount:  : <span className="color2">2025136</span>
                            </div>
                        </div>
                    }
                    {
                        activeListNum === 3 && <div className="card-3">
                            <div className="product-rest">
                                Achieved Amount:  <span className="color2">$3,000 </span>
                            </div>
                            <div className="product-rest">
                                Lucky Number:  <span className="color3">2025136</span>
                            </div>
                            <div className="product-rest">
                                Winning User  : <span className="color4">UQAxTW…P4wk</span>
                            </div>
                        </div>
                    }
                    {
                        activeListNum === 4 && <div className="card-4">
                            <div className="product-rest">
                                Entries Remaining: 100
                            </div>
                            <div className="product-price">
                                1 USDT / Entries
                            </div>
                            {/* 进度条 */}
                            <div className="progress-wrapper">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${normalizedProgress}%` }} />

                                </div>
                                <span>{normalizedProgress}%</span>
                            </div>
                        </div>
                    }

                </div>
            </div>
            {/* 按钮显示 */}
            <div className="buttonInfo">
                {
                    activeListNum === 2 && <div className="drawButton">
                        Go to Draw
                    </div>
                }
                {
                    activeListNum === 3 && <div className="drawButton">
                        Claim Prize
                    </div>
                }
                {
                    activeListNum === 4 && <div className="drawButton">
                        Pending Claim
                    </div>
                }
            </div>

        </div>
    )
}

export default listCard

