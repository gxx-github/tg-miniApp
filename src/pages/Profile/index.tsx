import './index.scss';
import '@/trackers'
import { FC, useEffect, useState } from 'react';
import icon1 from '../../assets/profile/icon1.svg'
import icon2 from '../../assets/profile/icon2.svg'
import icon3 from '../../assets/profile/icon3.svg'
import icon4 from '../../assets/profile/icon4.svg'
import rightImg from '../../assets/profile/Enter.svg'
import userImg from '../../assets/profile/user@2x.png'
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {
    const [tonConnectUI] = useTonConnectUI();
      const navigate = useNavigate()
      useEffect(() =>
        tonConnectUI.onStatusChange(wallet => {
            console.log(wallet,'wallet');
            console.log(wallet?.connectItems,'wallet111');
            
            if (wallet && wallet.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {
                // checkProofInYourBackend(wallet.connectItems.tonProof.proof, wallet.account);
            }
        }), []);
const ListItem = [
    {
        icon:icon1,
        text:'Asset Details',
        link:'/assets'
    },
    {
        icon:icon2,
        text:'Draw History',
        link:'/drawhistory'
    },
    {
        icon:icon3,
        text:'Winning History',
        link:'/winhistory'
    },
    {
        icon:icon4,
        text:'About Aladdin',
        link:'/aladdin'
    },
]
const handleJump = (link:string)=>{
    if(link){
        navigate(link) 
    }
}
    return (
        <div className="profileCon">
            <div className="walletCon">
                <div className="userInfoDom">
                    <div className="imgDom">
                        <img src={userImg} alt="" />
                    </div>
                    <div className="userInfo">
                        <div className="account">UQAxTW…P4wk</div>
                        <div className="address">#14701382</div>
                    </div>
                </div>
                <div className="connectButton">
                    <TonConnectButton className="connect-btn" />

                </div>
            </div>
            <div className="serviceDom">
                <div className="tit">My Services</div>
                {
                    ListItem.map((item,index)=>{
                        return <div className="itemDom" key={index} onClick={()=>handleJump(item.link)}>
                           <span className='left'>
                           <img src={item.icon} alt="" className="icon" />
                           <div className="text">{item.text}</div>
                           </span>
                            <img src={rightImg} alt="" className="right" />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ProfilePage
