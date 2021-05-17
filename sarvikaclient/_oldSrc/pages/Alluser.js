import React from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import axios from 'axios';
import { apiConfig } from '../config/apihelper'


const tableHead = { name: "Name", email: "Email", profile_picture: "Profile Pictures" };

const Alluser = () => {
  const countPerPage = 3;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allData, setallData] = React.useState([]);
  const [apidata, setapidata] = React.useState(false);

  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );


  React.useEffect(() => {
    updatePage(1);
    axios.get(apiConfig.URL + 'getuser')
      .then((response) => {
        setallData(response.data.data)
        setapidata(true)
      });
  }, []);






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
  console.log(allData, '????');
  return (
    <>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{apidata ? tableData() : 'Loading...'}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={allData.length}
      />
    </>
  );
};
export default Alluser;




// import React, { Component, useState, useEffect } from 'react';
// import axios, { post } from 'axios';
// import { apiConfig } from '../config/apihelper'



// export default class Alluser extends Component {
//   state = {
//     users: [],
//   }

//   componentDidMount() {
//     axios.get(apiConfig.URL + 'getuser')
//       .then((response) => {
//         this.setState({ users: response.data.data })
//       });
//   }
//   render() {
//     // console.log(this.state.users, "????");
//     return (
//       <div>
//         {this.state.users.map((item) => {
//           return (
//             <>
//               <h2>{item.name}</h2>
//               <h1>{item.email}</h1>
//               <img src={apiConfig.Imageurl + item.profile_picture} alt="" className="img-responsive" style={{height:150,width:150}}/>
//             </>
//           )
//         }).reverse()}
//       </div>
//     )
//   }
// }




// // const Alluser = () => {
// //   const [user, setuser] = useState([])

// //   useEffect(() => {
// //     axios.get(config.URL + 'getuser')
// //       .then((response) => {
// //         setuser(response.data)
// //         console.log(response.data);
// //         // console.log(response.statusText);
// //         // console.log(response.headers);
// //         // console.log(response.config);
// //       });



// //   }, [])


// //   return (
//     // <div
//     //   style={{
//     //     display: 'flex',
//     //     justifyContent: 'Right',
//     //     alignItems: 'Right',
//     //     height: '100vh'
//     //   }}
//     // >
// //       <h1>Welcome to Home</h1>
// //       {user.map((item) => {
// //         <h2>{item.name}</h2>
// //       })}
// //     </div>
// //   );
// // };


// // export default Alluser;