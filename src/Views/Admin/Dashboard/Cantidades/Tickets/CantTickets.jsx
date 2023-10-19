import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

import style from './CantTickets.module.css';

const CantTickets = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/checkout/tickets'); 
        const ticketCount = response.data.length;
        setTotalTickets(ticketCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.tickets}>
      <div className={style.info}>
        <div className={style.title}>
          <span>Total Boletos Comprados</span>
        </div>
        <h1 className={style.total}>{totalTickets}</h1>
        <Link to='/admin/tickets'>Más Info</Link>
      </div>
      <div className={style.grafData}>
        <div className={style.grafico}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CantTickets;










// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { LineChart, Line, ResponsiveContainer } from 'recharts';

// import style from './CantTickets.module.css';


// import { getUserProfileFromToken } from "../../../../../Redux/actions/auth_actions"

// const CantTickets = () => {
//   const [totalTickets, setTotalTickets] = useState(0);
//   const [data, setData] = useState([]);

  
//   const user = useSelector(state => state.user); 
//   const dispatch = useDispatch();

//   useEffect(() => {
   
//     dispatch(getUserProfileFromToken());

//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/checkout/tickets'); 
//         const ticketCount = response.data.length;
//         setTotalTickets(ticketCount);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

  
//   const isAdmin = user && user.isAdmin;

//   return (
//     <div className={style.tickets}>
//       <div className={style.info}>
//         <div className={style.title}>
//           <span>Total Boletos Comprados</span>
//         </div>
//         <h1 className={style.total}>{totalTickets}</h1>
//         {isAdmin && (
//           <Link to='/admin/tickets'>Más Info</Link>
//         )}
//       </div>
//       <div className={style.grafData}>
//         <div className={style.grafico}>
//           <ResponsiveContainer width="99%" height="100%">
//             <LineChart data={data}>
//               <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CantTickets;








































