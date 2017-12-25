<!-- 登录页 -->
<template>
  <div class="login">
    <!--粒子效果容器start-->
    <div id="particles-js"></div>
    <!--粒子效果容器end-->
    <div class="login-panel input-shine">
      <div class="login-panel-inner">
        <!-- 头像start -->
        <div class="avatar"></div>
        <!-- 头像end -->
        <div class="f-mt10 f-mb10 f-fs16 f-tac">GMES-CLIENT</div>
        <form action="" id="loginInfo">
          <el-form>
            <el-form-item :rules=rule.nameRule>
              <el-input v-model="userCode" :autofocus=true ref="form.username" placeholder="用户名" icon="pad-user"
                        @keyup.enter.native="onSubmit('form')"></el-input>
            </el-form-item>
            <el-form-item :rules=rule.passwordRule>
              <el-input v-model="password" placeholder="密码" icon="pad-password"
                        @keyup.enter.native="onSubmit('form')"></el-input>
            </el-form-item>
            <!--<el-form-item  :rules=rule.passwordRule>-->
            <!--<el-input v-model="siteCode" placeholder="工厂编码" icon="pad-password" @keyup.enter.native="onSubmit('form')"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button type="primary" class="submitBtn f-trans10 f-h45" @click="onSubmit('form')"
                         :loading=loadingFlag>登录
              </el-button>
            </el-form-item>
          </el-form>
        </form>

      </div>
    </div>
    <div class="login-copyright">©2017 杭州吉利易云科技有限公司 版权所有</div>
  </div>
</template>
<script>
//  import {http} from '@/js/http'
import particles from "@/js/vendors/particles/particles"
  export default {
    data() {
      return {
        language: '中文',
        userCode: 'admin',
        password: 'a1234567',
        siteCode: siteCode,
//				form: {
//					username: 'sunya',
//					password: 'a1234567',
//					grant_type: "password"
//				},
        rule: {
          nameRule: [
            {required: true, message: '账号不能为空'},
          ],
          passwordRule: [
            {required: true, message: '密码不能为空'},
          ]
        },
        loadingFlag: false,
      }
    },
    methods: {
      onSubmit() {
        console.log(this.userCode)
        this.$httpUtil.post('restful/doLogin',
          {
            data: 'userCode=' + this.userCode + '&password=' + this.password + '&siteCode=' + this.siteCode
          }
        ).then((response) => {
          console.log(response)
          if (response.status == 200) {
            this.$router.push('/initialize');
          }

        }).catch(error => {
        });
      },
//			onSubmit(formName) {
//				this.$refs[formName].validate(async (valid) => {
//					if (valid) {
//						this.loadingFlag = true;
//						const data = { ...this.form };// 不复制原型属性
//						data.username += `_${config.apiBaseUrl.siteCode}_zh`;
//						// let loadingInstance = Loading.service({ text: '拼命登录中...' });
//						const res = await http.post('oauth/token', { body: data }, true)
//						if (res.status || typeof res != 'object') {
//							this.$message('用户名和密码有误');
//							this.loadingFlag = false;
//							return false;
//						}
//						for (var name in res) {
//							localStorage.setItem(name, res[name]);
//						}
//						userinfo.loginUserDataInit().then((data) => {
//							router.push('home');
//							this.loadingFlag = false;
//						}).catch((data = '登录失败') => {
//							this.loadingFlag = false;
//							this.$message(data)
//						});
//					}
//				});
//			},
//      changeLang(lang) {
//        localStorage.lang = lang === '中文' ? 'zh-cn' : 'en';
//        Vue.config.lang = localStorage.lang;
//      }
    },
    mounted() {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });
    },
  }

</script>

<style lang="less" scoped>
  .login {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: url('../../assets/login_bg.jpg') center;
    background-size: cover;
    text-align: center;
  }

  .login .block {
    color: #ff5000;
  }

  .login .submitBtn {
    width: 100%;
  }

  .login input {
    border-radius: 0px;
    height: 200px;
  }

  .login button {
    background: #0e69b0;
  }

  .login button:hover {
    background: #075694;
  }

  .avatar {
    border-radius: 50%;
    background-color: white;
    background-image: url('../../assets/avatar.png');
    background-repeat: no-repeat;
    background-size: 40px 40px;
    border: #6a7897 solid 3px;
    width: 40px;
    height: 40px;
    position: relative;
    margin: 0 auto;
  }

  .login-panel {
    background: #fff;
    width: 370px;
    height: 360px;
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    border: #1a406e solid 4px;
    border-radius: 2px;
    background: #fafafa;
  }

  .login-panel:after {
    display: block;
    content: '';
    background: url('../../assets/login_form_top.png') no-repeat;
    background-size: 100%;
    height: 16px;
    position: absolute;
    top: -14px;
    left: 0;
    width: 100%;
  }

  .login-panel-inner {
    box-sizing: border-box;
    margin: 0 auto;
    height: 100%;
    width: 280px;
    padding: 20px;
    min-width: 310px;
    min-height: 310px;
  }

  .login-input {
    border: rgb(215, 215, 215) solid 1px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.75);
    margin-bottom: 10px;
  }

  .login-input input {
    border: none;
    padding: 0 10px;
    font-size: 14px;
    height: 42px;
    width: 100%;
  }

  .login-copyright {
    color: #fff;
    opacity: 0.5;
    font-size: 12px;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 80px;
  }

  #loginButton {
    transition: all 1s;
    text-shadow: 0px 0px 19px white;
  }

  #loginButton:hover {
    box-shadow: 1px 1px 4px 2px #9f9e9e;
    background-color: #075694;
    color: #e0e6eb;
  }

  #particles-js {
    width: 100%;
    height: 98%;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    z-index: 0;
    opacity: 0.5;
  }

  .input-shine {
    animation-name: inputShine;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transition: all 1s;
  }

  @keyframes inputShine {
    0% {
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
    }
    50% {
      box-shadow: 0 0 20px 4px rgba(255, 255, 255, 0.3);
    }
    100% {
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
    }
  }
</style>
