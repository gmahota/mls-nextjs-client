/* eslint-disable react/display-name */
import React from "react";
import Router, { useRouter } from "next/router";
import Link from 'next/link'

import { parseCookies } from "nookies";

//Components
import Datatable from "../../../../components/elements/datatable/ActionsTable";
import SectionTitle from "../../../../components/elements/section-title";
import Widget from "../../../../components/elements/widget";
import { UnderlinedTabs } from "../../../../components/elements/tabs";
import FoodPlanCalendar from "../../../../components/partials/food-plan-calendar/calendar";

import { FiPlus, FiEdit, FiPrinter, FiSend, FiTrash } from 'react-icons/fi';
import { AiFillFileExcel, AiFillFilePdf } from "react-icons/ai"

//Services
import patientsService from "../../../../services/patients";

import getConfig from "next/config";

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

export default function PatientDetails({ patient, stravaStats }) {
  const router = useRouter();
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const handlerEdit = () => { }


  const foodPlanCalendar = [
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

  return (
    <>
      <SectionTitle title="Patient" subtitle={`${patient.id} - ${patient.name}`} />
      <Widget
        title="Details"
        description={
          <span>
            {patient.name}
          </span>
        }
        right={
          <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center justify-start space-y-2 lg:space-y-0 lg:space-x-2">

            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <FiEdit className="stroke-current text-white" size={18} />
              <span>Edit</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <FiPrinter className="stroke-current text-white" size={18} />
              <span>Print</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <FiSend className="stroke-current text-white" size={18} />
              <span>Send</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <AiFillFileExcel className="stroke-current text-white" size={18} />
              <span>CSV</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-blue-500 hover:bg-blue-600 text-white"
              type="button">

              <AiFillFilePdf className="stroke-current text-white" size={18} />
              <span>PDF</span>
            </button>
            <button
              className="btn btn-default btn-rounded bg-red-500 hover:bg-red-600 text-white"
              type="button">

              <FiTrash className="stroke-current text-white" size={18} />
              <span>Remove</span>
            </button>
          </div>
        }
      >      </Widget>
      <FoodPlanCalendar initialEvents={foodPlanCalendar} />

    </>
  );
}


export const getServerSideProps = async (ctx) => {

  const { 'mls.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { id } = ctx.params;

  const patient = await patientsService.get_Id(id);

  const CLIENT_SECRET = publicRuntimeConfig.STRAVA_CLIENT_SECRET
  const STRAVA_CLIENT_REFRESH_TOKEN = publicRuntimeConfig.STRAVA_CLIENT_REFRESH_TOKEN
  const clientId = publicRuntimeConfig.STRAVA_CLIENT_Id

  const resToken = await fetch(
    `https://www.strava.com/api/v3/oauth/token?client_id=${clientId}&client_secret=${CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${STRAVA_CLIENT_REFRESH_TOKEN}`,
    {
      method: 'POST',
    },
  )
  const {
    access_token: newToken,
    refresh_token: newRefreshToken,
  } = await resToken.json()

  const resStats = await fetch(
    `https://www.strava.com/api/v3/athletes/${patient.strava_id}/stats`,
    {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    },
  )

  const resActivities = await fetch(
    'https://www.strava.com/api/v3/athlete/activities?per_page=100',
    {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    },
  )

  const stravaStats = await resStats.json()
  const stravaActivies = await resActivities.json()

  console.log(stravaStats)

  return {
    props: {
      patient,
      stravaStats
    }
  };

};
