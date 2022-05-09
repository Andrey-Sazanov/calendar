import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState,useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const locales = {
  'en-US':require("date-fns/locale/en-US")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  {
  title:'',
  allDay:true,
  start:new Date(),
  end: new Date() 
  }
]

function App() {
  const [newEvent, setNewEvent] = useState({title:'',start:'',end:''})
  const [allEvents, setAllEvents] = useState(events)
  function handle(){
    setAllEvents([...allEvents, newEvent])
  }

  useEffect(()=>{
    const data = localStorage.getItem('event')
    if(data){
      setAllEvents(JSON.parse(data))
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('event',JSON.stringify(allEvents))
  })
  return (
    <div className="App">
      <p>This calendar is not regular it can keep your input data in local storage,so you will never lose your events</p>
      <h1>Calendar</h1>
      <h2>Add new Event</h2>
      <div>
        <input className="ivent-input" type = 'text' placeholder="add title" style = {{width:'20%',marginRight:'10px'}} value = {newEvent.title} onChange = {(e)=> setNewEvent ({...newEvent,title:e.target.value})} />
        <DatePicker className="start-input" placeholderText="Start Date" style = {{marginRight:'10px'}} selected = {newEvent.start} onChange = {(start)=> setNewEvent({...newEvent,start})} />
        <DatePicker className="end-input" placeholderText="End Date" style = {{marginRight:'10px'}} selected = {newEvent.end} onChange = {(end)=> setNewEvent({...newEvent,end})} />
        <button className="btn" style={{marginTop:'10px'}} onClick = {handle}  >Add Event</button>
      </div>
      <Calendar className="calendar" localizer={localizer} events = {allEvents} start = 'start' end = 'end' style = {{height:500,margin:"50px"}}/>
    </div>
  );
}

export default App;
