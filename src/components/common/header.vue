<template>
  <section>
    <section class="header-web">
      <a class="logo-box">
        <img src="../../assets/images/logo.png">
      </a>

      <div class="nav-box">
        <router-link :to="{ name: 'article'}">
          推广文章
        </router-link>

      </div>
      <div class="member-box" v-if="userInfo.userInfo">

        <div class="mess-box">
          <span>{{userInfo.userInfo.userName}}</span>
        </div>

        <div class="line-col">|</div>

        <div class="mess-box" @click="logout">
          <el-tooltip class="my-btn item"
                      effect="dark"
                      content="退出登录"
                      placement="bottom">
            <i class="yj-icon-tuichu"></i>
          </el-tooltip>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import $ from 'Jquery'
import util from '../../assets/common/util'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      roleCodes: [],
      isAddCity:false,
      cityData: [],
      citys: [],
      cityBase: {
          cityCname:'',
          provinceName:'',
          cityEname:''
      },
      pageNumber: 1,
      pageSize: 20,
      total: 0,
      exchangeList: [],
      pageENumber: 1,
      pageESize: 20,
      totalE: 0,
      mailUrl: ''
    }
  },
  mounted () {
    console.log(this.userInfo, 'userInfo111')
  },
  computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    logout () {
      util.request({
        method: 'post',
        interface: 'logout',
        data: {}
      }).then(res => {
        if (res.result.success == '1') {
          window.location.href = '/login'
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .el-dropdown-menu__item {
    font-size: 14px;

    img {
      float: left;
      width: 16px;
      height: 16px;
      margin: 10px 10px 0 2px;
    }

    div {
      line-height: 36px;
      overflow: hidden;
    }
  }

  .el-dropdown-menu {
    min-width: 120px;
  }

  .el-dropdown-link {
    color: #ffffff;
    cursor: pointer;
  }

  .header-web {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #000000;
    color: #fff;
    padding: 0 20px;
    z-index: 2000;
    box-sizing: border-box;

    .logo-box {
      float: left;
      margin-top: 10px;
      margin-right: 26px;

      img {
        height: 30px;
      }
    }

    .nav-box {
      float: left;

      a {
        display: inline-block;
        font-size: 13px;
        color: #A4A4A4;
        line-height: 50px;
        margin-right: 30px;

        &:hover {
          color: #ffffff;
        }
      }

      .router-link-active {
        color: #ffffff;
      }
    }

    .select-city-box {
      float: right;
      margin-left: 20px;
      font-size: 14px;
      color: #4db3ff;
      cursor: pointer;

      .city-drop-box {
        display: none;
        max-width: 600px;
        min-width: 300px;
        position: fixed;
        top: 50px;
        right: 0;
        background: #ffffff;
        padding: 15px 15px 0;
        box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.12);

        span {
          float: left;
          cursor: pointer;
          color: #000000;
          line-height: 30px;
          margin-right: 10px;

          &:hover {
            color: #4db3ff;
          }
        }

        .nowColor {
          color: #4db3ff;
        }
      }

      &:hover {
        .city-drop-box {
          display: block;
        }
      }
    }

    .member-box {
      float: right;
      margin-left: 20px;

      .mess-box {
        float: left;
        font-size: 14px;
        line-height: 50px;
        color: #ffffff;
        cursor: pointer;

        .my-btn {
          font-size: 16px;
          line-height: 50px;
          font-weight: 300;
        }
      }

      .line-col {
        float: left;
        margin: -1px 5px 0;
        font-size: 12px;
        line-height: 50px;
        color: #ffffff;
      }

      .img-box {
        float: left;
        width: 24px;
        height: 24px;
        margin: 13px 20px 0 0;
        border-radius: 50%;
        overflow: hidden;
        line-height: 0;
        background: url(../../assets/images/head-icon.png) left top no-repeat;
        background-size: 100% auto;
        cursor: pointer;

        img {
          width: 24px;
          height: 24px;
        }
      }
    }


    .line-box {
      float: right;
      width: 1px;
      height: 20px;
      margin: 15px 0;
      background: #555555;
    }
  }
</style>

