<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 过滤列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

  <el-table
    :data="data"
    style="width: 100%"
    :default-sort = "{prop: 'timestamp', order: 'descending'}"

    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item v-if="props.row.request" label="RESQUEST: ">
            <span>{{ props.row.request }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.response" label="RESPONSE: ">
            <span>{{ props.row.response }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.session" label="SESSION: ">
            <span>{{ props.row.session }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.sensorid" label="SENSORID: ">
            <span>{{ props.row.sensorid }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.timestamp" label="TIMESTAMP: ">
            <span>{{ props.row.timestamp }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.src_ip" label="SOURCE_IP: ">
            <span>{{ props.row.src_ip }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.src_port" label="SOURCE_PORT: ">
            <span>{{ props.row.src_port }}</span>
          </el-form-item>
          <el-form-item v-if="props.row.protocol" label="PROTOCOL: ">
            <span>{{ props.row.protocol }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="攻击时间"
      prop="timestamp"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="攻击来源"
      prop="src_ip"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="来源端口"
      prop="src_port"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="攻击类型"
      prop="protocol"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="探针节点"
      prop="sensorid"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="蜜罐应答"
      prop="response"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="目标端口"
      prop="dst_port"
      sortable
      >
    </el-table-column>

  </el-table>

            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalData">
                </el-pagination>
            </div>
        </div>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: '/log/list/',
                purl: '/log/list?type=1',
                tableData: [],
                totalData: 0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
            this.getTotal();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.timestamp.indexOf(this.select_cate) > -1 &&
                            (d.src_ip.indexOf(this.select_word) > -1 ||
                                d.src_port.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = process.env.API_HOST+'/log/list/';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page,
                    white: 1
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            getTotal() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = process.env.API_HOST+'/log/list?type=1';
                    this.$axios.get(this.url)
                    .then((res) => {
                        // console.log(res.data);
                        this.totalData = res.data;
                    })
                }else{
                    this.$axios.get(this.purl)
                    .then((res) => {
                        // console.log(res.data);
                        this.totalData = res.data;
                    })
                }
            
            },

            search() {
                this.is_search = true;
            },
            // formatter(row, column) {
            //     return row.local_time;
            // },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
