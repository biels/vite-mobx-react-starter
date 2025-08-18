# Project Guidelines

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
The project has `enforceActions: "never"` configured, meaning you can modify observables directly without wrapping in actions. Also, organize classes propelry, and understand existing logic wehen adding or updating features.
