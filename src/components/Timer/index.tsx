import React, { useEffect, useState } from 'react'



export const getMillisecondsOfDays = (days: number) => {
    return 1000 * 60 * 60 * 24 * days
}

export const getSecondsOfDays = (days: number | string) => {
    return 60 * 60 * 24 * Number(days)
}

const formatTime = (d:number,h: number, m: number, s: number) => `${d}:${h}:${m}:${s}`

export const getDeltaTime = (time: number, to = Date.now()) => {
    const correctedTime = time * 1000
    const delta = /*14*24*60*60*1000 -*/ (correctedTime - to) / 1000
    return delta > 0 ? delta : 0
}

export const getDays = (delta: number) => {
    return Math.floor(delta / (60 * 60 * 24))
}

export const getHours = (delta: number) => {
    return Math.floor((delta / (60 * 60)) % 24)
}


export const getAllHours = (delta: number) => {
    return Math.floor(delta / (60 * 60))
}

export const getMinues = (delta: number) => {
    return Math.floor((delta / 60) % 60)
}

export const getSeconds = (delta: number) => {
    return Math.floor(delta % 60)
}

export const toDeltaTimer = (delta: number) => {
    return formatTime(getDays(delta),getHours(delta), getMinues(delta), getSeconds(delta))
}

export const OngoingTimer = (delta: number) => {
    return (
      <div className='timerValue'>
         <span className={'time'}>{getAllHours(delta)}</span>
         <span className="split">:</span>
         <span className={'time'}>{getMinues(delta)}</span>
         <span className="split">:</span>
         <span className={'time'}>{getSeconds(delta)}</span>
      </div>
    )
  }





export const TimerDom = ({
    timer,
    onZero,
    shouwDay = false,
    onGoing=false
}: {
    timer: number
    onZero: () => void
    shouwDay?: boolean
    onGoing?: boolean
}) => {
    const [time, setTime] = useState(getDeltaTime(timer))

    useEffect(() => {
        const tm = setInterval(() => setTime(getDeltaTime(timer)), 1000)
        return () => clearInterval(tm)
    }, [timer])

    useEffect(() => {
        if (!time) {
            console.log('notime')
            onZero()
        }
        // eslint-disable-next-line
    }, [time])
    if(onGoing){
        return <>{OngoingTimer(time)}</>
    }
    return <span>{toDeltaTimer(time)}</span>
}
