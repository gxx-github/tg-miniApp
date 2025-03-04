"use client"

import type React from "react"
import { useState } from "react"
import ScrollList from "../../components/ScrollList"
import "./index.scss"
import ShopCard from "@/components/Card/shopCard"

// 活动状态类型
type ActivityStatus = "Ongoing" | "Not Started" | "Pending Draw" | "Draw Completed" | "Not Reached"

// 排序类型
type SortType = "Default" | "Entries Remaining" | "Price" | "Participation Progress" | "End Time" | 'Start Time' | 'Total Entries Required' | 'Participants' | 'Total Draw Amount' | 'Achieved Amount' | 'I Won' | "Pending Claim"| "Claimed"

// 排序方向
type SortDirection = "asc" | "desc"

// 列表项数据类型
interface ActivityItem {
  id: number
  level: "S" | "A" | "B" | "C"
  imageUrl: string
  title: string
  description: string
  progress: number
  price: number
  remainingCount: number
  endTime: string
  status: ActivityStatus
}

const JoinDrawPage: React.FC = () => {
  // 排序选项
  const sortOptions1: SortType[] = ["Default", "Entries Remaining", "Price", "Participation Progress", "End Time"]
  const sortOptions2: SortType[] = ["Default", "Total Entries Required", "Price", "Start Time"]
  const sortOptions3: SortType[] = ["Default", "Participants", "Total Draw Amount", ]
  const sortOptions4: SortType[] = ["Default", "Achieved Amount", 'I Won']
  const sortOptions5: SortType[] = ["Default", "Pending Claim", "Claimed", ]
  // Tab列表
  const tabs: ActivityStatus[] = ["Ongoing", "Not Started", "Pending Draw", "Draw Completed", "Not Reached"]
  // 状态管理
  const [activeTab, setActiveTab] = useState<ActivityStatus>("Ongoing")
  const [sortType, setSortType] = useState<SortType>("Default")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<ActivityItem[]>([])
  const [sortOptionsTab, setsortOptionsTab] = useState(sortOptions1)
  // 处理Tab切换
  const handleTabChange = (tab: ActivityStatus) => {
    setActiveTab(tab)
    setList([])
    setPage(1)
    setHasMore(true)
    fetchData(1, tab, sortType, sortDirection)
    switch (tab) {
      //未开始
      case 'Not Started':
        setsortOptionsTab(sortOptions2)
        break;
      //待开奖
      case 'Pending Draw':
        setsortOptionsTab(sortOptions3)
        break;
      //已开奖
      case 'Draw Completed':
        setsortOptionsTab(sortOptions4)
        break;
      //未达成
      case 'Not Reached':
        setsortOptionsTab(sortOptions5)
        break;

      default:
        setsortOptionsTab(sortOptions1)
        break;
    }
  }

  // 处理排序切换
  const handleSortChange = (type: SortType) => {
    if (type === sortType) {
      // 如果点击同一个排序类型，切换排序方向
      const newDirection = sortDirection === "desc" ? "asc" : "desc"
      setSortDirection(newDirection)
      setList([])
      setPage(1)
      fetchData(1, activeTab, type, newDirection)
    } else {
      // 切换排序类型，默认降序
      setSortType(type)
      setSortDirection("desc")
      setList([])
      setPage(1)
      fetchData(1, activeTab, type, "desc")
    }
  }

  // 模拟获取数据
  const fetchData = async (pageNum: number, status: ActivityStatus, sort: SortType, direction: SortDirection) => {
    // 模拟 API 请求
    return new Promise<ActivityItem[]>((resolve) => {
      setTimeout(() => {
        const newData = Array.from({ length: 10 }, (_, i) => ({
          id: pageNum * 10 + i,
          level: ["S", "A", "B", "C"][Math.floor(Math.random() * 4)] as "S" | "A" | "B" | "C",
          imageUrl: `/placeholder.svg?height=200&width=200&text=Activity${pageNum * 10 + i}`,
          title: `活动 ${pageNum * 10 + i}`,
          description: `这是活动 ${pageNum * 10 + i} 的描述信息`,
          progress: Math.floor(Math.random() * 100),
          price: Math.floor(Math.random() * 1000),
          remainingCount: Math.floor(Math.random() * 100),
          endTime: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
          status: status,
        }))
        resolve(newData)
      }, 1000)
    })
  }

  // 处理下拉刷新
  const handleRefresh = async () => {
    const newData = await fetchData(1, activeTab, sortType, sortDirection)
    setList(newData)
    setPage(1)
    setHasMore(true)
  }

  // 处理加载更多
  const handleLoadMore = async () => {
    const nextPage = page + 1
    const newData = await fetchData(nextPage, activeTab, sortType, sortDirection)

    if (newData.length < 10) {
      setHasMore(false)
    }

    setList((prev) => [...prev, ...newData])
    setPage(nextPage)
  }

  // 渲染列表项
  const renderItem = (item: ActivityItem) => {
    return (
      <ShopCard
        level={item.level}
        imageUrl={item.imageUrl}
        title={item.title}
        description={item.description}
        progress={item.progress}
      />
    )
  }

  return (
    <div className="activity-list-page">
      {/* 状态标签栏 */}
      <div className="tab-bar">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 排序选项栏 */}
      <div className="sort-bar">
        {sortOptionsTab.map((option) => (
          <div
            key={option}
            className={`sort-item ${sortType === option ? "active" : ""}`}
            onClick={() => handleSortChange(option)}
          >
            <span>{option}</span>
            {sortType === option && <span className="sort-direction">{sortDirection === "desc" ? "↓" : "↑"}</span>}
          </div>
        ))}
      </div>

      {/* 列表内容区 */}
      <div className="list-container">
        <ScrollList
          data={list}
          renderItem={renderItem}
          onRefresh={handleRefresh}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          emptyText={`暂无${activeTab}的活动`}
        />
      </div>
    </div>
  )
}

export default JoinDrawPage

