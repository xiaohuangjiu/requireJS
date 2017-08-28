/**
 * 课时信息页面
 * Author:Wilbert
 *   Date:2017/8/24
 */
define(["jquery","common/api","text!tpls/courseTimeList.html","template","course/addTime","course/editTime"],function($,api,courseTimeListTpl,template,courseAddTime,courseEditTime){


    return function f(id){
        //获取课程对应的课时信息
        api.get("course/lesson",{cs_id:id},function(res){
            //把数据渲染到页面中

            var courseTimeList=template.render(courseTimeListTpl,res);//courseTimeList作为课时信息页面的容器

            //把页面容器转换为jquery对象-->为了更好的实现事件绑定
            var $courseTimeList=$(courseTimeList);

            $courseTimeList.on("click",".btn-add",function(){
                //点击了添加课时按钮
                var id=$(this).parent().attr("cs_id");//21行的变量id和9行变量id是同一个值

                courseAddTime(id,function(){

                    //刷新课时列表页面
                    f(id);
                });
            }).on("click",".btn-edit",function(){
                //点击了编辑课时按钮

                //获取课时id
                var ct_id=$(this).parent().attr("ct_id");
                //调用编辑课时模块
                courseEditTime(ct_id,function(){

                    //需要一个课程id，来刷新课时列表页面
                    f(id);
                });
            })

            $(".panel-content .panel-body").html($courseTimeList);

        })


    }
})