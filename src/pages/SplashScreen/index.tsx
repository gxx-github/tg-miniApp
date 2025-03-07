"use client"

import { useEffect, useState } from "react"
import './index.scss'
import bg from '../../assets/screen/bg.png'
import logoImg from '../../assets/screen/logo@2x.png'

interface SplashScreenProps {
  onFinish: () => void
  duration?: number
  minDuration?: number
  logo?: string
  appName?: string
}

export default function SplashScreen({
  onFinish,
  duration = 2000,
  minDuration = 1000,
  appName = "TON Assets",
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    let animationFrameId: number
    let timeoutId: NodeJS.Timeout

    // 进度条动画
    const animateProgress = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)

      setProgress(newProgress)

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(animateProgress)
      } else {
        // 确保至少显示最小持续时间
        const remainingTime = Math.max(0, minDuration - elapsed)

        timeoutId = setTimeout(() => {
          // 开始淡出动画
          setIsVisible(false)

          // 等待淡出动画完成后调用 onFinish
          setTimeout(onFinish, 300)
        }, remainingTime)
      }
    }

    // 开始动画
    animationFrameId = requestAnimationFrame(animateProgress)

    // 清理函数
    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(timeoutId)
    }
  }, [duration, minDuration, onFinish])

  return (
    <div className={`splashScreen ${!isVisible ? 'fadeOut' : ""}`}>
      <div className='content'>
        <div className="top">
        <img src={bg} alt={appName} className='logo' />

        </div>
        <div className="bottom">
            <img src={logoImg} alt="" />
            <div className="con">
                <div className="tit">Aladdin</div>
                <div className="intro">
                $1 Lucky Draw – Win Your<br/> Dream Prizes with Ease! 
                </div>
            </div>
        </div>
       
        {/* <div className='progressContainer'>
          <div
            className='progressBar'
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          ></div>
        </div> */}
      </div>
    </div>
  )
}

