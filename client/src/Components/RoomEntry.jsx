import React, { Component } from 'react';

class RoomEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: false,
    };
  }

  render() {
    const {
      picture, beds, title, cost, stars, rcount,
    } = this.props.entry;

    return (
      <div className="boxie">
        <div className="heart" />
        <img alt="photor" className="photo" src={picture} />
        <p className="roomtype">
          {`PRIVATE ROOM  · ${beds} bed`}
        </p>
        <h5 className="title">{title}</h5>

        <p className="roomcost">{`$${cost} per night`}</p>
        {/* <p>{this.props.entry.description}</p> */}
        <div className="ratingStars">
          <span
            className={`${`fa fa-star ${
              stars >= 1 ? 'checked' : 'fastar'}`}`}
          />
          <span
            className={`${`fa fa-star ${
              stars >= 2 ? 'checked' : 'fastar'}`}`}
          />
          <span
            className={`${`fa fa-star ${
              stars >= 3 ? 'checked' : 'fastar'}`}`}
          />
          <span
            className={`${`fa fa-star ${
              stars >= 4 ? 'checked' : 'fastar'}`}`}
          />
          <span
            className={`${`fa fa-star ${
              stars >= 5 ? 'checked' : 'fastar'}`}`}
          />
          <p className="review">{rcount}</p>
        </div>
      </div>
    );
  }
}

export default RoomEntry;
