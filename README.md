# vue-paginate

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 参数介绍

sumPage:分页总数，默认 10
index:当前页，默认 1
contentDom:显示内容 dom 结构 selector 选择器
onPage:切换当前页执行的函数，默认在contentDom结构显示当前页码

## 使用 demo

```
<template>
  <div class="userlist-wrap">
    <vue-paginatejs :index="1" :sumPage="8" :onPage="mypage"></vue-paginatejs>
  </div>
</template>
<script>
import vuePaginatejs from 'vue-paginatejs';
export default {
  components: {
    vuePaginatejs
  },
  methods: {
    mypage(index) {
      if (index > 0 && index < 9) {
        //当前页码改变，必须执行
        this.setOps({
          index: index
        });
        console.log(index);
        //$(this.contentDom).html(index);
      }
    }
  }
};
</script>
```
