import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import Wish from './Wish';
import githubLogo from './githubLogo.svg';
import { Link } from 'react-router-dom';

const Birthday = ({ name, day, month }) => {
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

  if (!name || !day || !month) {
    name = 'Friend';
    month = 6;
    day = 12;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const today = now.getDate();
      const thisMonth = now.getMonth() + 1;

      // Check if today is birthday
      if (today === parseInt(day) && thisMonth === parseInt(month)) {
        setState((prev) => ({
          ...prev,
          isItBday: true,
        }));
        return;
      }

      // Else countdown
      let target = new Date(now.getFullYear(), month - 1, day);
      if (now > target) {
        target.setFullYear(target.getFullYear() + 1);
      }

      const diff = target - now;
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setState({
        seconds,
        minutes,
        hours,
        days,
        isItBday: false,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [day, month]);

  const birth = new Date(new Date().getFullYear(), month - 1, day);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthBday = monthNames[birth.getMonth()];

  return (
    <div className='page'>
      {state.isItBday ? (
        <Wish name={name} />
      ) : (
        <>
          <Countdown countdownData={state} name={name} />
          <div className='birthdate'>
            Birth-Date: {day} {monthBday}
          </div>
        </>
      )}
      <div className='credits'>
        <a href='https://github.com/Deep-Codes'>
          <img src={githubLogo} alt='Github' className='github-logo' />
        </a>
      </div>
      <Link to='/generate'>Generate Here</Link>
    </div>
  );
};

export default Birthday;
