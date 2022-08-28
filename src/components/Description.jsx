import React from 'react';
import { BsChevronBarDown, BsChevronBarUp } from 'react-icons/bs';

import { TbMoodHappy } from 'react-icons/tb';
import { GiPressureCooker, GiWindsock } from 'react-icons/gi';
import { MdOutlineWaterDrop } from 'react-icons/md';

import './Description.css';

const Description = ({ weather, units }) => {
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'm/h';
  const cards = [
    {
      id: 1,
      icon: <BsChevronBarDown />,
      title: 'min',
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <BsChevronBarUp />,
      title: 'max',
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <TbMoodHappy />,
      title: 'feels like',
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <GiPressureCooker />,
      title: 'pressure',
      data: weather.pressure,
      unit: 'hPa',
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: 'humidity',
      data: weather.humidity,
      unit: '%',
    },
    {
      id: 6,
      icon: <GiWindsock />,
      title: 'wind speed',
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];

  return (
    <div className='section section__descriptions'>
      {cards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className='card'>
          <div className='description__card-icon'>
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Description;
