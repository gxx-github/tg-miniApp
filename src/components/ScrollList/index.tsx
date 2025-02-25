"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import './index.scss'
import EmptyDom from "../Empty"

interface ScrollListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  onRefresh?: () => Promise<void>
  onLoadMore?: () => Promise<void>
  hasMore?: boolean
  className?: string
  emptyText?: string
}

const ScrollList = <T,>({
  data,
  renderItem,
  onRefresh,
  onLoadMore,
  hasMore = false,
  className = "",
  emptyText = "暂无数据",
}: ScrollListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [pullDistance, setPullDistance] = useState(0)

  const MAX_PULL_DISTANCE = 80
  const REFRESH_THRESHOLD = 60

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      if (loading || !hasMore || !onLoadMore) return

      const { scrollTop, clientHeight, scrollHeight } = container
      if (scrollHeight - scrollTop - clientHeight < 50) {
        handleLoadMore()
      }
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore, onLoadMore])

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!onRefresh) return
    const { scrollTop } = containerRef.current || {}
    if (scrollTop && scrollTop > 0) return

    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!onRefresh || touchStart === 0) return
    const { scrollTop } = containerRef.current || {}
    if (scrollTop && scrollTop > 0) return

    const distance = Math.max(0, e.touches[0].clientY - touchStart)
    const pullDistance = Math.min(distance * 0.5, MAX_PULL_DISTANCE)
    setPullDistance(pullDistance)

    if (pullDistance > 0) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = async () => {
    if (!onRefresh || touchStart === 0) return

    if (pullDistance > REFRESH_THRESHOLD) {
      setRefreshing(true)
      setPullDistance(REFRESH_THRESHOLD)
      try {
        await onRefresh()
      } finally {
        setRefreshing(false)
      }
    }

    setTouchStart(0)
    setPullDistance(0)
  }

  const handleLoadMore = async () => {
    if (!onLoadMore || loading || !hasMore) return

    setLoading(true)
    try {
      await onLoadMore()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`scrollList ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={'pullDownContent'}
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? "transform 0.3s" : "none",
        }}
      >
        {pullDistance > 0 && (
          <div className={'pullDownIndicator'}>
            {refreshing ? "刷新中..." : pullDistance > REFRESH_THRESHOLD ? "释放刷新" : "下拉刷新"}
          </div>
        )}

        {data.length === 0 ? (
          <div className={'emptyContent'}>

            <EmptyDom></EmptyDom>
          </div>

        ) : (
          <>
            {data.map((item, index) => {
              return <> {renderItem(item, index)} </>
            })}
          </>
        )}

        {hasMore && <div className={'loadingMore'}>{loading ? "加载中..." : "上拉加载更多"}</div>}
      </div>
    </div>
  )
}

export default ScrollList

