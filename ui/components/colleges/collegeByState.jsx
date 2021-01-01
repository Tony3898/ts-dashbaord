import React, {useState} from "react";
import {useParams} from 'react-router-dom'
import useAxios from "../../hooks/useAxios";
import Loader from "../misc/loader";
import _Empty from "../misc/empty";
import {Button, Space, Table, Tag} from "antd";
import Subheader from "../misc/subheader";
import useSearch from "../../hooks/useSearch";
import useRandomColor from "../../hooks/useRandomColor";

export default function CollegeByState() {
  const {state} = useParams()
  const [search, setSearch] = useState('')
  const {data: college, loading, error} = useAxios('college.getDataByState', {query: {state}})
  if (loading) return <Loader/>
  if (error) return <_Empty description={error}/>
  if (!college || !college.length || !college[0].data || !college[0].data.length)
    return <_Empty description={'No Data'}/>
  let sorter = (a, b, key) => {
    return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)
  }
  let columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => sorter(a, b, 'name'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    },
    {
      title: 'Total Students',
      dataIndex: 'totalStudents',
      key: 'totalStudents',
      sorter: (a, b) => sorter(a, b, 'totalStudents'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    },
    {
      title: 'Year Founded',
      dataIndex: 'yearFounded',
      key: 'yearFounded',
      sorter: (a, b) => sorter(a, b, 'yearFounded'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => sorter(a, b, 'city'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    }, {
      title: 'Country',
      dataIndex: 'country',
      key: Math.random(),
      sorter: (a, b) => sorter(a, b, 'country'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: Math.random(),
      render: ((text, record) => {
        return text ? text.map(t => {
          return <Space><Tag color={useRandomColor()} key={Math.random()}>{t.trim()}</Tag></Space>
        }) : '-'
      })
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (text, record) => {
        return <Button href={`/app/ts-dashboard/college/${text}`}>View</Button>
      }
    }]
  let colleges = useSearch(search, college[0].data)
  return <div className={'row'}>
    <div className={'col-sm-12'}>
      <Subheader title={`Colleges in ${state}`} onSearchChange={(e) => {
        setSearch(e.target.value)
      }}/>
    </div>
    <div className={'col-sm-12 bg-white'}>
      <Table bordered scroll={{x: 1200}} dataSource={colleges} columns={columns}/>
    </div>
  </div>;
}