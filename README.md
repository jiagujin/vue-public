## ymhy-tool

> 前端公共组件

### 安装

- npm install ymhy-tool --save

#### 如何使用\$validator

```javascript
//element 表单验证规则
 import { $validator } from "ymhy-tool";
 Vue.prototype.$validator = $validator;
 <el-form-item prop="key" :rules=[$validator.require(),[$validator.requireChange()]></el-form-item>
```

#### 如何使用 table

```html
<el-button @click="serachList">搜索</el-button>

<common-table :queryList="queryList" :pageSize="20" ref="commonTable">
  <template slot="table">
    <!-- 表格内容定义区域 -->
    <el-table-column prop="example" label="案例"></el-table-column>
    ...
  </template>
</common-table>
```

```javascript
import { commonTable, request } from "ymhy-tool";
export default {
   components:{
    commonTable
   }
   methods: {
     //列表请求接口
    queryList(param) {
      return request({
        url:"http://example.com",
        method: "post",
        data: {
          ...param,
          //name: this.name
        }
      });
    },
    // 列表搜索
    serachList() {
      this.$refs.commonTable.getList();
    }
  }
}
```
