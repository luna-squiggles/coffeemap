
import React from 'react';
import { CoffeeShop } from '@/lib/types';

interface ShopPopupProps {
  shop: CoffeeShop;
  onClose: () => void;
  onViewDetails: () => void;
}

const ShopPopup: React.FC<ShopPopupProps> = ({ shop, onClose, onViewDetails }) => {
  const renderRating = (value: number, max: number = 5) => {
    return (
      <div className="rating-stars">
        {[...Array(max)].map((_, i) => (
          <span 
            key={i} 
            className={`inline-block h-4 w-4 ${i < value ? 'text-amber-500' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  
  return (
    <div className="map-popup bg-white rounded-lg w-64 p-4 animate-fade-in shadow-md">
      <h3 className="text-lg font-playfair font-semibold mb-1 text-[#373F47]">{shop.name}</h3>
      <a 
        href={shop.addressUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address + ', London')}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-sm font-mono text-[#373F47] hover:text-[#373F47] underline underline-offset-2 mb-3 block"
      >
        {shop.address}
      </a>
      
      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm font-mono text-[#373F47]">
        <div className="text-[#373F47]">Laptop Friendly:</div>
        <div>{shop.laptopFriendly}</div>
        
        <div className="text-[#373F47]">WiFi Speed:</div>
        <div>{shop.wifiSpeed}</div>
        
        {shop.vibe !== undefined && (
          <>
            <div className="text-[#373F47]">Vibe:</div>
            <div>{renderRating(shop.vibe)}</div>
          </>
        )}
        
        {shop.quietness !== undefined && (
          <>
            <div className="text-[#373F47]">Quietness:</div>
            <div>{renderRating(shop.quietness)}</div>
          </>
        )}
      </div>
      
      {shop.description && (
        <p className="mt-3 text-sm font-mono text-[#373F47] border-t border-gray-100 pt-2">
          {shop.description}
        </p>
      )}
      
      {shop.openingHours && (
        <p className="mt-3 text-sm font-mono text-[#373F47] border-t border-gray-100 pt-2">
          {shop.openingHours}
        </p>
      )}
      
      <button
        onClick={onViewDetails}
        className="mt-3 w-full py-1.5 px-3 bg-coffee-light hover:bg-coffee text-[#373F47] rounded-md font-mono text-sm transition-colors"
      >
        View Details
      </button>
    </div>
  );
};

export default ShopPopup;
