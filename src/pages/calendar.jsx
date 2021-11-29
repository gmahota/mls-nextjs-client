/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";
import Link from 'next/link'

import FoodPlanCalendar from "../components/partials/food-plan-calendar/calendar";

export default function Calendar({ patient, stravaStats }) {
  const events =[
    {
      title: 'P. Almoço', start: '2021-11-29T08:00:00', end: '2021-11-29T09:30:00',
      className: 'bg-success'
    },
    {
      title: 'Lanche da tarde', start: '2021-11-29T10:00:00', end: '2021-11-29T11:30:00',
      className: 'bg-success'
    },
    {
      title: 'Almoço', start: '2021-11-29T12:00:00', end: '2021-11-29T14:00:00',
      className: 'bg-success'
    },
    {
      title: 'Lanche da tarde', start: '2021-11-29T15:30:00', end: '2021-11-29T17:30:00',
      className: 'bg-success'
    },    
    {
      title: 'Jantar', start: '2021-11-29T18:00:00', end: '2021-11-29T20:00:00',
      className: 'bg-success'
    },
  ]
  return(<>
    <FoodPlanCalendar initialEvents={events}/>
  </>)
}