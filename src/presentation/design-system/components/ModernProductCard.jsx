import { useState } from 'react';
import { Heart } from 'lucide-react';

/**
 * ModernProductCard - Premium product card with animations
 * Uses brand colors and modern design patterns
 */
function ModernProductCard({ product, badge = null, onToggleFavorite, isFavorite = false }) {
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setLocalFavorite(!localFavorite);
    onToggleFavorite?.(product);
  };

  return (
    <article className="modern-product-card">
      {/* Image Container */}
      <div className="modern-product-card__image-container">
        <img
          src={product.FOTO}
          alt={product.PRODUCTO}
          className="modern-product-card__image"
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div className="modern-product-card__overlay" />

        {/* Badge (New, Sale, Popular) */}
        {badge && (
          <div className={`modern-product-card__badge modern-product-card__badge--${badge.toLowerCase()}`}>
            {badge}
          </div>
        )}

        {/* Favorite button */}
        <button
          className={`modern-product-card__favorite ${localFavorite ? 'modern-product-card__favorite--active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={localFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart />
        </button>
      </div>

      {/* Content */}
      <div className="modern-product-card__content">
        {/* Category Badge */}
        <span className="modern-product-card__category">
          {product.CATEGORIA}
        </span>

        {/* Product Name */}
        <h3 className="modern-product-card__title">
          {product.PRODUCTO}
        </h3>

        {/* Meta Info (Brand, Size) */}
        {(product.MARCA || product.MEDIDA) && (
          <div className="modern-product-card__meta">
            {product.MARCA && <span>{product.MARCA}</span>}
            {product.MARCA && product.MEDIDA && <span>•</span>}
            {product.MEDIDA && <span>{product.MEDIDA}</span>}
          </div>
        )}

        {/* Footer with Price */}
        <div className="modern-product-card__footer">
          <div className="modern-product-card__price-container">
            <div className="modern-product-card__price">
              ${product.PRECIO}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * ModernProductCardSkeleton - Loading skeleton
 */
export function ModernProductCardSkeleton() {
  return (
    <div className="modern-product-card modern-product-card--skeleton">
      <div className="modern-product-card__image-container" />
      <div className="modern-product-card__content">
        <div style={{ width: '60%', height: '20px', marginBottom: '8px' }} />
        <div style={{ width: '90%', height: '24px', marginBottom: '8px' }} />
        <div style={{ width: '40%', height: '16px', marginBottom: '16px' }} />
        <div style={{ width: '100%', height: '60px' }} />
      </div>
    </div>
  );
}

export default ModernProductCard;
