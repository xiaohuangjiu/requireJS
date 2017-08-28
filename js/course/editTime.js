/**
 * 编辑课时
 * Author:Wilbert
 *   Date:2017/8/24
 */
define(["jquery", "text!tpls/courseTimeEdit.html", "common/api", "template"], function ($, courseTimeEditTpl, api, template) {

    //jquery插件
    $.fn.myModal = function (id) {
        //this：jquery对象本身

        id && $(id).remove();
        this.appendTo("body").modal();

        return this;//实现链式编程

    };//$("body").myModal()     $(document.body).myModal();

    return function (id,callback) {
        //获取课时原来的信息
        api.get("course/chapter/edit", {ct_id: id}, function (res) {
            //将课时原来的信息渲染到模态框模板中
            var courseTimeEdit = template.render(courseTimeEditTpl, res.result);

            //1、弹出模态框，模态框中加载出该课时原来的信息

            var $courseTimeEdit=$(courseTimeEdit)
                //2、用户修改数据，把数据提交到服务器中
                .on("submit", "form", function (e) {
                    e.preventDefault();

                    var formData=$(this).serialize();
                    //把数据提交到服务器中
                    api.post("course/chapter/modify",formData,function(){
                        //隐藏模态框
                        $courseTimeEdit.modal("hide");

                        //刷新课时列表页
                        callback();
                    })

                })
                .myModal("#modalEditCourseTime");

            // $("#modalEditCourseTime").remove();
            // $(courseTimeEditTpl).appendTo("body").modal();



        })


    }
})