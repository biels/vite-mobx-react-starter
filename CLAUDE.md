# Project Guidelines

## Maintenance and Compatibility

- Run `bun run check` after changes; it validates strict TypeScript, store regressions, and the production build.
- Use the Node version in `.nvmrc` and the Bun version in `package.json`. Keep `bun.lock` and `package-lock.json` synchronized.
- This starter intentionally uses MobX 6 / mobx-react 9 for legacy decorators and tsyringe metadata. MobX 7 requires a coordinated decorator and dependency injection migration.
- Import routing APIs from `react-router`; use `react-router/dom` for the browser `RouterProvider`.

## State Management Approach

This project uses **MobX** for state management. Please follow these guidelines:

### ❌ DO NOT USE
- `useState` - Never use React's useState hook
- `useEffect` - Minimize usage, only when absolutely necessary for external side effects

### ✅ USE INSTEAD
- **MobX stores** for all state management
- `@observable` decorator for reactive state
- `@action` decorator for state mutations (though enforceActions is set to "never" in this project)
- `observer()` HOC to make components reactive

### MobX Pattern in This Project

1. **Store Creation**: Use singleton pattern with `tsyringe` dependency injection
   ```typescript
   @singleton()
   export class ExampleStore {
       @observable
       loading = false;
       
       constructor() {
           makeObservable(this);
       }
   }
   ```

2. **Store Access**: Use custom hooks that resolve from DI container
   ```typescript
   export let useExampleStore = () => {
       return container.resolve(ExampleStore);
   }
   ```

3. **Component Usage**: Wrap components with `observer()` and access stores via hooks
   ```typescript
   export const ExamplePage = observer(() => {
       let store = useExampleStore()
       // Use store.property directly - it's reactive!
       return <div>{store.loading}</div>
   })
   ```

### Why MobX?
- **Simpler code**: No need for useState/useEffect in most cases
- **Automatic reactivity**: Components re-render only when observed values change
- **Better performance**: Fine-grained reactivity system
- **Cleaner separation**: Business logic lives in stores, not components

### Key Configuration
The project has `enforceActions: "never"` configured, meaning you can modify observables directly without wrapping in actions. Also, organize classes properly, and understand existing logic when adding or updating features.

## Adding New Pages

To add a new page to this application, follow this pattern:

### 1. Create Page Structure
Create a new folder in `src/pages/` with this structure:
```
src/pages/your-page-name/
├── YourPageName.tsx        # Page component (observer-wrapped)
├── YourPageStore.tsx       # MobX store for the page
└── your-logic/             # (Optional) Business logic layer
    ├── YourLogic.ts
    ├── YourModel.ts
    └── YourTypes.ts
```

### 2. Create the MobX Store
```typescript
// YourPageStore.tsx
import {container, singleton} from "tsyringe";
import {makeObservable, observable} from "mobx";

export let useYourPageStore = () => {
    return container.resolve(YourPageStore);
}

@singleton()
export class YourPageStore {
    @observable
    loading = false;
    
    @observable
    data: any[] = [];

    constructor() {
        makeObservable(this);  // IMPORTANT: Call this first!
        this.init();
    }

    init() {
        // Initialize store
    }
}
```

### 3. Create the Page Component
```typescript
// YourPageName.tsx
import React from "react";
import {observer} from 'mobx-react'
import {useYourPageStore} from "./YourPageStore.tsx";

export interface YourPageNameProps {}

export const YourPageName = observer((props: YourPageNameProps) => {
    let store = useYourPageStore()
    
    return <div>
        {store.loading ? "Loading..." : "Your content"}
    </div>
})
```

### 4. Add Route in main.tsx
```typescript
// In main.tsx, add your route to the router configuration:
import {YourPageName} from "./pages/your-page-name/YourPageName.tsx";

const router = createBrowserRouter([
    // ... existing routes
    {
        path: "/your-page",
        element: <YourPageName />,
    },
]);
```

### Important Notes:
- **DO NOT** use `useState`, `useEffect`, or `useContext` in page components
- **ALWAYS** wrap components with `observer()` to make them reactive
- **ALWAYS** call `makeObservable(this)` first in store constructors
- Use the custom hook pattern (`useYourPageStore`) to access stores
- Keep business logic in stores, not in components
