/**
 * 添加课程模块
 * Author:Wilbert
 *   Date:2017/8/23
 */
define(["jquery","text!tpls/courseAdd.html","common/api","course/list"],function($,courseAddTpl,api,courseList){

    return function(){


        //弹出模态框？
        var $courseAdd=$(courseAddTpl).on("submit","form",function(e){
            //阻止事件的默认行为：阻止页面跳转-->把同步的表单变成异步的表单
            e.preventDefault();


            //获取页面数据
            var formData=$(this).serialize();
            api.post("course/create",formData,function(){

                //隐藏模态框
                $courseAdd.modal("hide");
                //刷新课程列表
                courseList();
            })



        }).appendTo("body").modal();
    }
})