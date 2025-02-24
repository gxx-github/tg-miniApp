import EventBus from "@/utils/eventBus";
import './index.scss'
import { useEffect, useState } from "react";
import starIcon from '@/assets/h-star.png'
import checkIcon from '@/assets/h-right.png'
import friendsIcon from '@/assets/h-friends.png'
import gameIcon from '@/assets/game.png'
import taskIcon from '@/assets/task.png'
import walletIcon from '@/assets/wallet.png'
import { Button, Swiper, Toast } from "antd-mobile";
import { judgeIsCheckIn } from '@/utils/common'
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoReq, userCheckReq, bindWalletReq } from "@/api/common";
import { initUtils } from '@telegram-apps/sdk-react';
import { setUserInfoAction } from "@/redux/slices/userSlice";
import LogoIcon from '@/assets/logo.jpg'
import { TonConnectButton, useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";

export default function () {
  const userInfo = useSelector((state: any) => state.user.info);
  return <main>
    <Home userInfo={userInfo} />
  </main>
}

function Home({ userInfo }: { userInfo: any }) {
  const eventBus = EventBus.getInstance()
  const utils = initUtils();
  const [loading, setLoading] = useState(false)
  const wallet = useTonWallet()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleToScore = async () => {
    eventBus.emit('updateStep', 2)
  }


  const handlePlayGame = () => {
    if (userInfo?.playGameTimes > 0) {
      navigate('/emjoyGame')
    } else {
      Toast.show({
        content: 'The number of times today has been used up',
        duration: 3000,
      })
    }
  }
  useEffect(() => {
    //连接钱包与否
    if (wallet?.account) {
      dispatch(setUserInfoAction('2'))
    
    }
  }, [wallet])
  return <div className="home fadeIn">
    <div className="wrapper">
      <Swiper autoplay loop>
        <Swiper.Item key={1}>
          <div className="community">
            <div className="Hamsters-com">Hamster COMMUNITY</div>
            <div className="home-tg">Home for Telegram OGs</div>
            <div className="join-btn" onClick={() => {
              utils.openTelegramLink('https://t.me/hamstermemedapp')
            }}>Join 💰</div>
            <div className="heart">💖</div>
          </div>
        </Swiper.Item>
        <Swiper.Item key={2}>
          <div className="community">
            <div className="Hamsters-com">FOLOW US ON X.COM</div>
            <div className="home-tg">stay updated with the latest news</div>
            <div className="join-btn" onClick={() => {
              window.open('https://x.com/Hamster_meme_')
            }}>Follow 🐹</div>
            <div className="heart">💥</div>
          </div>
        </Swiper.Item>
      </Swiper>
    </div>
  </div>
}



