import React from 'react'
import Table from './DataTable'

const Placeholder = ({ children }) => (
  <div>
    {children}
    <Table data={[]} />
  </div>
)

export default Placeholder
