import './index.scss';
import { FC, useEffect, useState } from 'react';
import icon from '../../assets/aladdin/icon@2x.png'
import rightImg from '../../assets/profile/Enter.svg'


export const AladdinPage: FC = () => {
    const listJump = [
        {
            text: 'Platform Introduction',
            link: ''
        },
        {
            text: 'Terms of Service',
            link: ''
        },
        {
            text: 'Disclaimer',
            link: ''
        },
    ]

    return (
        <div className='aliaddinPage'>
            <div className="topCon">
                <img src={icon} alt="" />
                <div className="tit">Aladdin</div>
                <div className="intro">
                    $1 Lucky Draw – <br />
                    Win Your Dream Prizes with Ease!
                </div>
            </div>
            <div className="jumpList">
                {
                    listJump.map((item, index) => {
                        return <div className="itemlist" key={index} >
                            <div className="text">{item.text}</div>
                            <img src={rightImg} alt="" />
                        </div>
                    })
                }
            </div>
            <div className="bottomDom">
                <div className="text1">Aladdin Technologies Ltd.</div>
                <div className="text2">Copyright © Aladdin, All Rights Reserved.</div>
            </div>
        </div>
    )
}

export default AladdinPage
