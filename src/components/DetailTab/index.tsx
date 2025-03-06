import './index.scss';
import { FC, useEffect, useState } from 'react';
import { InfiniteScroll, List } from 'antd-mobile'
interface TabProps {
    className?: string
    currentTab: number
    setcurrentTab: (e: any) => void

}
interface HistoryItem {
    address: string
    entry: number
    number: number[]
}
const testData = [
    {
        address: '39b0f0…fc581f',
        entry: 7,
        number: [100122, 100123]
    },
    {
        address: '39b0f0…fc581f',
        entry: 7,
        number: [100122, 100123]
    },
    {
        address: '39b0f0…fc581f',
        entry: 7,
        number: [100122, 100123]
    },
    {
        address: '39b0f0…fc581f',
        entry: 7,
        number: [100122, 100123]
    },
]
export const DetailTab: FC<TabProps> = ({ className, currentTab, setcurrentTab }) => {
    const Tabsitem = ['Basic Information', 'Participation History', 'Prize Description']
    const [historyData, sethistoryData] = useState<HistoryItem[]>(testData)
    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
        //请求数据接口，处理页码增加
        const append = testData
        if (append.length > 0) {
            setTimeout(() => {
                sethistoryData(val => [...val, ...testData])

                setHasMore(true)
            }, 3000)
        }

    }
    return (
        <div className={className}>
            <div className="tabListDom">
                {
                    Tabsitem.map((item, index) => (
                        <div
                            className={`tabItem ${index === currentTab ? 'active' : ''}`}
                            key={index}
                            onClick={() => setcurrentTab(index)}
                        >
                            {item}
                        </div>
                    ))
                }
            </div>
            {/* 内容区 */}
            {
                currentTab === 0 && <div className="basicInfoDom">
                    <div className="basicDiv">
                        <div className="label">Prize Name</div>
                        <div className="value">Apple iphone 16 Pro Max 512G</div>
                    </div>
                    <div className="basicDiv">
                        <div className="label">Round Number</div>
                        <div className="value">2025136</div>
                    </div>
                    <div className="basicDiv">
                        <div className="label">Price</div>
                        <div className="value">$1/Entries </div>
                    </div>
                    <div className="basicDiv">
                        <div className="label">Total Entries Required</div>
                        <div className="value">1,000</div>
                    </div>
                    <div className="basicDiv">
                        <div className="label">Draw Mode</div>
                        <div className="value">Drop mode</div>
                    </div>
                    <div className="basicDiv">
                        <div className="label">Start Time</div>
                        <div className="value">2025-01-08 12:00:00 (UTC)</div>
                    </div>
                    <div className="basicDiv">
                        <div className="label">End Time</div>
                        <div className="value">2025-01-08 12:00:00 (UTC)</div>
                    </div>
                    <div className="basicDiv">
                        <div className="label">Draw Time</div>
                        <div className="value">2025-01-08 12:00:00 (UTC)</div>
                    </div>
                    <div className="basicDiv">
                        <div className="label">Claim Deadline</div>
                        <div className="value">2025-01-08 12:00:00 (UTC)</div>
                    </div>
                </div>
            }
            {
                currentTab === 1 && <div className="historyDom">
                    <div className="historyTop">
                        <div>Address</div>
                        <div>Entries <br />Purchased</div>
                        <div>Draw<br /> Number</div>
                    </div>
                    <div className="historyCon">
                        {historyData.map((item, index) => (
                            <div className="historyItem">
                                <div>{item.address}</div>
                                <div>{item.entry}</div>
                                <div>{item.number.join(', ')}</div>
                            </div>
                        ))}
                        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
                    </div>
                </div>
            }
            {
                currentTab === 2 && <div className="desDom"></div>
            }
        </div>
    )
}

export default DetailTab
