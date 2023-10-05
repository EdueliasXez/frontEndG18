import logo from '../../images/Logo-Clikcy.png'
import style from "./About.module.css"
import { Link } from 'react-router-dom';

function About (){
    return (
        <div className={style.header}>
          <img src={logo} alt="Logo" className={style.logo} />
          <h1 className={style.h2}>¿QUE TE OFRECEMOS?</h1>
          <ul/>
          <div className={style.about}>
          <h2>
          Descubre un mundo de eventos emocionantes y experiencias únicas con nuestra. ¡Somos el vínculo hacia tu diversión! <ul/><ul/>


Variedad de Eventos: Explora una amplia gama de eventos, desde desfiles de moda y festivales vibrantes hasta eventos gastronómicos deliciosos. Tenemos opciones para todos los gustos e intereses.<ul/><ul/>

Venta de Boletos Simplificada: ¿Listo para un evento especial? Compra tus boletos de manera rápida y sencilla directamente desde la aplicación. Olvídate de las filas y las complicaciones.<ul/>

Calendario Personalizado: Crea tu calendario personalizado con los eventos que te interesan. Recibirás recordatorios para que no te pierdas ninguna experiencia única.<ul/>

Información Detallada: Obtén información detallada sobre cada evento, incluyendo ubicación, horarios y descripciones. Toma decisiones informadas sobre dónde y cuándo participar.<ul/>

Comparte con Amigos: Invita a tus amigos y familiares a unirse a ti en los eventos. Comparte tus experiencias y crea recuerdos inolvidables juntos.<ul/>

Fácil de Usar y Disfrutar<ul/>

Nuestra web está diseñada pensando en ti. Es fácil de usar y te permite navegar sin esfuerzo por los eventos que más te interesan. Ya sea que busques diversión en familia, aprendizaje educativo o simplemente pasar un buen rato, ¡lo encontrarás aquí!
          </h2>
          </div>    
          <Link to ="/home">
          <button className={style.btn}>
            HOME
          </button>
          </Link>
          
        </div>
    )
}
export default About;