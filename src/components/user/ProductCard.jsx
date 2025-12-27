import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react'; // Assuming you are using lucide-react or similar for icons

// Keep your existing imports for helper functions here
// import { getDisplayPriceFromBase, formatCurrency } from './your-utils-file';
// import { normalizeImageUrl } from './api'; 

const ProductCard = ({ product, onClick, currency, specialDiscount }) => {
  // NEW: State to track if image is ready or failed
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback to first variant's price, then root price, then 0
  const variantPrice = product.features?.[0]?.quantity || product.price || 0;

  const { hasDiscount, original, final } = getDisplayPriceFromBase({
    basePrice: variantPrice,
    currency,
    specialDiscount,
    originalBasePrice: product.originalPrice,
  });

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in "${product.name}" from your website. Could you share more details?`
  );
  const waLink = `https://wa.me/919079199046?text=${waMessage}`;

  return (
    <div className="group cursor-pointer relative">
      <div 
        onClick={() => onClick(product)} 
        className="relative overflow-hidden rounded-2xl mb-3 bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow"
      >
        {/* NEW: Loading Skeleton (visible while image loads) */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
            <span className="text-gray-400 text-xs font-medium">Loading...</span>
          </div>
        )}

        {/* NEW: Fallback for broken images */}
        {imageError ? (
          <div className="w-full h-56 sm:h-64 md:h-72 bg-gray-200 flex items-center justify-center text-gray-400">
            <span className="text-xs">Image Unavailable</span>
          </div>
        ) : (
          <img 
            src={normalizeImageUrl(product.image)} 
            alt={product.name} 
            loading="lazy" /* Browser will prioritize visible images */
            onLoad={() => setImageLoaded(true)} /* Fade in when ready */
            onError={() => setImageError(true)} /* Handle errors */
            className={`w-full h-56 sm:h-64 md:h-72 object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`} 
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-4 z-20">
          <button className="w-full bg-[#3a3a3a] text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[#d4b896] transition-colors shadow-lg">
            Quick View
          </button>
        </div>
      </div>

      {/* WhatsApp badge on card */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 bg-[#25D366] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform z-30"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={18} />
      </a>

      <div className="text-center px-1 sm:px-2">
        <div className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.category}</div>
        <h3 className="font-serif text-sm sm:text-base text-[#3a3a3a] mb-1 group-hover:text-[#d4b896] transition-colors line-clamp-2">{product.name}</h3>
        <div className="flex justify-center items-center gap-2">
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(original, currency)}
            </span>
          )}
          <span className="font-bold text-[#3a3a3a] text-sm">
            {formatCurrency(final, currency)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


