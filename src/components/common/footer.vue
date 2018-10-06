<template>
  <section class="footer">
    <div class="mid-box">
      <img src="../../assets/images/logo.png">
      <p>
        飞屋度假 Copyright © 2017-2018  All Rights Reserved 北京愿景明德管理咨询有限公司<br>
        <a href="http://chinavisionary.com">chinavisionary.com</a>
        京ICP备18027601号-1
      </p>
    </div>
  </section>
</template>
<script>
export default {
}
</script>
<style lang="scss">
  .footer {
    width: 100%;
    height: 90px;
    background: #000000;
    z-index: 99;

    .mid-box {
      width: 1160px;
      margin: auto;
      overflow: hidden;

      img {
        float: left;
        height: 70px;
        margin: 10px 15px 0 0;
      }

      p {
        float: left;
        font-size: 12px;
        color: #ffffff;
        line-height: 24px;
        margin-top: 21px;

        a {
          color: #ffffff;
        }
      }
    }

    .logo-box {
      float: left;
      width: 80px;
      height: 50px;
      margin: 20px 0 0 0;

      img {
        height: 50px;
      }
    }
  }
</style>
