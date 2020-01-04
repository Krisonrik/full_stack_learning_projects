import React from "react";
import Card from "./Card";
import contacts from "../contacts";
import Avatar from "./Avatar";

function AddCards(contact) {
  return (
    <Card
      key={contact.id}
      id={contact.id}
      name={contact.name}
      imgURL={contact.imgURL}
      phone={contact.phone}
      email={contact.email}
    />
  );
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar imgURL="https://media.licdn.com/dms/image/C4D03AQFu9djjEwXe7Q/profile-displayphoto-shrink_200_200/0?e=1583366400&v=beta&t=d-FyXGYoefLFA3mVMhP1_9J_3M4_G6ryr3vrClN_qZ4" />
      {contacts.map(AddCards)}
    </div>
  );
}

export default App;
