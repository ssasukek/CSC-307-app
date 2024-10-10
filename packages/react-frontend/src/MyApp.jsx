import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  <Form handleSubmit={updateList} />;

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(userId) {
    fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          // Successfully deleted, remove from frontend state
          setCharacters(characters.filter((user) => user.id !== userId));
        } else {
          console.log("Failed to delete user");
        }
      })
      .catch((error) => console.log(error));
  }

  function updateList(person) {
    const newUser = { ...person,
      id: Math.floor(Math.random() * 10000).toString(),
    };

    postUser(newUser)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          console.error("Failed to insert users");
        }
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
