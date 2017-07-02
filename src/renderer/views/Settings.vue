<template>
    <div :style="contentWarpHeight">
        <Row>
            <Col :style="contentWarpHeight" :span="4" style="border-right: 1px solid #e3e8ee;">
            <div class="menus">
                <router-link tag="div" class="menu" :to="{name: 'baseSettings'}">
                    系统设置
                </router-link>
                <router-link tag="div" class="menu" :to="{name: 'templateSettings'}">
                    模版设置
                </router-link>
                <router-link tag="div" class="menu" :to="{name: 'logsSettings'}">
                    日志管理
                </router-link>
            </div>
            </Col>
            <Col :span="20" style="padding: 0 0 0 10px">
                <router-view></router-view>
            </Col>
        </Row>
    </div>
</template>
<style lang="less" scoped>
    .menus {
        .menu {
            padding: 10px 0;
            cursor: pointer;
            &.router-link-active {
                color: blue;
            }
        }
    }
</style>
<script type="text/ecmascript-6">
</script>
