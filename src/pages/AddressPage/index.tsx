import { useNavigate } from 'react-router-dom';
import './index.scss';
import { FC, useEffect, useState } from 'react';


export const AddressPage: FC = () => {
    const navigate = useNavigate()

    return (
        <div className='addressContainer' >
            <div className='addressListDom' ></div>
            <div className='addAddressButton' onClick={()=>{
                navigate('/addaddress')
            }}>
                <div className="icon"></div>
                <div className="text">Add Shipping Address</div>
            </div>
        </div>
    )
}

export default AddressPage
