import React from "react";

function Entry(props) {
  return (
    <div className="term">
      <dt>
        <span className="emoji" role="img" aria-label={props.name}>
          {props.emoji}
        </span>
        <span>{props.name}</span>
      </dt>
      <dd>{props.meaning}</dd>
    </div>
  );
}

function AddEntry(emojiInfo) {
  return (
    <Entry
      key={emojiInfo.id}
      emoji={emojiInfo.emoji}
      name={emojiInfo.name}
      meaning={emojiInfo.meaning}
    ></Entry>
  );
}

export default Entry;
export { AddEntry };
