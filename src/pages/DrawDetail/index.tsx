import { InfiniteScroll,Dialog } from 'antd-mobile'
import './index.scss'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import EmptyDom from '@/components/Empty';
import payLogo from '../../assets/detail/payLogo.png'
import moment from 'moment';
import NumberModel from '@/components/NumberModel';
interface ItemProps {
    time: number;
    pay: number;
    number: number[];
}
const test = [
    {
        time: 1741968671,
        pay: 25,
        number: [100122, 100123]
    }
]

function DrawDetailPage() {
    const myLocation = useLocation()
    const [drawData, setdrawData] = useState([] as ItemProps[])
    const [hasMore, setHasMore] = useState(true)


    const loadMore = async () => {
        const append = test
        if (append.length > 0) {
            setTimeout(() => {
                setdrawData(val => [...val, ...test])

                setHasMore(true)
            }, 3000)
        }
    }
    const showRoundModel = ()=>{
        Dialog.show({
            header:'',
            content: <NumberModel></NumberModel>,
            className:'roundModel',
            closeOnMaskClick: true,
          })
    }
    useEffect(() => {
        console.log('====================================');
        console.log(myLocation, 'myLocation');
        console.log('====================================');

    }, [])

    return <div className="drawDetails">
        {/* 顶部展示信息 */}
        <div className="infoDom">
            <div className="labelItem">
                <div className="label">My Participation</div>
                <div className="value color">Round Number：90569010</div>
            </div>
            <div className="labelItem">
                <div className="label">Entries Purchased</div>
                <div className="value">25</div>
            </div>
            <div className="labelItem">
                <div className="label">Participation Asset</div>
                <div className="value">125 USDT</div>
            </div>
            <div className="labelItem">
                <div className="label">Draw Number</div>
                <div className="value">100122, 100123,
                    <span className="color1" onClick={showRoundModel}>View More</span>
                </div>
            </div>
        </div>
        <div className="listContainer">
            <div className="tit">Payment History </div>
            <div className="listhisDom">
                <div className="ListItem header">
                    <div>Time/TXID</div>
                    <div>Payment<br /> Asset</div>
                    <div>Draw <br />Number</div>
                </div>
                {
                    drawData.length !== 0 ?
                        drawData.map((item, index) => (
                            <div className="ListItem" key={index} >
                                <div>
                                    <div className="timer">
                                        {
                                            moment(item.time*1000).format('YYYY-MM-DD HH:mm:ss')
                                        }
                                        </div>
                                    <div className="addr">
                                        39b0f0...fc581f
                                        <div className="icon"></div>
                                    </div>
                                </div>
                                <div>
                                    <img src={payLogo} alt="" />
                                    <span>{item.pay}</span>
                                </div>
                                <div>{item.number.join(', ')}<br/>
                                    <span className="color1" onClick={showRoundModel}>View More</span>
                                </div>
                            </div>
                        )) : <EmptyDom></EmptyDom>
                }
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </div>
        </div>
        {/* 列表展示 */}

    </div>
}

export default DrawDetailPage