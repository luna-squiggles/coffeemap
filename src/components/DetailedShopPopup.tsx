import React from 'react';
import { CoffeeShop } from '@/lib/types';

interface DetailedShopPopupProps {
  shop: CoffeeShop;
  onClose: () => void;
}

const DetailedShopPopup: React.FC<DetailedShopPopupProps> = ({ shop, onClose }) => {
  const renderRating = (value: number | undefined, max: number = 5) => {
    if (value === undefined) return null;
    
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
  
  // Get description from either lowercase or uppercase field
  const getDescription = () => {
    if (shop.description) return shop.description;
    // @ts-ignore - Check for capital 'D' Description field that might be in the CSV
    if (shop.Description) return shop.Description;
    return null;
  };
  
  const description = getDescription();
  
  return (
    <div className="detailed-map-popup bg-white rounded-xl w-full max-w-md overflow-hidden shadow-lg animate-fade-in">
      {/* Image section */}
      {shop.imageUrl && (
        <div className="relative w-full h-48">
          <img 
            src={shop.imageUrl} 
            alt={`${shop.name} interior`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent">
            <h2 className="text-2xl font-playfair font-semibold text-white p-4">{shop.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
            aria-label="Close details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Content section */}
      <div className="p-5">
        {/* Only show heading if no image */}
        {!shop.imageUrl && (
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-playfair font-semibold text-[#373F47]">{shop.name}</h2>
            <button 
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-1"
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Address section */}
        <a 
          href={shop.addressUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address + ', London')}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#6D6E71] font-mono hover:text-[#373F47] underline underline-offset-2 block mb-5"
        >
          {shop.address}
        </a>
        
        {/* Features grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-5">
          {/* Power outlets */}
          {shop.outletCount && (
            <div className="feature-item">
              <div className="flex items-center gap-2 text-[#6D6E71] font-mono mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Power Outlets</span>
              </div>
              <div className="text-[#373F47] font-mono">{shop.outletCount}</div>
            </div>
          )}
          
          {/* WiFi Speed */}
          {shop.wifiSpeed && (
            <div className="feature-item">
              <div className="flex items-center gap-2 text-[#6D6E71] font-mono mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a12.5 12.5 0 0 1 7.778 0M5.25 12.5a16.5 16.5 0 0 1 13.5 0M2 8.489a21 21 0 0 1 20 0" />
                </svg>
                <span>WiFi Speed</span>
              </div>
              <div className="text-[#373F47] font-mono">{shop.wifiSpeed}</div>
            </div>
          )}
          
          {/* WiFi Status */}
          {shop.wifiStatus && (
            <div className="feature-item">
              <div className="flex items-center gap-2 text-[#6D6E71] font-mono mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a12.5 12.5 0 0 1 7.778 0M5.25 12.5a16.5 16.5 0 0 1 13.5 0M2 8.489a21 21 0 0 1 20 0" />
                </svg>
                <span>WiFi Status</span>
              </div>
              <div className="text-[#373F47] font-mono">{shop.wifiStatus}</div>
            </div>
          )}
          
          {/* Laptop Friendly */}
          {shop.laptopFriendly && (
            <div className="feature-item">
              <div className="flex items-center gap-2 text-[#6D6E71] font-mono mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span>Laptop Friendly</span>
              </div>
              <div className="text-[#373F47] font-mono">{shop.laptopFriendly}</div>
            </div>
          )}
          
          {/* Quietness */}
          {shop.quietness !== undefined && (
            <div className="feature-item">
              <div className="flex items-center gap-2 text-[#6D6E71] font-mono mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 0 1 0 7.072m2.828-9.9a9 9 0 0 1 0 12.728M5.586 15.465a5 5 0 0 0 .117-7.043m-2.887 9.87a9 9 0 0 0 .342-12.652" />
                </svg>
                <span>Quietness</span>
              </div>
              <div className="text-amber-500">
                {renderRating(shop.quietness)}
              </div>
            </div>
          )}
          
          {/* Vibe */}
          {shop.vibe !== undefined && (
            <div className="feature-item">
              <div className="flex items-center gap-2 text-[#6D6E71] font-mono mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
                <span>Vibe</span>
              </div>
              <div className="text-amber-500">
                {renderRating(shop.vibe)}
              </div>
            </div>
          )}
        </div>
        
        {/* Description - Removed heading, kept content */}
        {description && (
          <div className="mb-5 border-t border-gray-100 pt-4">
            <p className="text-[#373F47] font-mono">{description}</p>
          </div>
        )}
        
        {/* Website link */}
        {shop.websiteUrl && (
          <div className="mt-4">
            <a 
              href={shop.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-[#9B6F51] hover:text-[#7D5A42] font-mono"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedShopPopup;
