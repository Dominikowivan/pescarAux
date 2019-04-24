import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} 
from 'react-bootstrap-table'
import '../css/Table.css'
import '../dist/react-bootstrap-table-all.min.css'
 
 
function getData() {
  var data = []
  for (var i = 0; i < 100; ++i) {
    data[i] = {id: i, name: 'item_' + i, value: i}
  }
 
  return data
}
 
 
function showTotal() {
  return <p>There are 100 items total</p>
}
 
 
class TableList extends Component {
  render() {
    const options = {
      page: 4,
      prePage:  '⟵',
      nextPage: '⟶',
      firstPage: '⟸',
      lastPage: '⟹',
      paginationShowsTotal: showTotal
    }
    return (
      <div>
        <BootstrapTable data={getData()}
                        pagination={true}
                        options={options}
        >
          <TableHeaderColumn isKey dataField='id'
          >
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='name'
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='value'
          >
            Value
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default TableList