import React from "react";
import {Table} from 'antd';

export default function CourseTable({data}) {
  let sorter = (a, b, key) => {
    return (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)
  }

  let columns = [
    {
      title: 'Course',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => sorter(a, b, '_id'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    }, {
      title: 'Total Students',
      dataIndex: 'total',
      key: Math.random(),
      sorter: (a, b) => sorter(a, b, 'name'),
      render: ((text, record) => {
        return text ? text : '-'
      })
    },]

  return <Table bordered scroll={{x: 1200}} dataSource={data} columns={columns}/>;
}