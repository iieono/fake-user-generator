import { faker } from "@faker-js/faker";
import { useState } from "react";
import { CSVLink } from "react-csv";

function App() {
  const [region, setRegion] = useState("");
  const [errorP, setErrorP] = useState(0);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 10000));
  const [table, setTable] = useState([]);

  if (errorP > 1000) {
    setErrorP(1000);
  }

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      generateTable(10);
    }
  };
  const breakText = (text) => {
    let probs = Math.floor(Math.random() * 9);
    let array = text.split("");
    if (probs === 0) {
      const randIndex = Math.floor(Math.random() * array.length)
      array.splice(randIndex, 1)
    }
    if (probs === 1 || probs === 2 || probs === 3 || probs === 4) {
      const index = Math.floor(Math.random() * array.length);
      const characters = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
      ];
      const charIndex = Math.floor(Math.random() * characters.length);
      array[index] = characters[charIndex];
    }
    if (probs === 5 || probs === 6 || probs === 7 || probs === 8) {
      const index = Math.floor(Math.random() * array.length);
      const char1 = array[index];
      const char2 = array[index + 1] || array[index - 1];
      array[index] = char2;
      array[index + 1] = char1;
    }
    const res = array.join('')
    return res
  };

  const getFullName = (past = 0) => {
    const times = (errorP / 4) > 0 ? (errorP / 4) : 1
    let res = ''
    let fullName = "";
    if (region === "en_US" || region === "fr") {
      fullName = `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`;
    }
    if (region === "tr" || region === "pl" || region === "de") {
      fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
    }
    res = fullName
    if (errorP > 0 && errorP <= 1 && past === 0) {
      res = breakText(res);
      fullName = res
    }
    if (errorP >= 1 && past === 0) {
      for (let k = 0; k < times; k++) {
        res = breakText(res);
      }
    }
    fullName = res
    return fullName;
  };
  const getNumber = (past = 1) => {
    const times = (errorP / 4) > 0 ? (errorP / 4) : 1
    let res = ''
    let number = "";
    if (region === "en_US") {
      number = faker.phone.number(`+1 ### ### ####`);
    }
    if (region === "pl") {
      number = faker.phone.number(`+48 ## ### ## ##`);
    }
    if (region === "tr") {
      number = faker.phone.number(`+90 ### ### ####`);
    }
    if (region === "de") {
      number = faker.phone.number(`+49 ### ######`);
    }
    if (region === "fr") {
      number = faker.phone.number(`+33 # ## ## ## ##`);
    }
    res = number
    if (errorP > 0 && errorP <= 1 && past === 1) {
      res = breakText(res);
      number = res
    }
    if (errorP >= 1 && past === 1) {
      for (let k = 0; k < times; k++) {
        res = breakText(res);
      }
      number = res
    }
    return number;
  };
  const getUid = (past = 2) => {
    const times = (errorP / 4) > 0 ? (errorP / 4) : 1
    let res = ''
    let uid = "";
    uid = faker.datatype.uuid();
    res = uid
    if (errorP > 0 && times <= 1 && past === 2) {
      res = breakText(res);
      uid = res
    }

    if (errorP >= 1 && past === 2) {
      for (let k = 0; k < errorP; k++) {
        res = breakText(res);
      }
      uid = res
    }

    return uid;
  };
  const getAddress = (past = 3) => {
    const times = (errorP / 4) > 0 ? (errorP / 4) : 1
    let res = ''
    let address = "";
    if (region === "fr") {
      address = `${faker.address.secondaryAddress()}, ${faker.address.streetAddress()}, ${faker.address.zipCodeByState()} ${faker.address.city()}, FRANCE`;
    }
    if (region === "de") {
      address = `${faker.address.streetName()} ${faker.address.buildingNumber()}, ${faker.address.zipCodeByState()} ${faker.address.city()}, GERMANY`;
    }
    if (region === "pl") {
      address = `${faker.address.streetName()} ${faker.address.buildingNumber()}, ${faker.address.zipCode()} ${faker.address.city()}, POLAND`;
    }
    if (region === "tr") {
      address = `${faker.address.streetName()} ${faker.address.streetSuffix()} ${faker.address.buildingNumber()}, ${faker.address.zipCode()}  ${faker.address.city()} TURKEY`;
    }
    if (region === "en_US") {
      address = `${faker.address.streetAddress()}, ${faker.address.buildingNumber()}, ${faker.address.city()} ${faker.address.state()} ${faker.address.zipCodeByState()}, USA`;
    }
    res = address
    if (errorP > 0 && errorP <= 1 && past === 3) {
      res = breakText(res);
      address = res 
    }
    if (errorP >= 1 && past === 3) {
      for (let k = 0; k < times; k++) {
        res = breakText(res);
      }
      address = res
    } 
    return address;
  };

  const generateTable = (count) => {
    for (let i = 0; i < count; i++) {
      let uid = getUid();
      let fullName = getFullName();
      let address = getAddress();
      let phone = getNumber();
      if(errorP >= 1){
        console.log('cycle')
        uid = getUid();
        fullName = getFullName();
        address = getAddress();
        phone = getNumber();
        // for( let j = 0; j < errorP; j++){
        //   // const past = Math.floor(Math.random() * 4);
        // }
      }

      setTable((table) => [
        ...table,
        {
          uid: uid,
          name: fullName,
          address: address,
          phone: phone,
        },
      ]);
    }
  };

  const generateBtn = () => {
    faker.locale = region;
    faker.seed(seed);
    setTable([]);
    generateTable(20);
  };
  return (
    <div className="App container-fluid p-4">
      <div className="text-center bg-info container p-1 rounded mt-2 text-light bg-dark">
        <h4>Fake user generator</h4>
      </div>
      <div className="d-flex flex-column gap-2 p-3 border-start border-end border-dark mt-2">
        <div>
          <select
            class="form-select"
            aria-label="Regions"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option selected>Select region</option>
            <option value="en_US">English (United States)</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="pl">Polish</option>
            <option value="tr">Turkish</option>
          </select>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center">
            <label for="errorRange" class="form-label">
              Error probability per record: <strong>{errorP}</strong>
            </label>
          </div>
          <div class="d-flex align-items-center gap-4">
            <input
              type="range"
              className="form-range"
              id="ErrorRange"
              min="0"
              max="10"
              step="0.5"
              default="0"
              value={errorP}
              onChange={(e) => setErrorP(+e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Value"
              value={errorP}
              onChange={(e) => setErrorP(+e.target.value)}
            ></input>
          </div>
        </div>
        <div className="d-flex flex-column gap-2 justify-content-between">
          <div className="d-flex align-items-center">
            <label for="errorRange" class="form-label">
              Seed
            </label>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder="seed"
            value={seed}
            onChange={(e) => setSeed(+e.target.value)}
          ></input>
          <button type="Submit" className="btn btn-dark" onClick={generateBtn}>
            Generate
          </button>
        </div>
      </div>
      <div className="d-sm-flex justify-content-between align-items-baseline mt-2 ps-2 pe-2">
        <h4 className=" rounded p-1 pe-2 ps-2 text-success">
          Your generated user data
        </h4>
        <CSVLink
          data={table}
          filename={"user-data.csv"}
          className="btn btn-success"
          target="_blank"
        >
          Export to CSV
        </CSVLink>
      </div>
      <div className="border-start border-end border-dark mt-2">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {table &&
              table.length > 0 &&
              table.map((item, idx) => (
                <tr>
                  <th scope="row">{idx + 1}</th>
                  <td>{item.uid}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
