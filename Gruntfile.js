/*
 * grunt-cli
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    //引入grunt 依赖包
    pkg: grunt.file.readJSON('package.json'),

    //less 配置
    less: {
        compile: {
            files: { //生成文件 :  源文件
                'css/style.css': 'css/less/style.less'
            }
        },
        /*yuicompress: {
            files: {
                'css/style.min.css': 'css/style.css'
            },
            options: {
                yuicompress: true
            }
        }*/
    },

    //CSS 压缩
    cssmin: {
          build: {
              expand: true,
            cwd: 'css/', //源文件路径
            src: ['*.css', '!*.min.css'], //文件后缀
            dest: 'css/', //生成 路径
            ext: '.min.css' //生成文件名后缀
          }
    },

    //JS 压缩
    jshint: {
      options: {
          //大括号包裹
          curly: true,
          //对于简单类型，使用===和!==，而不是==和!=
          eqeqeq: true,
          //对于首字母大写的函数（声明的类），强制使用new
          newcap: true,
          //禁用arguments.caller和arguments.callee
          noarg: true,
          //对于属性使用aaa.bbb而不是aaa['bbb']
          sub: true,
          //查找所有未定义变量
          undef: true,
          //查找类似与if(a = 0)这样的代码
          boss: true,
          //指定运行环境为node.js
          node: true
      },
      //具体任务配置
      files: {
          src: ['js/*.js']
      }
    },

    uglify: {
        options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
        },
        
        //builda: {//任务一：压缩a.js，不混淆变量名，保留注释，添加banner和footer
        //    options: {
        //        mangle: false, //不混淆变量名
        //        preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                //添加footer
        //        footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'
        //    },
        //    files: {
        //       'output/js/a.min.js': ['js/a.js']
        //    }
        //},

        // buildb:{//任务二：压缩b.js，输出压缩信息
        //     options: {
        //         report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
        //     },
        //     files: {
        //         'output/js/b.min.js': ['js/main/b.js']
        //     }
        // },
        // buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
        //     files: [{
        //         expand:true,
        //         cwd:'js',//js目录下
        //         src:'**/*.js',//所有js文件
        //         dest: 'output/js'//输出到此目录下
        //     }]
        // },
        release: {//任务四：合并压缩a.js和b.js
            files: {
                'js/common.min.js': ['js/common.js', 'js/module/*.js']
            }
        }
    },

    //事件 监听
    watch: {
      //监听 less 文件 改变 以执行 less  编译
        less: {
            files: ['css/less/style.less'],
            tasks: ['less']
        },
        //监听 css 文件改变 已执行 CSS 压缩
        cssmin: {
            files: ['css/style.css'],
            tasks: ['cssmin']
        },
        uglify : {
           files: ['js/common.js'],
           tasks: ['uglify']
        }

        //监听 JS 语法检查
        /*jshint: {
            files: ['js/*.js'],
            tasks: ['jshint']
        }*/
    }
  });

  //less 打包
  grunt.loadNpmTasks('grunt-contrib-less');

  //代码压缩
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //浏览器前缀补全
  grunt.loadNpmTasks('grunt-autoprefixer');

  //监听事件
  grunt.loadNpmTasks('grunt-contrib-watch');

   //JS 语法检测
  grunt.loadNpmTasks('grunt-contrib-jshint');

   //JS 压缩
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // "npm test" runs these tasks
  grunt.registerTask('test', ['less']);

  grunt.registerTask('css', ['cssmin']);

  //语法检查
  grunt.registerTask('jsHint', ['jshint']);
  //JS 压缩
  grunt.registerTask('js', ['uglify']);

  // Default task.
  grunt.registerTask('default', ['watch']);

};
