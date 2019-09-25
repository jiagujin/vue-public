<template>
  <div class="common_table">
    <el-table :data="baseList">
      <slot name="table"></slot>
    </el-table>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="pageChange"
      :current-page="page"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    queryList: {
      type: Function
    },
    pageSize: {
      type: Number
    }
  },
  data() {
    return {
      baseList: [],
      page: 1,
      total: 0,
      size: this.pageSize || 20
    };
  },
  methods: {
    pageSizeChange(val) {
      this.size = val;
      this.getList();
    },
    pageChange(val) {
      this.page = val;
      this.getList();
    },
    getList() {
      this.queryList({
        pageNum: this.page,
        pageSize: this.size
      }).then(res => {
        if (res.code == 0) {
          this.baseList = res.result.list;
          this.total = res.result.recordCount;
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>