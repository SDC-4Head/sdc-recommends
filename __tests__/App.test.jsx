import React from 'react';
import { shallow } from 'enzyme';
import List from '../client/src/Components/List';
import RoomEntry from '../client/src/Components/RoomEntry';

describe('List tests', () => {
  it('renders list-items', () => {
    const house = [{ one: 'One' }, { two: 'two' }, { three: 'three' }];
    const wrapper = shallow(<List house={house} />);

    // Expect the wrapper object to be defined
    expect(wrapper.find('.scrolls')).toBeDefined();
    expect(wrapper.find('.roomEntry')).toHaveLength(house.length);
  });

  it('renders Rooms', () => {
    const entry = {
      _id: 19,
      title: 'Ut aliqua reprehenderit dolore laborum exercitation officia.',
      cost: 103,
      picture:
        'https://s3-us-west-1.amazonaws.com/fec-ericmai-photos/fec+Photos/Bedroom+(19).jpg',
      rcount: 1193,
      stars: 4,
      beds: 2,
      favorite: true,
      description:
        'Duis laborum occaecat laboris quis ad id Lorem Lorem. Sit occaecat Lorem magna eiusmod culpa esse et irure sit deserunt. Laborum ut dolore cillum deserunt eu.',
      __v: 0,
    };
    const wrapper = shallow(<RoomEntry entry={entry} />);
    expect(wrapper.find('.title')).toBeDefined();
    expect(wrapper.find('.photo')).toBeDefined();
    expect(wrapper.find('.boxie')).toBeDefined();
  });

  it('Display Cost', () => {
    const entry = {
      _id: 19,
      title: 'Ut aliqua reprehenderit dolore laborum exercitation officia.',
      cost: 103,
      picture:
        'https://s3-us-west-1.amazonaws.com/fec-ericmai-photos/fec+Photos/Bedroom+(19).jpg',
      rcount: 1193,
      stars: 4,
      beds: 2,
      favorite: true,
      description:
        'Duis laborum occaecat laboris quis ad id Lorem Lorem. Sit occaecat Lorem magna eiusmod culpa esse et irure sit deserunt. Laborum ut dolore cillum deserunt eu.',
      __v: 0,
    };
    const wrapper = shallow(<RoomEntry entry={entry} />);
    expect(wrapper.find('.roomcost')).toBeDefined();
    expect(wrapper.find('.roomcost').text()).toEqual('$103 per night');
  });

  it('', () => {
    const entry = {
      _id: 19,
      title: 'Ut aliqua reprehenderit dolore laborum exercitation officia.',
      cost: 103,
      picture:
        'https://s3-us-west-1.amazonaws.com/fec-ericmai-photos/fec+Photos/Bedroom+(19).jpg',
      rcount: 1193,
      stars: 4,
      beds: 2,
      favorite: true,
      description:
        'Duis laborum occaecat laboris quis ad id Lorem Lorem. Sit occaecat Lorem magna eiusmod culpa esse et irure sit deserunt. Laborum ut dolore cillum deserunt eu.',
      __v: 0,
    };
    const wrapper = shallow(<RoomEntry entry={entry} />);
    expect(wrapper.find('.roomcost')).toBeDefined();
    expect(wrapper.find('.roomcost').text()).toEqual('$103 per night');
  });
});
