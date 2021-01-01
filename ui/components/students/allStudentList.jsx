import React from 'react'
import {Button, Space, Table, Tag} from 'antd';
import useRandomColor from "../../hooks/useRandomColor";

function AllStudentList({students, colleges, className}) {
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
      title: 'Year Batch',
      dataIndex: 'yearBatch',
      key: 'yearBatch',
      sorter: (a, b) => sorter(a, b, 'yearFounded'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    },
    {
      title: 'College',
      dataIndex: 'college_id',
      key: 'college_id',
      sorter: (a, b) => sorter(a, b, 'college_id'),
      render: ((text, record) => {
        return text ? colleges && colleges.find(c => c._id === text).name : '-'
      })
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
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
        return <Button href={`/app/ts-dashboard/student/${text}`}>View</Button>
      }
    }]
  return (
      <>
        <div className={'bg-white'}>
          <Table className={className} bordered scroll={{x: 1500}} dataSource={students} columns={columns}/>;
        </div>
      </>
  )
}

export default AllStudentList