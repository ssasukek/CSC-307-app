import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
    {
      id: "qwe123",
      job: "Zookeeper",
      name: "Cindy",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let filterUser = users["users_list"];

  if (name) {
    filterUser = filterUser.filter((user) => user.name === name);
  }

  if (job) {
    filterUser = filterUser.filter((user) => user.job === job);
  }

  if (filterUser.length > 0) {
    res.send({ users_list: filterUser });
  } else {
    res.status(404).send("User not found");
  }

  // if (name != undefined) {
  //   let result = findUserByName(name);
  //   result = { users_list: result };
  //   res.send(result);
  // } else {
  //   res.send(users);
  // }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  // const id = parseInt(req.params["id"]);
  const userToDelete = findUserById(id);

  if (userToDelete) {
    const index = users.users_list.indexOf(userToDelete); //get
    users.users_list.splice(index, 1); //remove user from array
    res.status(204).send("Successfully deleted");
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = Math.floor(Math.random() * 10000).toString();
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.listen(port, () => {
  console.log("Example app listening at http://localhost:${port}");
});
