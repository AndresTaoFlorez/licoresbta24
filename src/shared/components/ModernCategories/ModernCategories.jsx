import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '../icons/index.jsx';
import { Category } from '../../../domain/valueObjects/Category';
import './ModernCategories.scss';

/**
 * ModernCategories - Beautiful category selector with animations
 * Uses brand colors and modern design patterns
 */
function ModernCategories({ products, selectedCategory, onCategoryClick }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Extract categories using domain logic
  const categoryObjects = Category.fromProducts(Object.values(products));

  // Count products per category
  const getCategoryCount = (categoryName) => {
    return Object.values(products).filter(
      p => p.CATEGORIA === categoryName
    ).length;
  };

  // Scroll handler
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth / 2 : clientWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (categoryName) => {
    onCategoryClick?.(categoryName);

    // Navigate to category route
    if (!categoryName || categoryName === '') {
      navigate('/home');
    } else {
      navigate(`/${categoryName}`);
    }
  };

  return (
    <section className="modern-categories">
      <div className="modern-categories__container">
        {/* Header */}
        <div className="modern-categories__header">
          <h2 className="modern-categories__title">
            Nuestro Mundo de Sabores
          </h2>
          <p className="modern-categories__subtitle">
            Venta únicamente para mayores de 18 años
          </p>
        </div>

        {/* Scroll Wrapper with Arrows */}
        <div className="modern-categories__scroll-wrapper">
          {/* Left Arrow */}
          <button
            className="modern-categories__arrow modern-categories__arrow--left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft />
          </button>

          {/* Scrollable Categories */}
          <div
            ref={scrollRef}
            className="modern-categories__scroll-container"
          >
            <ul className="modern-categories__list">
              {/* All Products */}
              <li className="modern-categories__item">
                <button
                  className={`modern-categories__pill ${
                    !selectedCategory || selectedCategory === '' || selectedCategory === 'TODOS'
                      ? 'modern-categories__pill--active'
                      : ''
                  }`}
                  onClick={() => handleCategoryClick('')}
                >
                  Todos
                  <span className="modern-categories__pill__count">
                    {Object.values(products).length}
                  </span>
                </button>
              </li>

              {/* Category Pills */}
              {categoryObjects.map((categoryObj) => {
                const categoryName = categoryObj.getNormalized();
                const displayName = categoryObj.getDisplay();
                const count = getCategoryCount(categoryName);
                const isActive = selectedCategory === categoryName;

                return (
                  <li key={categoryName} className="modern-categories__item">
                    <button
                      className={`modern-categories__pill ${
                        isActive ? 'modern-categories__pill--active' : ''
                      }`}
                      onClick={() => handleCategoryClick(categoryName)}
                    >
                      {displayName}
                      <span className="modern-categories__pill__count">
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Arrow */}
          <button
            className="modern-categories__arrow modern-categories__arrow--right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModernCategories;
