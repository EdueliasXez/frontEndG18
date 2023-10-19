import { useEffect, useState } from "react";
import axios from "axios";
import style from './CantTopEventos.module.css';


const CantTopEventos = () => {
  const [totalTopEventos, setTotalTopEventos] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/events/rating'); 
        const topEventosCount = response.data.length;
        setTotalTopEventos(topEventosCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.canttopevents}>
      <div className={style.info}>
        <div className={style.title}>
          <span>Eventos en el Top</span>
        </div>
        <h1 className={style.total}>{totalTopEventos}</h1>
        <Link to='/admin/topEvents'>Más Info</Link>
      </div>
      <div className={style.grafData}>
       
      </div>
    </div>
  );
};

export default CantTopEventos;
