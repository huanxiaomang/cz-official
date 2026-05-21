ts：养成初步的良好编程习惯

为开发减少时间

但不去深究



```ts
// 严格的类型避免bug
let str: string = '1';

str = '122';


const img: HTMLImageElement = document.createElement('img');
const div: HTMLDivElement = document.createElement('div');

// div.src = 1;
img.src


// 类型提示
interface Options {
    path: string,
    time: string,
    name?: string
}

const options: Options = {
    path: 'xxx',
    time: 'xxx'
}


function parseOptions(options: Options) {
    const { path, time, name } = options;
    if (name) { 
    
    }

}

```



```js
let a: string = 'abc';
let isObj: string[] = ['a', 'b', 'c'];
let ab = 'asd';

interface User {
    name: string,
    age: number,
    gender?: string
}

const user: User = {
    age: 10,
    name: '张三',
};

interface Options {
    path: string,
    time: string,
    name?: string
}

const options: Options = {
    path: 'xxx',
    time: 'xxx',
    name: 'xxx',
}


function parseOptions(options: any) {
    console.log(options);

}
```

