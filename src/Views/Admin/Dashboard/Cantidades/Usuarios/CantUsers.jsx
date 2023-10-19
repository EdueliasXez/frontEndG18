import { Link } from "react-router-dom"
import {useEffect, useState} from "react"
import axios from "axios"
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import style from './CantUsers.module.css'
const CantUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/user');
        const userCount = response.data.length;
        setTotalUsers(userCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={style.users}>
      <div className={style.info}>
        <div className={style.title}>
          <span>Usuarios totales</span>
        </div>
        <h1 className={style.total}>{totalUsers}</h1>
        <Link to='/admin/users'>Más Info</Link>
      </div>
      <div className={style.grafData}>
        <div className={style.grafico}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelFormatter={() => ""}
                formatter={(value, name, props) => {
                  const { payload } = props;
                  const date = payload?.date;
                  const users = payload?.users;
                  return [`${date}: ${users} Users`];
                }}
              />
              <Line type="monotone" dataKey="users" stroke="#8884D8" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default CantUsers;