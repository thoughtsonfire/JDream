# 规范

## 项目目录

约定大于配置，好的工程目录约定，能够提升项目的可维护性

```
- src
    - core
    - common
        - middleware
        - interceptors
        - guards
    - user
          - interceptors (scoped interceptors)
        - user.controller.ts
        - user.model.ts
    - store
        - store.controller.ts
        - store.model.ts
```
