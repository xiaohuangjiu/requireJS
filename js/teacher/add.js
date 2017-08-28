/**
 * 添加讲师
 * Author:Wilbert
 *   Date:2017/8/19
 */
define(["jquery", "text!tpls/teacherAdd.html", "datetime", "datetimeLang"], function ($, teacherAddTpl) {

    return function () {
        //删除之前的模态框
        $("#modalAddTeacher").remove();
        //加载一个新的模态框
        var $teahcerAddTpl = $(teacherAddTpl)
            .on("submit", "form", function () {
            //this-->form标签

            //1、获取表单数据
            var formData = $(this).serialize();
            //alert(formData);
            //2、通过ajax把数据提交到服务器中
            $.ajax({
                url: "/api/teacher/add",
                type: "post",
                data: formData,
                success: function (res) {
                    //if(res.code!=200) return console.log(res.msg);

                    if (res.code != 200) throw new Error(res.msg);

                    //隐藏模态框
                    $teahcerAddTpl.modal("hide");

                    $(".left .list-group .teacher-manager").trigger("click");//触发讲师管理菜单的click事件

                }
            })

            return false;//把同步的表单变成异步的表单
        })
            .appendTo("body")
            .modal();


        //在模态框已经加载到页面中之后再去渲染日期控件
        $teahcerAddTpl.find(".date-join").datetimepicker({
            format: 'yyyy-mm-dd',
            language: "zh-CN",
            weekStart: "1",       //从周几开始
            autoclose: true,        //选定一个日期之后就自动隐藏日期控件
            minView: "month", //如果是月，最小能够精确到哪一天，如果是天，最小能够精确到哪一个小时
            todayBtn: true,
            todayHighlight: true
        });
    }
})