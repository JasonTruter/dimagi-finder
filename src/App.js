import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent/MapComponent";
import SearchInput from "./components/SearchInput/SearchInput";
import "./App.css";
import Form from "./components/Form/Form";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

const defaultLocation = { lat: -29.78712, lng: 30.97657 };
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
export default function App() {
  const [employeeLocations, setEmployeeLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchChanges, setSearchChanges] = useState("");
  const [location, setLocation] = useState(defaultLocation);
  const [searchDate, setSearchDate] = useState("");
  const [emailSubmit, setEmailSubmit] = useState("");
  const [locationSubmit, setLocationSubmit] = useState("");

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((response) => {
        setLocation({
          lat: response.coords.latitude,
          lng: response.coords.longitude,
        });
      });
    };
    getLocation();
  }, []);

  useEffect(() => {
    const submitLocationUpdate = async (query) => {
      const url = "http://localhost:8080/location";

      const settings = {
        method: "POST",
        headers: {
          mode: 'cors',
          Accept: "application/json",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
          email: emailSubmit,
          locationName: locationSubmit,
        }),
      };
      try {
        const fetchResponse = await fetch(url, settings);
        const data = await fetchResponse.json();
        if (data) {
          alert(JSON.stringify(data));
        }
      } catch (e) {
        return e;
      }
    };
    if (emailSubmit && emailSubmit) {
      submitLocationUpdate();
    }
  }, [emailSubmit, locationSubmit]);

  const handleDateChange = (date) => {
    console.log(date);
    setSearchDate(date);
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    setEmailSubmit(email);
    const locationName = e.target[1].value;
    setLocationSubmit(locationName);
  };

  const handleEmployeeSearch = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    setEmailSubmit(email);
    const locationName = e.target[1].value;
    setLocationSubmit(locationName);
  };

  return (
    <div className="App">
      <div id="side-bar">
        <div className="location-submission">
          <Form
            fields={["email", "location"]}
            buttonText="submit my location"
            onSubmit={handleEmployeeSubmit}
          />
        </div>
        <div className="employee-search">
          <Form
            fields={["email"]}
            buttonText="find employee"
            onSubmit={handleEmployeeSearch}
            extraComponent={{
              field: "date",
              component: (
                <DatePicker
                  selected={searchDate}
                  onChange={handleDateChange}
                  showTimeSelect
                  ariaLabelledBy="Jason"
                  timeFormat="HH:mm"
                  timeIntervals={20}
                  timeCaption="time"
                  dateFormat="yyyy-MM-dd HH:mm:ss"
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: "5px, 10px",
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                />
              ),
            }}
          />
        </div>
      </div>
      <MapComponent defaultCenter={location} />
    </div>
  );
}
