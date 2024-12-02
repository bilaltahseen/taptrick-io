import React from 'react';
import GridItem from './GridItem';
import { FaUserFriends, FaStore, FaChartBar, FaGlobe, FaQrcode, FaPlug } from 'react-icons/fa';

const items = [
  {
    Icon: FaUserFriends,
    title: 'Grow your followers across all your social platforms',
    description: 'Give your followers easy access to all of your content in one simple link. Now everything you do is just one tap away!'
  },
  {
    Icon: FaChartBar,
    title: 'Grow with in-depth user analytics',
    description: 'Use powerful analytics to know what your followers are engaging with, and use the insights to grow your followers and business.'
  },
  {
    Icon: FaGlobe,
    title: 'Create a custom mini-website in seconds',
    description: 'Create your own Taptric in just seconds and customizeit in a way that reflects your brand or style.'
  },
];

const GridContainer = () => {
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item, index) => (
        <GridItem
          key={index}
          Icon={item.Icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default GridContainer;
