import React, {useState} from 'react'
import AllStudentList from "./allStudentList";
import useSearch from "../../hooks/useSearch";
import useAxios from "../../hooks/useAxios";
import Loader from "../misc/loader";
import Subheader from "../misc/subheader";
import _Empty from "../misc/empty";

export default function Students() {
  const [search, setSearch] = useState('')
  const {data, error, loading} = useAxios([{'student.getAll': {}}, {'college.getAll': {}}])
  if (loading) return <Loader/>
  if (error) return <_Empty description={error}/>
  let students = data['student.getAll'].data
  let colleges = data['college.getAll'].data
  let filterStudents = useSearch(search, students)
  return <div className={'row'}>
    <div className={'col-sm-12'}>
      <Subheader title={`Student List`} onSearchChange={(e) => {
        setSearch(e.target.value)
      }}/>
    </div>
    <div className={'col-sm-12 bg-white'}>
      <AllStudentList students={filterStudents} colleges={colleges}/>
    </div>
  </div>
}