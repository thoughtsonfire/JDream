# 随笔

## ExtractPropTypes 获取类型


```ts
import type { ExtractPropTypes } from "vue";

export const iconProps = {
    size:{
        type:Number,
    },
    color:{
        type:String,
    }
}

export type IconProps = ExtractPropTypes<typeof iconProps>;
```