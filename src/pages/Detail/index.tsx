import { InfiniteScroll, List, Stepper } from 'antd-mobile'
import './index.scss'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { Swiper } from "antd-mobile";
import DetailTab from '@/components/DetailTab'

function FrensDetailPage() {
  const myLocation = useLocation()
  const [currentTab, setcurrentTab] = useState(0)


  useEffect(() => {
    console.log('====================================');
    console.log(myLocation, 'myLocation');
    console.log('====================================');


  }, [])

  return <div className="goodDetails">
    {/* 轮播展示 */}
    <div className="bannerDom">
      <Swiper autoplay loop>
        <Swiper.Item key={1}>
          <div className="imgDom">
            1
          </div>
        </Swiper.Item>
        <Swiper.Item key={2}>
          <div className="imgDom">
            2
          </div>
        </Swiper.Item>
      </Swiper>
    </div>
    {/* 不同状态显示按钮 */}
    <div className="buttonContainer">
      <div className="button1">Time Remaining: 23:59:59</div>
    </div>
    {/* 商品展示信息 */}
    <div className="goodsInfo">
      <div className="goodsTit">
        Apple iphone 16 Pro Max 512G
      </div>
      <div className="roundNum">
        <div className="text">Round Number: 2025136</div>
        <div className="label-drop">Drop mode</div>
      </div>
      <div className="price">
        1 USDT /
        <span className="pricetext">Entries</span>
      </div>
      {/* 进度条 */}
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `50%` }} >
            <span>{50}%</span>
          </div>
        </div>

      </div>
      {/* 进度展示 */}
      <div className="progress-show">
        <div className="showitem">
          <div className="num">1</div>
          <div className="text">Entries <br />Joined</div>
        </div>
        <div className="showitem">
          <div className="num">1</div>
          <div className="text">Total Entries <br />Required</div>
        </div>
        <div className="showitem">
          <div className="num">1</div>
          <div className="text">Qualified <br />Entries</div>
        </div>
        <div className="showitem">
          <div className="num">1</div>
          <div className="text">Entries <br />Remaining</div>
        </div>
      </div>
      {/* 进行时购买按钮 */}
      <div className="onlineCon">
        <div className="stepCon">
          <div className="text">Join Now</div>
          <Stepper min={-5} max={5} />
        </div>
        <div className="buyButton">
          Buy 1 USDT
        </div>
      </div>
    </div>
    {/* 参与信息 */}
    <div className="partCon">
      <div className="titText">My Participation</div>
      <div className="partText">
        <div className="partLabel">Entries Purchased</div>
        <div className="partValue">0</div>
      </div>
      <div className="partText">
        <div className="partLabel">Participation Asset</div>
        <div className="partValue">0  USDT</div>
      </div>
      <div className="partText">
        <div className="partLabel">Draw Number</div>
        <div className="partValue">You Have Not Joined the <br /> Draw Yet</div>
      </div>
    </div>
    {/* 权益展示 */}
    <div className="benefitDom">
      <div className="benefitTit">Benefits</div>
      <div className="benifitCon">
        <div className="benifitLabel">Winners Can Choose a Physical Prize or <br />Cryptocurrency</div>
        <div className="rightIcon"></div>
      </div>
    </div>
    {/* tab切换 */}
    <DetailTab className='tabCon'currentTab={currentTab} setcurrentTab={setcurrentTab} ></DetailTab>
  </div>
}

export default FrensDetailPage