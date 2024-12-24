import React, { useState } from 'react';
import { Item } from './ItemData';

interface ItemCardProps {
  item: Item; // Single item instead of array
  onSelect: (item: Item, quantity: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= item.quantity) {
      setQuantity(value);
    }
  };

  const cardStyle = {
    backgroundColor: '#f8f9fa',  // Light background color
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',  // Subtle shadow
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 8px 24px',
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={cardStyle}>
        <img 
          src={item.image} 
          alt={item.name} 
          className="card-img-top" 
          style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{item.name}</h5>
          <p className="card-text text-center">Available: {item.quantity}</p>
          <input 
            type="number"
            className="form-control mb-2 text-center"
            min="1"
            max={item.quantity}
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Quantity"
          />
          <button 
            className="btn btn-primary w-100"
            onClick={() => onSelect(item, quantity)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
