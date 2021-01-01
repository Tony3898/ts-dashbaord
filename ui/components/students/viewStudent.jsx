import React from 'react'
import {useParams} from "react-router-dom";
import _Empty from "../misc/empty";
import useAxios from "../../hooks/useAxios";
import Loader from "../misc/loader";
import {Space, Tag} from "antd";
import useRandomColor from "../../hooks/useRandomColor";
import useCapitalize from "../../hooks/useCapitalize";

export default function ViewStudent() {
  const {student_id} = useParams()
  const {data: student, error, loading} = useAxios('student.getStudentDetails', {query: {_id: parseInt(student_id)}})
  if (error)
    return <_Empty description={error}/>
  if (loading)
    return <Loader/>
  if (!student || !student.length)
    return <_Empty description={'student not found'}/>
  let {
    id, name, yearBatch, college_id, skills, college
  } = student[0]
  return (<div className="row">
    <div className=" col-sm-12">
      <div className="user-img-container">
        <i className="fas fa-10x fa-user-circle"/>
        <br/>
        <h1 id="name">{`${name ? name : 'N/A'}`}</h1>
      </div>
    </div>
    <div className="col-sm-12">
      <table className="table" style={{padding: '16px'}}>
        <tbody>
        <tr>
          <th style={{fontWeight: 'bold'}}>Id</th>
          <td>{`${id ? id : 'N/A'}`}</td>
          <th style={{fontWeight: 'bold'}}>Year Batch</th>
          <td>{`${yearBatch ? yearBatch : 'N/A'}`}</td>
        </tr>
        <tr>
          <th style={{fontWeight: 'bold'}}>College</th>
          <td>{`${college && college.name ? college.name : 'N/A'}`}</td>
          <th style={{fontWeight: 'bold'}}>Skills</th>
          <td><Space>
            {skills && skills.length ? skills.map((s) => <Tag color={useRandomColor()}
                                                              key={s}>{useCapitalize(s)}</Tag>) : 'N/A'}
          </Space></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>)
}