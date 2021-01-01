import React, {useState} from "react";
import {useParams} from 'react-router-dom'
import useAxios from "../../hooks/useAxios";
import Loader from "../misc/loader";
import _Empty from "../misc/empty";
import AllStudentList from "../students/allStudentList";
import Subheader from "../misc/subheader";
import {Space, Tag} from "antd";
import useCapitalize from "../../hooks/useCapitalize";
import useRandomColor from "../../hooks/useRandomColor";
import AllCollegeList from "./allCollegeList";
import useSearch from "../../hooks/useSearch";

export default function ViewCollege() {
  const {college_id} = useParams()
  const [searchStudentList, setSearchStudentList] = useState('')
  const [searchCourseList, setSearchCourseList] = useState('')
  const {data, error, loading} = useAxios('college.getDetails', {query: {_id: parseInt(college_id)}})
  if (loading) return <Loader/>
  if (error) return <_Empty description={error}/>
  let college = data && data[0]
  const {stduentData, id, similar, name, yearFounded, city, state, country, totalStudents, courses} = college
  let filterStudents = useSearch(searchStudentList, stduentData)
  let filterSimilars = useSearch(searchCourseList, similar)
  return (<div className='row'>
    <div className={'col-sm-12'}>
      <div className='row'>
        <div className={'col-sm-12'}>
          <h1 className='text-center'>College Details</h1>
          <table className="table" style={{padding: '16px'}}>
            <tbody>
            <tr>
              <th style={{fontWeight: 'bold'}}>College Id</th>
              <td>{`${id ? id : 'N/A'}`}</td>
              <th style={{fontWeight: 'bold'}}>College Name</th>
              <td>{`${name ? name : 'N/A'}`}</td>
            </tr>
            <tr>
              <th style={{fontWeight: 'bold'}}>Total Students</th>
              <td>{`${totalStudents ? totalStudents : 'N/A'}`}</td>
              <th style={{fontWeight: 'bold'}}>City</th>
              <td>{`${city ? city : 'N/A'}`}</td>
            </tr>
            <tr>
              <th style={{fontWeight: 'bold'}}>State</th>
              <td>{`${state ? state : 'N/A'}`}</td>
              <th style={{fontWeight: 'bold'}}>Country</th>
              <td>{`${country ? country : 'N/A'}`}</td>
            </tr>
            <tr>
              <th style={{fontWeight: 'bold'}}>Courses</th>
              <td><Space>
                {courses && courses.length ? courses.map((c) => <Tag color={useRandomColor()}
                                                                     key={c}>{useCapitalize(c)}</Tag>) : 'N/A'}
              </Space></td>
              <th style={{fontWeight: 'bold'}}>Year Founded</th>
              <td>{`${yearFounded ? yearFounded : 'N/A'}`}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='row' style={{background: useRandomColor()}}>
        <div className={'col-sm-12'}>
          <Subheader title='Student List' onSearchChange={(e) => {
            setSearchStudentList(e.target.value)
          }}/>
          <div className={'row bg-white'}>
            <div className={'col-sm-12'}>
              <AllStudentList students={filterStudents} colleges={[college]}/>
            </div>
          </div>
        </div>
      </div>
      <div className='row' style={{background: useRandomColor()}}>
        <div className={'col-sm-12'}>
          <Subheader title='Similar Colleges' onSearchChange={(e) => {
            setSearchCourseList(e.target.value)
          }}/>
          <div className={'row bg-white'}>
            <div className={'col-sm-12'}>
              <AllCollegeList colleges={filterSimilars}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}