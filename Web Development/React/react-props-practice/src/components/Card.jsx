import React from "react";
import Avatar from "./Avatar";
import Details from "./Details";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        {/* <p>{props.id}</p> */}
        <h2 className="name">{props.name}</h2>
        <Avatar imgURL={props.imgURL}></Avatar>
      </div>
      <div className="bottom">
        <Details detailInfo={props.phone}></Details>
        <Details detailInfo={props.email}></Details>
      </div>
    </div>
  );
}

export default Card;
