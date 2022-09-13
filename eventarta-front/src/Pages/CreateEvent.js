import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


export default function CreateEvent() {
  const [title, setTitle] = React.useState("");
  const [datepick, setDate] = React.useState(dayjs());
  const [capacity, setCapacity] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [images, setImages] = React.useState(false);
  const navigate = useNavigate();

  var nowdate = new Date();
  function createEvent() {
    const token = localStorage.getItem("token");

    let params = new FormData();
    let image = document.getElementById("file").files[0]
    
    params.append("title", title)
    params.append("date", datepick)
    params.append("capacity", capacity)
    params.append("country", country)
    params.append("city", city)
    params.append("street", street)
    params.append("description", description)
    params.append("image", image)
    axios
      .post("http://127.0.0.1:3000/events", params, {
        headers: {
          Authorization: "Bearer " + token, 
        },
      })
      .then(function (response) {
        if (response.status == 200)
        {
          Swal.fire({
            title: 'success!',
            text: "Your event has been created!",
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          // navigate("/MyEvents");
        }
          // localStorage.setItem("token", response.data.token);
          console.log(response.data);
        // navigate("/"); 
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        console.log(error.response.data.message);
      });
  }

  const onImageChange = event => { 
    setImages({ images: event.target.files[0] });
  };

  useEffect(() => {
    if(images !== false){
      let image = new FormData();
      let file = document.getElementById("file").files[0]
      
      image.append("content", file, file.name)
      console.log(image)
    }
  }, [images])
  return (
    <div>
      {/* <Navbar /> */}
      <h1 className="create-title">Create Event</h1>
      <div className="create-container">
        <div className="create-box">
          <TextField
            className="event-f"
            id="outlined-basic"
            label="Title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              className="event-f"
              id="outlined-basic"
              variant="outlined"
              label="Date"
              value={datepick}
              minDate={dayjs(nowdate)}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            className="event-f"
            id="outlined-basic"
            label="Capacity"
            variant="outlined"
            onChange={(event) => setCapacity(event.target.value)}
            value={capacity}
            type="number"
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
          <TextField
            className="event-f"
            id="outlined-basic"
            label="Country"
            onChange={(event) => setCountry(event.target.value)}
            value={country}
            variant="outlined"
          />
          <TextField
            className="event-f"
            id="outlined-basic"
            label="City"
            onChange={(event) => setCity(event.target.value)}
            value={city}
            variant="outlined"
          />
          <TextField
            className="event-f"
            id="outlined-basic"
            label="Street"
            onChange={(event) => setStreet(event.target.value)}
            value={street}
            variant="outlined"
          />
          <input className="event-f" size="200" type="file" id="file" accept="image/*" multiple={true} onChange={onImageChange}/>
          {/* <label for="file">Choose a file</label> */}
          <textarea
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            className="event-f-d"
            placeholder="Description"
          ></textarea>
        </div>
        <center>
          <button className="create-page-btn" onClick={createEvent}>
            Submit
          </button>
        </center>
      </div>
    </div>
  );
}
