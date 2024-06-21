#  switch
- 基础用法
``` java
 int chooseValue = 1;
 switch(chooseValue){
    case 0:
        System.out.println("选项0");
        break;
    case 1:
        System.out.println("选项1");
        break;
    case 2:
        System.out.println("选项2");
        break;
    default:
        System.out.println("默认选项");
        break;
 }
```
- 范围选择
``` java
int chooseValue = 1;
switch (chooseValue) {
    case 0:
        System.out.println("选项0");
        break;
    case 1:
        System.out.println("选项0");
        break;
    case 2:
        System.out.println("选项0");
        break;
    default:
        System.out.println("默认选项");
        break;
}
```
- case 穿透
``` java
    int chooseValue = 1;
        switch (chooseValue) {
            case 0:
            case 1:
            case 2:
                System.out.println("选项0");
                break;
            default:
                System.out.println("默认选项");
                break;
    }
```
- 简写
``` java
    int chooseValue = 1;
        switch (chooseValue) {
            case 0,1,2
                System.out.println("选项0");
                break;
            default:
                System.out.println("默认选项");
                break;
    }
```

- jdk12 新特性
``` java
int chooseValue = 1;
switch (chooseValue) {
    case 0,1,2 ->System.out.println("选项0");
    default->System.out.println("默认选项");
}
```