import './index.scss';
import { FC, useEffect, useState } from 'react';
import select from '../../assets/claim/select@2x.png'
import selected from '../../assets/claim/slected@2x.png'
import { useNavigate } from 'react-router-dom';
interface GoodsDetail {
    imgUrl: string
    tit: string
    number: number
    amount: number
}

export const ClaimPage: FC = () => {
    const Tabsitem = ['Physical Prize', 'Cryptocurrency']
    const [currTab, setcurrTab] = useState(0)
    const [isSelected, setisSelected] = useState(false)
    const navigate = useNavigate()

    const GoodsDom = (item: GoodsDetail) => {
        return (
            <div className="goodsShow">
                <img src="" alt="" />
                <div>
                    <div className="goodTit">{item.tit}</div>
                    <div className="goodNumber">
                        <span>Round Number:</span>
                        <span className="value">{item.number}</span>
                    </div>
                    <div className="goodAmount">
                        <span>Achieved Amount:</span>
                        <span className="color">$ {item.amount}</span>
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div className='claimContainer'>
            <div className="claimHeader">
                {
                    Tabsitem.map((item, index) => (
                        <div
                            className={`Itemtab ${index === currTab ? 'active' : ''}`}
                            key={index}
                            onClick={() => setcurrTab(index)}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
            <div className="claimConDom">
                {/* 实物 */}
                {
                    currTab === 0 && <div className="physicalPrize">
                        <div className="addressSelect" onClick={() => {
                            navigate('/address')
                        }}>
                            <span>Please Select a Shipping Address</span>
                            <div className="enter"></div>
                        </div>
                        <div className="goodsCon">
                            {
                                GoodsDom({
                                    imgUrl: '',
                                    tit: 'Apple iphone 16 Pro Max 512G',
                                    number: 90569010,
                                    amount: 1000
                                })
                            }
                            <div className="goodsDetail">
                                <div className="itemDom">
                                    <div className="label">Subtotal</div>
                                    <div className="value">0 USDT</div>
                                </div>
                                <div className="itemDom">
                                    <div className="label">Packaging Fee</div>
                                    <div className="value">0 USDT</div>
                                </div>
                                <div className="itemDom">
                                    <div className="label">Shipping Fee</div>
                                    <div className="value">0 USDT</div>
                                </div>
                                <div className="itemDom">
                                    <div className="label">Tax</div>
                                    <div className="value">0 USDT</div>
                                </div>
                            </div>
                            <div className="totalAmount">
                                <span>Total Amount: </span>
                                <span className="color">60 USDT</span>
                            </div>
                            <div className="checkPolicy" onClick={() => {
                                setisSelected(!isSelected)

                            }}  >
                                <img src={isSelected ? selected : select} alt="" />
                                <span className="text">I have confirmed the shipping address and agree to the Terms of Service.</span>
                            </div>
                            <div className="payButton">Pay Now</div>
                        </div>

                    </div>
                }
                {/* 数字 */}
                {
                    currTab === 1 && <div className="cryptoCurrency">
                        <div className="goodsShowInfo">
                            <div>
                                <div className="label">Receiving Address</div>
                                <div className="value">UQAxTW…P4wk</div>
                            </div>
                            <div>
                                <div className="label">Receive Token</div>
                                <div className="value">USDT</div>
                            </div>
                            <div>
                                <div className="label">Network</div>
                                <div className="value">Toncoin</div>
                            </div>
                        </div>
                        <div className="goodsDetailDom">
                            {
                                GoodsDom({
                                    imgUrl: '',
                                    tit: 'Apple iphone 16 Pro Max 512G',
                                    number: 90569010,
                                    amount: 1000
                                })
                            }
                            <div className="goodsDetail">
                                <div className="itemDom">
                                    <div className="label">Achieved Amount</div>
                                    <div className="value">$ 1,000</div>
                                </div>
                                <div className="itemDom">
                                    <div className="label"> Fee</div>
                                    <div className="value">-$ 1500</div>
                                </div>
                            </div>
                            <div className="totalAmount">
                                <span>Amount Received: </span>
                                <span className="color">$850</span>
                            </div>
                            <div className="payButton">Claim Now</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ClaimPage
