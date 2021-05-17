import React,{useEffect, useState} from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import axios from 'axios';
import { apiConfig } from '../config/apihelper'
import {Col, Container, Row, Table} from "reactstrap";

const tableHead = { name: "Name", email: "Email", profile_picture: "Profile Pictures" };

const Alluser = () => {
  const countPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setallData] = useState([]);

  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  useEffect(() => {
    axios.get(apiConfig.URL + 'getuser')
      .then((response) => {
        setallData(response.data.data)
      });
  }, []);

  useEffect(() => {
    allData && updatePage(1);
  }, [allData]);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      if (keyD === "profile_picture") {
        return <img src={apiConfig.Imageurl + key.profile_picture}
          style={{ height: 100, width: 100 }}
        />
      }
      return <td key={i}>{key[keyD]}</td>;
    });
    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };
  return (
    <>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
              <Table>
                  <thead>
                    <tr>
                       {headRow()}
                    </tr>
                  </thead>
                  <tbody className="trhover">
                     {
                       collection &&
                      collection.length ?
                      tableData() :
                      'Loading...'
                     }
                  </tbody>
              </Table>
              <Pagination
                className='mt-3'
                pageSize={countPerPage}
                onChange={updatePage}
                current={currentPage}
                total={allData.length}
              />
          </Col>
         </Row>
      </Container>
    </>
  );
};
export default Alluser;
