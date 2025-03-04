import './index.scss';
import { useEffect, useState } from 'react';
import EventBus from '@/utils/eventBus';
import { useLocation, useNavigate } from 'react-router-dom';
import { initBackButton } from '@telegram-apps/sdk';
import Home from '../../assets/footer/Home.svg'
import Draw from '../../assets/footer/Draw.svg'
import Profile from '../../assets/footer/Profile.svg'
import Home_active from '../../assets/footer/Home-active.svg'
import Draw_active from '../../assets/footer/Draw-active.svg'
import Profile_active from '../../assets/footer/Profile-active.svg'
export default function () {
    const eventBus = EventBus.getInstance()
    const [currentTab, setCurrentTab] = useState('Home')
    const myLocation = useLocation()
    const [isShowFooter, setShowFooter] = useState(true)
    const [backButton] = initBackButton()
    const navigate = useNavigate()
    const handleClickTab = (item: any) => {
        navigate(item.to)
    }
    const [menu, setMenu] = useState([
        {
            title: 'Home',
            icon: Home,
            activeIcon:Home_active,
            to: '/'
        },
        {
            title: 'Join Draw',
            icon: Draw,
            activeIcon:Draw_active,
            to: '/joindraw',
        },
        {
            title: 'Profile',
            icon: Profile,
            activeIcon:Profile_active,
            to: '/profile'
        },
     
    ])
    useEffect(() => {
        let flag = true
        if (myLocation.pathname) {
            flag = menu.map((item) => { return item.to }).includes(myLocation.pathname)
            setShowFooter(flag)
        } else {
            setShowFooter(true)
        }
        if (flag) {
            backButton.hide()
        } else {
            backButton.show();
        }
    }, [myLocation.pathname])
    return <footer className="footer" style={{ display: isShowFooter ? 'block' : 'none' }}>
        <div className='list'>
            {
                menu.map((item => {
                    return <div className={`menu ${myLocation.pathname == item.to ? 'active' : ''}`} key={item.title} onClick={() => handleClickTab(item)}>
                        <img src={myLocation.pathname == item.to ? item.activeIcon:item.icon} alt="" />
                        <p>{item.title}</p>
                    </div>
                }))
            }
        </div>
    </footer>
}
