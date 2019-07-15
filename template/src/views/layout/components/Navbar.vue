<template>
    <div class="navbar">
        <div class="brand lg" v-if="isOpen">
            <img src="@/assets/images/header/police.png">
            <div>
                <div>图像综合应用</div>
                <div>管理平台</div>
            </div>
        </div>
        <div class="brand mini" v-if="!isOpen">
            <img src="@/assets/images/header/police.png">
        </div>
        <headerMenu></headerMenu>
        <el-tooltip content="换肤" effect="dark" placement="bottom">
            <theme-picker class="right-menu-item hover-effect" ref="ThemePicker"/>
        </el-tooltip>
        <div class="avatar-container" trigger="click">
            <div class="userInfo">
                <i class="iconfont icon-fullscreen"></i>
                <i class="iconfont icon-qiehuan"></i>
                <i class="iconfont icon-folder"></i>
                <i class="iconfont icon-bell"></i>
                <el-popover
                    placement="top"
                    width="250"
                    trigger="click"
                    popper-class="configPopover"
                    v-model="visible2">
                    <div class="popTitle">\{{name}}</div>
                    <div class="popTitle">\{{roles[0].name}}</div>
                    <div class="el-collapse-item__header">
                        <span>修改密码</span>
                        <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
                    </div>
                    <div class="el-collapse-item__header">
                        <span>登出</span>
                        <i class="el-collapse-item__arrow el-icon-arrow-right"></i>
                    </div>
                    <i class="iconfont icon-wo-copy" slot="reference"></i>
                </el-popover>
            </div>
            <!-- <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>
                        Home
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">LogOut</span>
                </el-dropdown-item>
            </el-dropdown-menu> -->
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import ThemePicker from "@/components/ThemePicker";
    import headerMenu from "./headerMenu.vue";
    export default {
        data() {
            return {
                isOpen: true,
                visible2:false,
                theme: ""
            };
        },
        mounted(){
            if(this.skin!==''){
                this.$refs.ThemePicker.theme =this.skin
            }
        },
        components: {
            ThemePicker,
            headerMenu
        },
        computed: {
            ...mapGetters(["sidebar", "name", "roles", "avatar",'skin'])
        },
        methods: {
            toSeePopover(){
                this.visible2 = true;
            },
            logout() {
                this.$store.dispatch("LogOut").then(() => {
                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                });
            }
        }
    };
</script>

<style scoped>
    .configPopover .popTitle{
        margin:6px 0!important;
        font-size:15px;
        font-weight: bolder;
    }
    /* .popoverButton{
        display:flex;
        justify-content: center;
        align-items: center;
    } */
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 70px;
        border-radius: 0px !important;
        background-color: #376bf0;
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1111;
        .brand {
            display: flex;
            height: 70px;
            line-height: 25px;
            justify-content: left;
            align-items: center;
            float: left;
            font-size: 16px;
            color: #fff;
            text-align: center;
            transition: width 0.3s;
            img {
                margin: 0 22px 0 8px;
            }
        }
        .lg {
            width: 250px;
        }
        .mini {
            width: 68px;
        }
        .avatar-container {
            height: 70px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 10px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                line-height: initial;
                margin-right: 10px;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
            }
            .userInfo{
                color:#fff;
                i{
                    font-size: 24px!important;
                }
            }
            .name {
                color: #fff;
                font-size: 0.5em;
            }
            .logOutButton {
                padding: 5px;
                font-size: 0.5em;
            }
        }
    }
</style>

