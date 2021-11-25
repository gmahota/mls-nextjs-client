/* eslint-disable react/display-name */
import React, { useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

import SectionTitle from '../../components/elements/section-title/index';
import Widget from '../../components/elements/widget/index';
import FormValidation from './../../components/elements/forms/validation';

import Repository, { baseAthletesURL } from "../../services/Repository";


export default function PatientNew() {

  const router = useRouter(); //vai buscar o router

  const onSubmit = async (data) => {

    await Repository.post(`${baseAthletesURL}/athletes`, data)
      .then(
        router.push("/patients")
      ).catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro durante a gravação")
      });
  }

  let items = [
    {
      label: 'Code',
      error: {required: 'Please enter your code'},
      name: 'code',
      type: 'text',
      placeholder: 'Enter the code'
    },
    {
      label: 'Name',
      error: {required: 'Please enter your name'},
      name: 'name',
      type: 'text',
      placeholder: 'Enter the Name'
    },
    {
      label: 'Strava Id',
      name: 'strava_id',
      type: 'text',
      placeholder: 'Enter the strava id'
    },
    {
      label: 'Status',
       name: 'status',
      type: 'text',
      placeholder: 'Enter the Status'
    },
  ]

  return (
    <>
      <SectionTitle title="Create a New" subtitle="Patient's" />

      <Widget
        title=""
        description=""
        right=""
      >
      <FormValidation items={items} onSubmit={onSubmit}/>
    </Widget>


    </>)
}

export const getServerSideProps = async (ctx) => {
  const { "mls.token": token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  //await apiClient.get('/users')



  return {
    props: {

    },
  };
};
