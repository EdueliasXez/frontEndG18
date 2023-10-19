import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { addToCart } from '../../Redux/actions/cart_actions'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from './Card.module.css';

const CustomCard = ({ event, addToCart }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={style.card}>
      <CardContent>
        <Typography variant="h5" component="div">
          <NavLink to={`/detail/${event._id}`} className={style.link}>
            {event.title}
          </NavLink>
        </Typography>
        <div className={style.cardImageContainer}>
          <img
            src={event.images[0]}
            alt={event.title}
            className={style.cardImage}
          />
        </div>
        <Typography variant="body2" color="text.secondary">
          ${event.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Categoría: {event.categories[0] ? event.categories[0].name : 'Sin categoría'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to cart"
          onClick={() => {
            addToCart(event); 
          }}
        >
          <ShoppingCartIcon />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ overflowY: 'auto', maxHeight: '200px' }}>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{event.summary}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const mapDispatchToProps = {
  addToCart, 
};

export default connect(null, mapDispatchToProps)(CustomCard); 
