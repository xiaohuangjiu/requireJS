/**
 * 入口文件
 * Author:Wilbert
 *   Date:2017/8/17
 */
require.config({
    baseUrl:"js",
    paths:{
        jquery:"lib/jquery-2.1.4",       //不能添加.js后缀
        bootstrap:"../assets/bootstrap/js/bootstrap",
        //读取html文件的
        text:"lib/text",
        //配置模板文件夹路径-->以后要访问tpls下面的teacherList.html："tpls/teacherList.html"
        tpls:"../tpls",
        //配置了arttemplate模板引擎的路径
        template:"lib/template-web",
        cookie:"lib/jquery.cookie",
        //bootstrap日期控件
        datetime:"../assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker",
        datetimeLang:"../assets/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN",
        upload:"../assets/uploadify/jquery.uploadify",

        //ueditor配置文件
        ueConf:"../assets/ueditor/ueditor.config",
        //ueditor主文件
        ueAll:"../assets/ueditor/ueditor.all",
        ZeroClipboard:"../assets/ueditor/third-party/zeroclipboard/ZeroClipboard",

        //echarts文件路径
        echarts:"lib/echarts.min"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        datetimeLang:{
            deps:["datetime"]
        },
        upload:{
            deps:["jquery"]
        },
        ueAll:{
            deps:["ueConf"]
        }
    }

})


require(["jquery","teacher/list","category/list","course/list","course/add","common/personal","chart/index","bootstrap","cookie"],function($,teacherList,categoryList,courseList,courseAdd,commonPersonal,chartIndex){
    //验证用户有没有登录过?
    //var userInfoStr=sessionStorage.getItem("userInfo");
    var userInfoStr=$.cookie("userInfo");

    //alert(userInfoStr);

    if(!userInfoStr){
        location.href="login.html";
        return;
    }

    var userInfo=JSON.parse(userInfoStr);//将JSON字符串转换为json对象(对象字面量)



    //设置用户名和头像
    var tc_name=userInfo.tc_name;
    var tc_avatar=userInfo.tc_avatar;

    $(".profile img").attr("src",tc_avatar);
    $(".profile h4").text(tc_name);         //$(".profile h4").html(tc_name);


    $(".left .list-group").on("click",".list-group-item",function(){
        //已经实现点击不同菜单都会触发该回调函数
        //-->需求：判断到底是什么样的菜单?-->通过判断菜单的类名
        if($(this).hasClass("teacher-manager")){
            // alert("讲师管理")

            teacherList();

        }else if($(this).hasClass("course-manager")){
            // alert("课程管理")

            courseList();

        }else if($(this).hasClass("course-category")){
            
            //加载课程分类模块
            categoryList();

        }else if($(this).hasClass("chart")){
            // alert("图表统计");
            chartIndex();
            

        }else if($(this).hasClass("add-course")){

            //实现添加课程功能？
            courseAdd();
        }

        $(this).addClass("active").siblings().removeClass("active");



    });


    //希望页面一刷新的时候，就加载出讲师列表？
    //      -->发现当用户点击了讲师管理菜单才会加载出讲师列表
    //          -->解决方案：模拟用户点击讲师管理菜单
    $(".left .list-group .teacher-manager").trigger("click");//触发讲师管理菜单的click事件


    //个人中心功能
    $("#linkPersonalCenter").on("click",function(){
        //调用个人中心模块
        commonPersonal();

    })

})