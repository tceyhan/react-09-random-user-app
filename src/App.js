import "./App.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Man from "./assets/man.svg";
import Woman from "./assets/woman.svg";
import GrowingMan from "./assets/growing-up-man.svg";
import GrowingWoman from "./assets/growing-up-woman.svg";
import Mailsvg from "./assets/mail.svg";
import Map from "./assets/map.svg";
import Phone from "./assets/phone.svg";
import Padlock from "./assets/padlock.svg";

function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    city: "",
    phone: "",
    password: "",
    image: "",
    gender: "",
  });
  const [info1, setInfo1] = useState("");
  const [info2, setInfo2] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [load,setLoad] = useState(true)

  const [table, setTable] = useState([]);

  const getData = () => {
    
    axios
      .get("https://randomuser.me/api/")
      .then((result) => {
        setLoad(true)
        setUser({
          name: `${result?.data?.results[0]?.name?.first} ${result?.data?.results[0]?.name?.last}`,
          email: `${result?.data?.results[0]?.email}`,
          age: `${result?.data?.results[0]?.dob?.age}`,
          city: `${result?.data?.results[0]?.location?.street?.number} ${result?.data?.results[0]?.location?.street?.name}`,
          phone: `${result?.data?.results[0]?.phone}`,
          password: `${result?.data?.results[0]?.login?.password}`,
          image: `${result?.data?.results[0]?.picture?.large}`,
          gender: `${result?.data?.results[0]?.gender}`,
        });

        setInfo1("name");
        setInfo2(
          `${result?.data?.results[0]?.name?.first} ${result?.data?.results[0]?.name?.last}`
        );
      }).then(setLoad(false))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);


  const handleMouseOver = (e) => {
    console.log(e.target.alt);
    setInfo1(e.target.alt);
    setInfo2(user[e.target.alt]);
  };

  const handleAddUser = () => {
    setIsOpen(true);
    if(table.length > 0 &&  table[table.length - 1].name !== user.name){
      setTable([
        ...table,
        { name: user.name, email: user.email, phone: user.phone, age: user.age },
      ]);
    }else if(table.length === 0) {
      setTable([
        ...table,
        { name: user.name, email: user.email, phone: user.phone, age: user.age },
      ]);
    }

  };

  console.log(table);

  return (
    <div className="App">
      <div className="random">
        <div className="random-empty"></div>
        <div className="random-img">
          <Avatar
            alt="Remy Sharp"
            src={user.image}
            sx={{ width: 100, height: 100 }}
          />
        </div>
        <div>
          <p>My {info1} is</p>
          <h2>{info2}</h2>
        </div>
        <div className="random-icon">
          <Avatar
            alt="name"
            src={user.gender === "male" ? Man : Woman}
            onMouseOver={handleMouseOver}
          />
          <Avatar alt="email" src={Mailsvg} onMouseOver={handleMouseOver} />
          <Avatar
            alt="age"
            src={user.gender === "male" ? GrowingMan : GrowingWoman}
            onMouseOver={handleMouseOver}
          />
          <Avatar alt="city" src={Map} onMouseOver={handleMouseOver} />
          <Avatar alt="phone" src={Phone} onMouseOver={handleMouseOver} />
          <Avatar alt="password" src={Padlock} onMouseOver={handleMouseOver} />
        </div>
        <div className="random-button">
          <Button variant="contained" onClick={getData}>
            {load ? "Random User" : "Loading"}
          </Button>
          <Button variant="contained" onClick={handleAddUser}>
            Add User
          </Button>
        </div>
        {isOpen && (
          <div className="random-table">
            <table className="random-table-div">
              <thead>
                <th>Firstname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
              </thead>
              <tbody>
                {table?.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td>{e.age}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
