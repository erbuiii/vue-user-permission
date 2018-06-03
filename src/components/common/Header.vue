<template>
    <el-menu class="header" :style="{ 'background-color': primaryColor}">
        <div class="logo">{{$t('navbar.title')}}</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand"> 
                <span class="el-dropdown-link">
                    <img src="../../../static/img/img.jpg" alt="avatar" class="user-logo"> {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            name: 'erbuiii'
        }
    },
    computed: {
        username() {
            const username = localStorage.getItem('ms_username')
            return username || this.name
        }
    },
    methods: {
        handleCommand(command) {
            if (command === 'loginout') {
                localStorage.removeItem('ms_username')
                this.$store.dispatch('LogOut').then(() => {
                    //重新实例化vue-router对象
                    location.reload()
                })
            }
        }
    }
}
</script>

<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo {
        float: left;
        width: 250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item {
        text-align: center;
    }
    .right-menu-item {
        display: inline-block;
        margin: 0 8px;
    }
</style>