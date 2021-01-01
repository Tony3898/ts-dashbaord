import React, {useState} from 'react'
import AllCollegeList from "./allCollegeList";
import useSearch from "../../hooks/useSearch";
import useAxios from "../../hooks/useAxios";
import Loader from "../misc/loader";
import Subheader from "../misc/subheader";
import _Empty from "../misc/empty";

export default function Colleges() {
  const [search, setSearch] = useState('')
  const {data: college, error, loading} = useAxios('college.getAll')
  let filterColleges = useSearch(search, college)
  if (loading) return <Loader/>
  if (error) return <_Empty description={error}/>
  return <div className={'row'}>
    <div className={'col-sm-12'}>
      <Subheader title={`College List`} onSearchChange={(e) => {
        setSearch(e.target.value)
      }}/>
    </div>
    <div className={'col-sm-12 bg-white'}>
      <AllCollegeList colleges={filterColleges}/>
    </div>
  </div>
}