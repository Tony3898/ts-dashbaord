import React from "react";
import {Button, Table} from 'antd';

export default function StateTable({data}) {
  let sorter = (a, b, key) => {
    return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)
  }

  let columns = [
    {
      title: 'State',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => sorter(a, b, '_id'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    }, {
      title: 'Total Colleges',
      dataIndex: 'total',
      key: Math.random(),
      sorter: (a, b) => sorter(a, b, 'total'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (text, record) => {
        return <Button href={`/app/ts-dashboard/state/${text}`}>View</Button>
      }
    }]
  return <Table bordered scroll={{x: 1200}} dataSource={data} columns={columns}/>;
}