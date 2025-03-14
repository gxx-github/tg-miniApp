import type React from "react"
import "./historyCard.scss"
import goodsImg from '../../assets/home/goods.png'
import dropTips from '../../assets/home/drop.svg'
import normalTips from '../../assets/home/normal.svg'
import { TimerDom } from "../Timer"
import icon3 from '../../assets/history/icon3.png'
import icon4 from '../../assets/history/icon4.png'
import claimPng from '../../assets/history/toClaim@2x.png'

interface HistoryCardProps<T> {
    data: LotteryEntry
    cardType: string
    curTab: number
}
interface LotteryEntry {
    id: string
    type: "Normal" | "Drop"
    productName: string
    productImage: string
    roundNumber: string
    cost: string
    entries: string
    participationAmount: string
    timeRemaining: {
        hours: string
        minutes: string
        seconds: string
    }
    status: string
}

const HistoryCard = <T,>({
    data,
    cardType,
    curTab
}: HistoryCardProps<T>) => {
    // 确保进度值在 0-100 之间
    // const normalizedProgress = Math.min(100, Math.max(0, progress))

    // // 根据等级获取对应的类名
    // const getLevelClassName = () => {
    //     switch (level) {
    //         case "S":
    //             return dropTips
    //         case "A":
    //             return normalTips
    //         default:
    //             return ""
    //     }
    // }

    return (
        <div key={data.id} className="entry-card">
            <div className="round-info">
                <span>Round Number: {data.roundNumber}</span>
                <span className="status">{data.status}</span>
            </div>

            <div className="product-info">
                <div className="product-imageDom">
                    <div className={`entry-type ${data.type.toLowerCase()}`}>{data.type}</div>
                    <img src={data.productImage || "/placeholder.svg"} alt={data.productName} />
                </div>
                <div className="product-details">
                    <div className="tit">iphone 16 Pro Max 512G</div>
                    <div className="round">Round Number: {data.roundNumber}</div>
                    <div className="cost-entries">
                        <span className="cost">{data.cost}</span> / <span className="entries">{data.entries}</span>
                    </div>
                </div>
            </div>

            <div className="participation-info">
                <div className="amount">
                    <span>Participation Asset :</span>
                    <span className="value"> 3,000 USDT</span>
                </div>
                <div className="amount">
                    <span>Select Prize :</span>
                    <span className="value"> Physical Prize </span>
                </div>
                {
                    cardType === 'draw' && curTab === 0 && <div className="time-remaining">
                        <span>Time Remaining:</span>
                        <div className="timer">
                            <TimerDom timer={1742007671} onGoing={true} onZero={() => {
                                console.log('end');
                            }}  ></TimerDom>
                        </div>
                    </div>
                }

            </div>
            {
                cardType === 'draw' && curTab === 2 && <div className="NotWon">
                    <img src={icon3} alt="" />
                    <div className="text">Keep participating and trying—luck will come your way!</div>
                </div>
            }
            {
                cardType === 'draw' && curTab === 3 && <div className="NotWon">
                    <img src={icon4} alt="" />
                    <div className="text">Refund is now available for this round. Please claim it in time!</div>
                </div>
            }
            {
                cardType === 'win' && curTab === 0 && <div className="WonDom">
                    <img src={claimPng} alt="" />
                    <div className="text">Congratulations, You Won!</div>
                </div>
            }
            {
                cardType === 'draw' && <div className="action-buttons">
                    <button className="details-btn">Participation Details</button>
                    {
                        curTab === 0 && <button className="continue-btn">Continue Participating</button>
                    }
                    {
                        curTab === 1 && <button className="continue-btn">Go to Draw</button>
                    }
                    {
                        curTab === 3 && <button className="continue-btn">Go to Retrieval</button>
                    }

                </div>
            }
            {
                cardType === 'win' && <div className="action-buttons">
                      {
                        curTab === 1 && <button className="details-ship">Shipping Details</button>
                    }
                    <button className="details-btn">Participation Details</button>
                    {
                        curTab === 0 && <button className="continue-btn">Claim Prize</button>
                    }

                </div>
            }

        </div>
    )
}

export default HistoryCard

