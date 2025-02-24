
import './index.scss'
import LOGO from '@/assets/logo.jpg'
import { useEffect } from 'react'
import EventBus from '@/utils/eventBus';

export default function () {
  const eventBus = EventBus.getInstance();

  useEffect(() => {
    setTimeout(() => {
      eventBus.emit('updateStep', 1)

    }, 100);


    return () => {

    }
  }, [])

  return <div className='begin-wrapper'>
    <img src={LOGO} alt="logo" />
    <span>Who are you dawg?</span>
  </div>
}