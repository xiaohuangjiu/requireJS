/**
 * 课程基本信息
 * Author:Wilbert
 *   Date:2017/8/24
 */
define(["jquery","text!tpls/courseBaseInfo.html","common/api","template"],function($,courseBaseInfoTpl,api,template){


    return function(id){
        api.get("course/basic",{cs_id:id},function(res){

            var courseBaseInfo=template.render(courseBaseInfoTpl,res.result);

            var $courseBaseInfo=$(courseBaseInfo);
            //实现表单数据提交
            $courseBaseInfo.on("submit","form",function(e){
                e.preventDefault();

                //通过ajax获取表单数据
                var formData=$(this).serialize();//表单都应该有name属性

                api.post("course/update/basic",formData,function(){

                    //刷新课程列表-->模拟点击课程管理按钮
                    $(".left .list-group .course-manager").trigger("click");//触发讲师管理菜单的click事件
                })

            }).on("change",".category-top",function(){
                //获取下拉框的值？
                var val=$(this).val();
                //根据val的值，获取第二个下拉框中的值
                api.get("category/child",{cg_id:val},function(res){
                    //根据父分类的id，获取对应的下面的各分类数据
                    //将数据添加到下拉框中？-->动态拼接DOM
                    var str="";

                    res.result.forEach(function(v,i){
                        //v：元素的值   v={"cg_id": 5, "cg_name": "HTML/CSS"}
                        //i：元素的索引
                        str+="<option value='"+v.cg_id+"'>"+v.cg_name+"</option>";
                    });
                    //将str中的数据放到第二个下拉框中
                    $courseBaseInfo.find(".category-child").html(str);
                })
            })


            $(".panel-content .panel-body").html($courseBaseInfo);
        })


    }
})