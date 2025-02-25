import { useEffect, useState } from 'react';
import './index.scss'
import empty from '../../assets/empty/empty@2x.png'
function EmptyDom() {


  return <div className='emptyDom' >
   <img src={empty} alt="" />
   <div className="text">No data yet</div>
  </div>
}

export default EmptyDom