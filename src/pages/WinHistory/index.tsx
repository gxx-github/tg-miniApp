import CurvedTabs from '@/components/CurvedTabs';
import './index.scss';
import { FC, useState } from 'react';
import HistoryCard from '@/components/Card/historyCard';

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

export const WinHistory: FC = () => {
  // Tab列表
  const tabs = ["Pending Claim",  "Claimed"]
        const [currTabId, setcurrTabId] = useState(0)
    
      const handleTabChange = (tabId: string,num:number) => {
        console.log("Selected tab:", tabId,num)
        setcurrTabId(num)

      }
      const lotteryEntries: LotteryEntry[] = [
        {
          id: "1",
          type: "Normal",
          productName: "Apple iPhone 16 Pro Max 512G",
          productImage: "/iphone-16-pro.png",
          roundNumber: "90569010",
          cost: "1 USDT",
          entries: "Entries",
          participationAmount: "$ 25",
          timeRemaining: {
            hours: "23",
            minutes: "59",
            seconds: "59",
          },
          status: "Ongoing",
        },
        {
          id: "2",
          type: "Drop",
          productName: "Apple iPhone 16 Pro Max 512G",
          productImage: "/iphone-16-pro.png",
          roundNumber: "90569010",
          cost: "1 USDT",
          entries: "Entries",
          participationAmount: "$ 25",
          timeRemaining: {
            hours: "23",
            minutes: "59",
            seconds: "59",
          },
          status: "Ongoing",
        },
      ]

  return (
    <div className='winHistory'>
     <CurvedTabs tabs={tabs} defaultSelected="Pending Claim" onTabChange={handleTabChange} />
     <div className="winContainer">
        {lotteryEntries.map((entry) => {
          return <HistoryCard data={entry} cardType={'win'} curTab={currTabId} ></HistoryCard>
        })}
      </div>
    </div>
  )
}

export default WinHistory
