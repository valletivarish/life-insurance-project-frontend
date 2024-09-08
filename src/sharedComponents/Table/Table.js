import React from "react";
import "./Table.css";
import Pagination from "../Pagination/Pagination";
import Dropdown from "../Dropdown/Dropdown";
const Table = (props) => {
  const { data, setSearchParams, searchParams } =
    props;
  const content = data.content;

  if (content && content.length > 0) {
    const tableHeaders = (
      <tr>
        {Object.keys(content[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
    );

    const tableData = content.map((d) => (
      <tr>
        {Object.keys(d).map((k) => (
          <td>{d[k]}</td>
        ))}
      </tr>
    ));

    return (
      <div className="table-container">
        <table className="table">
          <thead className="thead">{tableHeaders}</thead>
          <tbody>{tableData}</tbody>
        </table>
        <div className="pagination-section">
          <Dropodown
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            data={data}
            className="custom-dropdown"
          />
          <Pagination
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            data={data}
          />
        </div>
      </div>
    );
  }
};

export default Table;
