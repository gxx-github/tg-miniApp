import EventBus from "@/utils/eventBus";
import './index.scss'
import { useEffect, useState } from "react";
import { Button, Swiper, Toast } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { initUtils } from '@telegram-apps/sdk-react';
import { setUserInfoAction } from "@/redux/slices/userSlice";
import { TonConnectButton, useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import banner1 from '../../assets/home/banner@2x.png'
import ScrollList from "../ScrollList";
import ShopCard from "../Card/shopCard";

export default function () {
  const userInfo = useSelector((state: any) => state.user.info);
  return <main>
    <Home userInfo={userInfo} />
  </main>
}

interface ListItem {
  level: "S" | "A" | "B" | "C"
  imageUrl: string
  title: string
  description: string
  progress: number // 0-100
  className?: string
  id: number
}

const shopItems = [
  {
    id: 1,
    level: "S" as const,
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "限定款手办模型",
    description: "精致手工制作，限量发售，独特编号收藏价值高",
    progress: 85,
  },
  {
    id: 2,
    level: "A" as const,
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "主题徽章套装",
    description: "原创设计，高品质材质，多款可选",
    progress: 60,
  },
  {
    id: 3,
    level: "B" as const,
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "动漫周边T恤",
    description: "舒适面料，时尚印花，多色可选",
    progress: 45,
  },
  {
    id: 4,
    level: "C" as const,
    imageUrl: "/placeholder.svg?height=200&width=200",
    title: "主题明信片",
    description: "精美印刷，特种纸张，收藏馈赠两相宜",
    progress: 30,
  },
]

function Home({ userInfo }: { userInfo: any }) {
  const [list, setList] = useState<ListItem[]>(shopItems)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  // 模拟获取数据
  const fetchData = async (pageNum: number): Promise<ListItem[]> => {
    return new Promise((resolve) => {
      // setTimeout(() => {
      //   const newData = Array.from({ length: 10 }, (_, i) => ({
      //     id: pageNum * 10 + i,
      //     title: `标题 ${pageNum * 10 + i}`,
      //     content: `这是第 ${pageNum * 10 + i} 条内容`,
      //   }))
      //   resolve(newData)
      // }, 1000)
    })
  }
  const handleRefresh = async () => {
    const newData = await fetchData(1)
    setList(newData)
    setPage(1)
    setHasMore(true)
  }

  const handleLoadMore = async () => {
    const nextPage = page + 1
    const newData = await fetchData(nextPage)

    if (newData.length < 10) {
      setHasMore(false)
    }

    setList((prev) => [...prev, ...newData])
    setPage(nextPage)
  }


  const renderItem = (item: ListItem, index: number) => {
    return (
      <ShopCard
        key={index}
        level={item.level}
        imageUrl={item.imageUrl}
        title={item.title}
        description={item.description}
        progress={item.progress}
      />
    )
  }
  return <div className="home fadeIn">
    <div className="contentDom">
      <div className="banner">
        <Swiper autoplay loop>
          <Swiper.Item key={1}>
            <div className="community">
              <img src={banner1} alt="" className="bgImg" />
            </div>
          </Swiper.Item>
          <Swiper.Item key={2}>
            <div className="community">
              <img src={banner1} alt="" className="bgImg" />
            </div>
          </Swiper.Item>
        </Swiper>
      </div>
      <div className="showTop">
        <div className="TopContainer">


          <div className="itemDom">
            <div className="text">Total Draw
              Amount ($)</div>
            <div className="value">10,000</div>
          </div>
          <div className="itemDom">
            <div className="text">Total
              Participants</div>
            <div className="value">10,000</div>
          </div>
          <div className="itemDom">
            <div className="text">Total<br />
              Draws</div>
            <div className="value">10,000</div>
          </div>
        </div>
      </div>
      <div className="textShow">
        <span className="text">Recommended for You</span>
        <span className="all" onClick={() => {
          navigate('/joindraw')
        }}>
          View All
          <div className="icon"></div>
        </span>
      </div>
    </div>

    <div className="scrollContainer">
      <ScrollList
        data={list}
        renderItem={renderItem}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
      />
    </div>
  </div>
}



