/**
 * 课程列表模块
 * Author:Wilbert
 *   Date:2017/8/23
 */
define(["jquery", "text!tpls/courseList.html", "common/api", "template", "course/time","course/baseInfo","course/image"],
    /**
     *
     * @param $
     * @param courseListTpl 课程列表模板
     * @param api
     * @param template arttemplate模板引擎
     * @param courseTime 课时列表模块
     * @returns {Function}
     */
    function ($, courseListTpl, api, template, courseTime,courseBaseInfo,courseImage) {


        return function () {
            //通过ajax获取数据
            api.get("course", {}, function (res) {
                var courseList = template.render(courseListTpl, res);

                var $courseList = $(courseList);

                //课时
                $courseList.on("click", ".btn-time", function () {
                    var cs_id = $(this).parent().attr("cs_id");

                    courseTime(cs_id);
                }).on("click",".btn-baseinfo",function(){
                    //课程基本信息
                    var cs_id = $(this).parent().attr("cs_id");

                    courseBaseInfo(cs_id);
                }).on("click","a",function(){
                    //点击了课程图片
                    var cs_id=$(this).attr("cs_id");
                    
                    courseImage(cs_id);

                })

                $(".panel-content .panel-body").html($courseList);


            })


        }
    })