import React from 'react'
import {Button, Space, Table, Tag} from 'antd';
import useRandomColor from "../../hooks/useRandomColor";

function AllCollegeList({colleges, customFilter}) {
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
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => sorter(a, b, 'state'),
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
        return Array.isArray(text) ? text && text.map(t => {
          return <Space><Tag color={useRandomColor()} key={Math.random()}>{t.trim()}</Tag></Space>
        }) : text && text.length ?
            <Space><Tag color={useRandomColor()} key={Math.random()}>{text}</Tag></Space> : '-'
      })
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (text, record) => {
        return <Button href={`/app/ts-dashboard/college/${text}`}>View</Button>
      }
    }]
  return (
      <>
        <div className={'bg-white'}>
          <Table bordered scroll={{x: 1500}} dataSource={colleges} columns={columns}/>;
        </div>
      </>
  )
}

export default AllCollegeList