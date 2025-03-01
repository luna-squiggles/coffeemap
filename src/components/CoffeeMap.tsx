
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CoffeeShop } from '@/lib/types';
import ShopPopup from './ShopPopup';
import DetailedShopPopup from './DetailedShopPopup';

interface CoffeeMapProps {
  shops: CoffeeShop[];
}

// Coffee shop pin colors
const PIN_COLORS = ['#DB966C', '#CB7870', '#A67668', '#E6B77E'];

// Function to get a random color from the defined palette
const getRandomPinColor = () => {
  const randomIndex = Math.floor(Math.random() * PIN_COLORS.length);
  return PIN_COLORS[randomIndex];
};

const CoffeeMap: React.FC<CoffeeMapProps> = ({ shops }) => {
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);
  const [detailedView, setDetailedView] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [shopColors, setShopColors] = useState<Record<string, string>>({});
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [pinPosition, setPinPosition] = useState({ x: 0, y: 0 });
  
  // Initialize random colors for each shop
  useEffect(() => {
    const colors: Record<string, string> = {};
    shops.forEach(shop => {
      colors[shop.id] = getRandomPinColor();
    });
    setShopColors(colors);
  }, [shops]);
  
  const handlePinClick = (shop: CoffeeShop, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event from bubbling up
    
    // Get the pin's position on the page (absolute coordinates)
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    // Calculate absolute position that accounts for scrolling
    const x = rect.left + window.scrollX + (rect.width / 2);
    const y = rect.top + window.scrollY;
    
    setPinPosition({ x, y });
    
    if (selectedShop?.id === shop.id && !detailedView) {
      setSelectedShop(null);
    } else {
      setSelectedShop(shop);
      setDetailedView(false);
    }
  };
  
  const handleClosePopup = () => {
    if (detailedView) {
      setDetailedView(false);
    } else {
      setSelectedShop(null);
    }
  };
  
  const handleViewDetails = () => {
    setDetailedView(true);
  };
  
  const handleImageLoad = () => {
    setMapLoaded(true);
    console.log("Map loaded");
  };
  
  // Add click outside handler to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedShop && 
        !event.composedPath().some(el => {
          if (el instanceof HTMLElement) {
            return el.classList.contains('map-pin') || 
                   el.classList.contains('map-popup') || 
                   el.classList.contains('detailed-map-popup');
          }
          return false;
        })
      ) {
        if (detailedView) {
          setDetailedView(false);
        } else {
          setSelectedShop(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedShop, detailedView]);
  
  // Convert coordinates using percentages to ensure pins scale with image
  const getPositionStyle = (x: number, y: number) => {
    // Map coordinates are based on a coordinate system where (0,0) is bottom-left
    // We need to convert to a percentage-based system where (0%,0%) is top-left
    
    // The original image is 612x396
    const xPercent = (x / 612) * 100;
    
    // Invert the y-coordinate since CSS positions from top
    const yPercent = 100 - ((y / 396) * 100);
    
    return {
      left: `${xPercent}%`,
      top: `${yPercent}%`
    };
  };
  
  return (
    <div className="relative">
      <div className="map-container rounded-lg overflow-hidden shadow-md relative" ref={mapContainerRef}>
        <img 
          src="/assets/04670d4f-4554-4f24-8a24-107885641e72.png"
          alt="London Map" 
          className="w-full transition-opacity duration-700"
          style={{ opacity: mapLoaded ? 1 : 0 }}
          onLoad={handleImageLoad}
        />
        
        {mapLoaded && shops.map((shop) => {
          const posStyle = getPositionStyle(shop.x, shop.y);
          const pinColor = shopColors[shop.id] || '#DB966C'; // Default to first color if not found
          
          return (
            <div key={shop.id}>
              <button
                className="map-pin"
                style={{ 
                  left: posStyle.left, 
                  top: posStyle.top,
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  width: '24px',
                  height: '24px'
                }}
                onClick={(e) => handlePinClick(shop, e)}
                aria-label={`Coffee shop: ${shop.name}`}
              >
                <div 
                  className={`pin-marker ${selectedShop?.id === shop.id ? 'active' : ''}`}
                  style={{ 
                    backgroundColor: pinColor,
                    transform: 'rotate(45deg)',
                    border: '1px solid white'
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Regular popup */}
      {selectedShop && !detailedView && createPortal(
        <PopupOverlay 
          shop={selectedShop} 
          position={pinPosition} 
          onClose={handleClosePopup} 
          onViewDetails={handleViewDetails}
        />,
        document.body
      )}
      
      {/* Detailed popup */}
      {selectedShop && detailedView && createPortal(
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setDetailedView(false)}
        >
          <div className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <DetailedShopPopup 
              shop={selectedShop} 
              onClose={handleClosePopup} 
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

// Regular popup overlay
const PopupOverlay: React.FC<{
  shop: CoffeeShop;
  position: { x: number; y: number };
  onClose: () => void;
  onViewDetails: () => void;
}> = ({ shop, position, onClose, onViewDetails }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Calculate popup position based on pin position and window dimensions
  const getPopupStyle = () => {
    const popupWidth = 264; // 256px width + 8px padding
    const windowWidth = window.innerWidth;
    
    // Start by positioning the popup centered above the pin
    let left = position.x - (popupWidth / 2);
    let top = position.y - 10;
    
    // Ensure popup stays within the window on the right
    if (left + popupWidth > windowWidth + window.scrollX) {
      left = windowWidth + window.scrollX - popupWidth - 10;
    }
    
    // Ensure popup stays within window on the left
    if (left < window.scrollX + 10) {
      left = window.scrollX + 10;
    }
    
    return { 
      left: `${left}px`,
      top: `${top}px`
    };
  };
  
  // Use useEffect to add event listener for clicks outside popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <div 
      className="map-popup"
      ref={popupRef}
      style={{
        position: 'absolute',
        zIndex: 1000,
        ...getPopupStyle()
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <ShopPopup 
        shop={shop} 
        onClose={onClose}
        onViewDetails={onViewDetails} 
      />
    </div>
  );
};

export default CoffeeMap;
