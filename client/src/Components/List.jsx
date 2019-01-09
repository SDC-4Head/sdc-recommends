import React from 'react';
import RoomEntry from './RoomEntry.jsx';

const list = (props) => {
  const { house } = props;
  return (
    <div className="hide">
      <div className="scrolls">
        {house.map(entry => (
          <RoomEntry className="roomEntry" key={entry._id} entry={entry} />
        ))}
      </div>
    </div>

  );
};

export default list;
