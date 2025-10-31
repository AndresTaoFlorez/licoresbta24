src/
├── main.jsx
├── App.jsx
│
├── domain/                           ✅ BIEN
│   ├── entities/
│   │   └── Product.js
│   ├── value-objects/
│   │   ├── Category.js
│   │   └── Price.js
│   ├── repositories/                 📝 AGREGAR interfaces
│   │   └── IProductRepository.js
│   └── services/                     📝 AGREGAR si necesitas
│       └── ProductService.js
│
├── application/                      ✅ CASI BIEN
│   ├── use-cases/                    📝 RENOMBRAR (era useCases)
│   │   └── products/
│   │       ├── LoadProducts.js
│   │       └── FilterProductsByCategory.js
│   ├── mappers/
│   │   └── ProductMapper.js
│   └── dtos/                         📝 AGREGAR
│       └── ProductDTO.js
│
├── infrastructure/                   ✅ BIEN
│   ├── repositories/
│   │   ├── ProductRepository.js      (implementa IProductRepository)
│   │   └── StorageRepository.js
│   ├── services/
│   │   └── encodingService.js
│   └── state/                        📦 REDUX AQUÍ (caché de datos)
│       ├── store.js                  (configura Redux store)
│       └── slices/
│           ├── productsSlice.js      (caché de productos)
│           ├── cartSlice.js          (estado del carrito)
│           ├── locationSlice.js      (ubicación seleccionada)
│           └── uiSlice.js            (loading, modals, filtros UI)
│
├── presentation/                     🔴 REORGANIZAR TODO
│   ├── pages/                        📦 MOVER desde /pages
│   │   ├── Landing/
│   │   │   ├── Landing.jsx
│   │   │   └── Landing.scss
│   │   ├── SwipeToEnter/             📦 MOVER desde features/landing
│   │   │   ├── SwipeToEnter.jsx
│   │   │   └── SwipeToEnter.scss
│   │   ├── Home/
│   │   │   ├── Home.jsx              📦 MOVER ContentBody.jsx aquí
│   │   │   └── Home.scss
│   │   └── Category/
│   │       ├── CategoryPage.jsx      📦 MOVER desde /pages
│   │       └── CategoryPage.scss
│   │
│   ├── components/
│   │   ├── layout/                   📦 MOVER desde shared/components
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Header.scss
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Footer.scss
│   │   │   └── BackgroundEffects/
│   │   │       ├── BackgroundEffects.jsx
│   │   │       └── BackgroundEffects.scss
│   │   │
│   │   ├── shared/                   📦 MOVER desde design-system
│   │   │   ├── ModernProductCard/
│   │   │   │   ├── ModernProductCard.jsx
│   │   │   │   ├── ModernProductCard.scss
│   │   │   │   └── ModernProductCardSkeleton.jsx
│   │   │   ├── ModernCategories/
│   │   │   │   ├── ModernCategories.jsx
│   │   │   │   └── ModernCategories.scss
│   │   │   ├── Slider/
│   │   │   │   ├── Slider.jsx
│   │   │   │   └── Slider.scss
│   │   │   ├── WhatsAppButton/
│   │   │   │   ├── WhatsAppButton.jsx
│   │   │   │   ├── WhatsAppButton.scss
│   │   │   │   └── whatsappUtils.js
│   │   │   └── AnimatedWrapper/
│   │   │       └── AnimatedWrapper.jsx
│   │   │
│   │   └── features/                 📦 MOVER desde /features
│   │       ├── products/
│   │       │   └── ProductList/
│   │       │       ├── ProductList.jsx
│   │       │       └── ProductList.scss
│   │       └── location/
│   │           └── DeliveryLocationSelector/
│   │               ├── DeliveryLocationSelector.jsx
│   │               ├── DeliveryLocationSelector.scss
│   │               ├── locations.json
│   │               └── useDeliveryLocation.js
│   │
│   └── hooks/                        📝 CREAR (custom hooks globales)
│       ├── useProducts.js            (conecta componentes con Redux)
│       └── useLocation.js
│
├── shared/                           ✅ SIMPLIFICAR
│   ├── constants/
│   │   ├── categories.js
│   │   ├── config.js
│   │   └── routes.js                 📝 AGREGAR
│   ├── utils/
│   │   ├── formatters.js
│   │   └── stringHelpers.js
│   └── validators/                   📦 MOVER desde domain/validators
│       └── productValidator.js
│
└── styles/                           📝 NUEVA CARPETA GLOBAL
    ├── abstracts/
    │   ├── _variables.scss
    │   ├── _colors.scss
    │   ├── _design-tokens.scss
    │   ├── _mixins.scss
    │   └── _animations.scss
    ├── base/
    │   ├── _reset.scss
    │   └── _typography.scss
    ├── themes/
    │   ├── _gradients.scss
    │   └── _glassmorphism.scss
    └── main.scss                     (importa todo)
```

---

## Archivos que se ELIMINAN o MUEVEN
```
🗑️ ELIMINAR carpetas:
   ├── /context                       → Redux maneja todo el estado
   ├── /features                      → Mover a presentation/components/features
   ├── /pages                         → Mover a presentation/pages
   ├── /utils                         → Mover a shared/utils
   ├── /store                         → Mover a infrastructure/state
   ├── presentation/design-system     → Mover a presentation/components/shared
   └── shared/styles/components/      → Mover estilos a cada componente

📦 MOVER archivos:
   ├── domain/validators              → shared/validators
   ├── features/landing               → presentation/pages/SwipeToEnter
   ├── features/location              → presentation/components/features/location
   ├── features/products              → presentation/components/features/products
   ├── pages/CategoryPage.jsx         → presentation/pages/Category/
   ├── pages/ContentBody.jsx          → presentation/pages/Home/
   ├── shared/components/*            → presentation/components/layout/
   └── store/*                        → infrastructure/state/