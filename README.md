Please fix the following errors and issues in the codebase:

## Critical Errors (Must Fix)

### 1. React Hook Issues in useSwipeUnlock.jsx (Line 23)
- Import useState from 'react' at the top of the file
- Move the useState hook call inside a component function (hooks cannot be called at top level)
- Remove or use the unused variables: isUnlocked, setIsUnlocked

### 2. Duplicate Object Key in characterMapper.js (Line 30)
- Remove the duplicate 'AÑEJO' key in the object
- Keep only one definition or rename one if they serve different purposes

### 3. Unused Variable in AppContext.jsx (Line 83)
- Remove the unused variable: setStorageState
- Or use it if it's needed

## React Fast Refresh Warnings (Should Fix)

### 4. Mixed Exports Issues
Fix these files that export both components and non-components:
- src/context/AppContext.jsx (Line 177)
- src/features/location/components/DeliveryLocationSelector.jsx (Line 8)
- src/shared/components/WhatsAppButton.jsx (Line 1)

Solution: Separate component exports from utility/constant exports into different files

### 5. Missing Dependency in useEffect (AppContext.jsx Line 66)
- Add 'products' to the useEffect dependency array
- Or remove it from the effect if it's intentionally excluded

## Guidelines

- Maintain existing functionality
- Follow React hooks rules
- Keep code clean and readable
- Don't break any working features
- Use ESLint auto-fix where possible

Please fix each error and confirm when complete.
```

---

## Alternative: More Specific Prompt

If you want even more detail:
```
Fix the following ESLint and React errors:

## File: src/features/landing/hooks/useSwipeUnlock.jsx

Line 23 - Fix these 3 issues:
1. Add at top: import { useState } from 'react';
2. Move useState call inside a React component or custom hook function
3. Either use isUnlocked/setIsUnlocked or remove them

Example fix:
```javascript
import { useState } from 'react';

export function useSwipeUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  // ... rest of hook logic
  return { isUnlocked, setIsUnlocked };
}
```

## File: src/utils/characterMapper.js

Line 30 - Remove duplicate key:
```javascript
// Before (wrong):
{
  'AÑEJO': value1,
  'AÑEJO': value2  // ❌ Duplicate
}

// After (correct):
{
  'AÑEJO': correctValue  // ✅ Keep only one
}
```

## File: src/context/AppContext.jsx

Line 83 - Remove unused variable:
```javascript
// Remove this line if setStorageState is not used:
const [storageState, setStorageState] = useState();
```

Line 66 - Add missing dependency:
```javascript
useEffect(() => {
  // ... code using products
}, [products]); // ✅ Add products here
```

Line 177 - Separate exports:
Create a new file for non-component exports or ensure this file only exports the component as default.

## Files with Mixed Exports

Move utility functions/constants to separate files:
- src/features/location/components/DeliveryLocationSelector.jsx (Line 8)
- src/shared/components/WhatsAppButton.jsx (Line 1)

Example:
```javascript
// Instead of:
export const Component = () => {};
export const utility = () => {};

// Do:
// Component.jsx
export default Component = () => {};

// utils.js
export const utility = () => {};
```

Run `npm run lint` after fixes to verify all errors are resolved.
```

---

## Quick Copy-Paste Version
```
Fix these 9 ESLint errors:

1. useSwipeUnlock.jsx:23 - Import useState, move hook inside function, remove unused vars
2. characterMapper.js:30 - Remove duplicate 'AÑEJO' key
3. AppContext.jsx:83 - Remove unused setStorageState
4. AppContext.jsx:66 - Add 'products' to useEffect dependencies
5-7. AppContext.jsx:177, DeliveryLocationSelector.jsx:8, WhatsAppButton.jsx:1 - Separate component and non-component exports

Follow React hooks rules and ESLint recommendations. Verify with `npm run lint` after.