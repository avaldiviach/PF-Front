import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Countdown, { zeroPad } from 'react-countdown';
import s from './counter.module.css'

function Counter({expiration}) {
    let id = 11;

    const [timeL, setTimeL] = useState(0);
    const discount = useSelector(state => state.discount);



    const Completionist = () => <span>The offer price has expired!</span>;

    function diff() {
        const date = new Date();
        const dateA = date.toLocaleString('en-US',{ timeZone: 'America/Argentina/Buenos_Aires' })
        const date1 = new Date(dateA)
        const date2 = new Date(expiration)
        const diffTime = Math.abs(date2 - date1);
        return diffTime;
    }
    const renderer = ({ days, hours, minutes, seconds }) => (
        <div className={s.counter}>
            <section className={s.section}>
                <div className={s.date}>{zeroPad(days)} </div>
                <span>Days</span>
            </section>
            <p>:</p>
            <section className={s.section}>
                <div className={s.date}>{zeroPad(hours)}</div>
                <span>Hours</span>
            </section>
            <p>:</p><section className={s.section}>
                <div className={s.date}>{zeroPad(minutes)}</div>
                <span>Minutes</span>
            </section>
            <p>:</p>
            <section className={s.section}>
                <div className={s.date}>{zeroPad(seconds)}</div>
                <span>Seconds</span>
            </section>
        </div>
    );

    useEffect(() => {

        setTimeL(diff())


    }, [discount]);

    return (
        <div>
            {timeL > 0 
            && <Countdown date={Date.now() + timeL} renderer={renderer}>
                <Completionist />
            </Countdown>
            }
        </div> 
        )
}

export default Counter;