<template>
  <div id="app">
    <div class="content"></div>
    <div class="dataTables_paginate"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: {
    sumPage: {
      type: Number,
      default: 10
    },
    index: {
      type: Number,
      default: 1
    },
    contentDom: {
      type: String,
      default: '.content'
    },
    onPage: {
      type: Function,
      default: function(index) {
        if (index > 0 && index < this.ops.sumPage + 1) {
          this.setOps({
            index: index
          });
          $(this.contentDom).html(index);
        }
      }
    }
  },
  data() {
    return {
      ops: {
        container: '.dataTables_paginate',
        sumPage: 20,
        index: 10
      },
      box: '',
      btns: []
    };
  },
  mounted() {
    //dom生成，不能用created
    this.ops = $.extend(this.ops, { sumPage: this.sumPage, index: this.index });
    this.box = $(this.ops.container);

    this.setOps(); //初始化
    this.addEvn();
  },
  methods: {
    init() {
      this.box.html('');
      var index = this.ops.index;

      var arr = [
        {
          title: index,
          index: index,
          cls: 'current'
        }
      ];

      var index1 = index;
      var len = index - 3;
      while (--index1 > len) {
        if (index1 > 0) {
          arr.unshift({
            title: index1,
            index: index1
          });
        }
      }
      if (index1 >= 2) {
        arr.unshift({
          title: '…',
          index: ''
        });
      }
      if (index1 >= 1) {
        arr.unshift({
          title: 1,
          index: 1
        });
      }
      arr.unshift({
        title: '上一页',
        index: index - 1 > 0 ? index - 1 : 1
      });
      //首页
      arr.unshift({
        title: '首页',
        index: 1
      });
      //index后页数
      var sumPage = this.ops.sumPage;
      var index2 = index;
      len = index + 3;
      if (index2 > sumPage) {
        index2 = sumPage;
      }
      while (++index2 < len) {
        if (index2 <= sumPage) {
          arr.push({
            title: index2,
            index: index2
          });
        }
      }
      if (index2 <= sumPage - 1) {
        arr.push({
          title: '…',
          index: ''
        });
      }

      if (index2 <= sumPage) {
        arr.push({
          title: sumPage,
          index: sumPage
        });
      }
      arr.push({
        title: '下一页',
        index: index + 1 > sumPage ? sumPage : index + 1
      });

      this.btns = arr;
    },
    setOps(ops) {
      this.ops = $.extend(this.ops, ops);
      this.init();
      this.create();
    },
    addEvn() {
      var that = this;
      this.box.off();
      this.box.on('click', '.paginate_button', function() {
        var index = $(this).attr('data-index');
        if (index) {
          that.onPage(index / 1);
        }
        return false;
      });

      //增加go点击事件
      this.box.on('click', '.paginate_go', function() {
        var index = that.box.find('.paginate_input').val();
        if (index) {
          that.onPage(index / 1);
        }
      });
    },
    create() {
      var box = this.box;
      box.html('');

      var arr = this.btns;

      // console.log(arr);

      var paginate_page;
      for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        if (i == 0) {
          var home = $('<a class="home paginate_button">首页</a>');
          home.attr('data-index', item.index);
          box.append(home);
        } else if (i == 1) {
          var previous = $('<a class="previous paginate_button">上一页</a>');
          previous.attr('data-index', item.index);
          if (this.ops.index == 1) {
            previous.addClass('disabled');
          }
          box.append(previous);
        } else if (i == len - 1) {
          var next = $('<a class="next paginate_button">下一页</a>');
          next.attr('data-index', item.index);

          // if (item.index === this.ops.sumPage) {
          //     next.addClass("disabled")
          // }
          if (this.ops.index === this.ops.sumPage) {
            next.addClass('disabled');
          }

          box.append(next);
        } else {
          if (!paginate_page) {
            paginate_page = $('<span></span>').addClass('paginate_page');
            box.append(paginate_page);
          }
          var pbtn = $('<a class="paginate_button"></a>');
          pbtn.text(item.title);
          pbtn.attr('data-index', item.index);
          if (item.cls) {
            pbtn.addClass(item.cls);
          }

          //增加 判断若为... 设为不可点击
          if (item.title == '…') {
            pbtn.addClass('disabled');
          }

          paginate_page.append(pbtn);
        }
      }

      var html = $(
        '<span class="paginate_of">  跳转至</span><input class="paginate_input" type="text"><a class="paginate_go">页 GO</a>'
      );
      box.append(html);
      box.find('input').val(this.ops.index);
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
div.dataTables_paginate {
  width: 100%;
  height: 56px;
  text-align: center;
}

div.dataTables_paginate a.paginate_button {
  display: inline-block;
  height: 16px;
  line-height: 16px;
  margin: 16px 2px;
  padding: 4px 8px;
}

div.dataTables_paginate [class*='paginate_'] {
  font-size: 12px;
  font-family: SimSun;
  color: #474747;
  cursor: pointer;
}

div.dataTables_paginate a.paginate_button.current {
  background: #ea5404;
  color: #fff;
}

/*div.pagination a.paginate_button.disabled {
        display: none;
    }*/
div.dataTables_paginate .paginate_input {
  width: 30px;
  height: 16px;
  margin: 0 10px;
  border: 1px solid #999999;
  padding-left: 4px;
}
</style>
