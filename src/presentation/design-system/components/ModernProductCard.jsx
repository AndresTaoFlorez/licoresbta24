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

  const hasMeta = product.MARCA || product.MEDIDA;
  const badgeClass = badge ? `modern-product-card__badge--${badge.toLowerCase()}` : '';
  const favoriteClass = localFavorite ? 'modern-product-card__favorite--active' : '';

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

        <div className="modern-product-card__overlay" />

        {badge && (
          <div className={`modern-product-card__badge ${badgeClass}`}>
            {badge}
          </div>
        )}

        <button
          className={`modern-product-card__favorite ${favoriteClass}`}
          onClick={handleFavoriteClick}
          aria-label={localFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart />
        </button>
      </div>

      {/* Content */}
      <div className="modern-product-card__content">
        <span className="modern-product-card__category">
          {product.CATEGORIA}
        </span>

        <h3 className="modern-product-card__title">
          {product.PRODUCTO}
        </h3>

        {hasMeta && (
          <div className="modern-product-card__meta">
            {product.MARCA && <span>{product.MARCA}</span>}
            {product.MARCA && product.MEDIDA && <span>•</span>}
            {product.MEDIDA && <span>{product.MEDIDA}</span>}
          </div>
        )}

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
  const skeletonStyle = {
    category: { width: '60%', height: '20px', marginBottom: '8px' },
    title: { width: '90%', height: '24px', marginBottom: '8px' },
    meta: { width: '40%', height: '16px', marginBottom: '16px' },
    footer: { width: '100%', height: '60px' }
  };

  return (
    <div className="modern-product-card modern-product-card--skeleton">
      <div className="modern-product-card__image-container" />
      <div className="modern-product-card__content">
        <div style={skeletonStyle.category} />
        <div style={skeletonStyle.title} />
        <div style={skeletonStyle.meta} />
        <div style={skeletonStyle.footer} />
      </div>
    </div>
  );
}

export default ModernProductCard;