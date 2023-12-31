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
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isSoldOut = event.stock <= 0;

  const handleAddToCart = () => {
    const eventWithImages = {
      ...event,
      images: event.images,
    };
    addToCart(eventWithImages);
    setShowAddedToCart(true);

    setTimeout(() => {
      setShowAddedToCart(false);
    }, 2000);
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
            loading="lazy"
          />
        </div>
        <Typography variant="body2" color="text.secondary">
          ${event.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
  Categorías: {event.categories.map((category) => category.name).join(', ') || 'Sin categoría'}
</Typography>

      </CardContent>
      <CardActions disableSpacing>
        {!isSoldOut && (
          <IconButton
            aria-label="add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon />
          </IconButton>
        )}
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography paragraph>Description:</Typography>
        <Typography paragraph>{event.summary}</Typography>
      </Collapse>
      {showAddedToCart && (
        <div className={style.notification}>
          ¡Agregado al carrito!
        </div>
      )}
    </Card>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(CustomCard);
