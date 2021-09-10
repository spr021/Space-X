import "./Table.scss"

function Table() {
  return (
    <div class="wrap-table">
      <div class="table">
        <div class="table-head">
          <table>
            <thead>
              <tr>
                <th class="column1">Class name</th>
                <th class="column2">Type</th>
                <th class="column3">Hours</th>
                <th class="column4">Trainer</th>
                <th class="column5">Spots</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="table-body">
          <table>
            <tbody>
              <tr>
                <td class="column1">Like a butterfly</td>
                <td class="column2">Boxing</td>
                <td class="column3">9:00 AM - 11:00 AM</td>
                <td class="column4">Aaron Chapman</td>
                <td class="column5">10</td>
              </tr>

              <tr>
                <td class="column1">Mind & Body</td>
                <td class="column2">Yoga</td>
                <td class="column3">8:00 AM - 9:00 AM</td>
                <td class="column4">Adam Stewart</td>
                <td class="column5">15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
