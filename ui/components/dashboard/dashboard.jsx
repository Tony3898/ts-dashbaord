import React from "react";
import useAxios from "../../hooks/useAxios";
import Loader from "../misc/loader";
import _Empty from "../misc/empty";
import StateChart from "./stateChart";
import CoursesChart from "./coursesChart";
import StateTable from "./stateTable";
import CourseTable from "./courseTable";


export default function Dashboard() {
  const {data, loading, error} = useAxios([{'college.getDataByState': {}}, {'college.getDataByCourse': {}}])
  if (loading)
    return <Loader/>
  if (error)
    return <_Empty description={error}/>

  return (<div className={'row'}>
    <div className={'col-sm-12'}>
      <h1 className={'text-center'}>Dashboard</h1>
    </div>
    <div className={'col-sm-12 bg-white'} style={{padding: '16px'}}>
      <div className={'row'}>
        <div className={'col-sm-12 col-lg-4'}>
          <StateChart
              data={data && data['college.getDataByState'] && data['college.getDataByState'].data ? data['college.getDataByState'].data : []}/>
        </div>
        <div className={'col-sm-12 col-lg-8'}>
          <StateTable
              data={data && data['college.getDataByState'] && data['college.getDataByState'].data ? data['college.getDataByState'].data : []}/>
        </div>
      </div>
    </div>
    <div className={'col-sm-12 bg-white'} style={{padding: '16px'}}>
      <div className={'row'}>
        <div className={'col-sm-12 col-lg-8'}>
          <CourseTable
              data={data && data['college.getDataByCourse'] && data['college.getDataByCourse'].data ? data['college.getDataByCourse'].data : []}/>
        </div>
        <div className={'col-sm-12 col-lg-4'}>
          <CoursesChart
              data={data && data['college.getDataByCourse'] && data['college.getDataByCourse'].data ? data['college.getDataByCourse'].data : []}/>
        </div>
      </div>
    </div>
  </div>)
}