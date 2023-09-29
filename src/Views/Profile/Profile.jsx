import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading";
import style from "./Profile.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    
    const [isLoading, setIsLoading] = useState(true);

    
    const userEvents = [
        { id: 1, name: "Concierto en Vivo", date: "2023-10-15" },
        { id: 2, name: "Festival de Jazz", date: "2023-11-20" },
        
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

       
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className={style.loadingContainer}>
                    <Loading />
                    <p>Cargando perfil...</p>
                </div>
            ) : (
                isAuthenticated && (
                    <div className={style.containerprofile}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1 className={style.message}>Bienvenido/a, {user?.name}!</h1>
                                <div className={style.pictureprofile}>
                                    <img
                                        src={user.picture}
                                        alt={user.name}
                                        className="img-fluid rounded-circle"
                                    />
                                </div>
                                <h2>{user.name}</h2>
                                <p>{user.email}</p>
                            </div>
                            <div className="col-12">
                                <h3>Eventos Registrados:</h3>
                                <ul>
                                    {userEvents.map((event) => (
                                        <li key={event.id}>
                                            <Link to={`/events/${event.id}`}>
                                                {event.name} - {event.date}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <Link to="/mytickets">
                                    <button className={style.btnprofile}>Mis Boletos</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default Profile;
