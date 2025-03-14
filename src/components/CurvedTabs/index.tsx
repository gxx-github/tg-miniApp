"use client"

import { useState } from "react"
import './index.scss'



interface CurvedTabsProps {
  tabs: string[]
  defaultSelected?: string
  onTabChange?: (tabId: string,index:number) => void
}

export default function CurvedTabs({ tabs, defaultSelected , onTabChange }: CurvedTabsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultSelected)
  const handleTabClick = (tabId: string,num:number) => {
    setSelectedTab(tabId)
    onTabChange?.(tabId,num)
  }

  return (
    <div className='tabContainer'>
      <div className='tabs'>
        {tabs.map((tab,index) => (
          <button
            key={index}
            className={`tab ${selectedTab === tab ? 'selected' : ""}`}
            onClick={() => handleTabClick(tab,index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

