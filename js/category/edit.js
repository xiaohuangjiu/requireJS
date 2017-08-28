/**
 * 编辑分类
 * Author:Wilbert
 *   Date:2017/8/23
 */
define(["jquery", "text!tpls/categoryEdit.html", "common/api", "template"],
    /**
     *
     * @param $ jquery模块
     * @param categoryEditTpl 编辑分类模态框模板
     * @param api api模块：处理所有的ajax请求
     * @param template arttemplate模板引擎
     * @returns {Function}
     */
    function ($, categoryEditTpl, api, template) {


        /**
         * @param id 该分类的id
         * @param callback：表示刷新分类列表
         */
        return function (id,callback) {
            //为什么要有嵌套ajax请求？因为2个数据要编译到同一个模板中
            api.get("category/top", {}, function (res) {

                api.get("category/edit", {cg_id: id}, function (resEdit) {
                    //把resEdit中的result属性存储到res对象中
                    res.obj = resEdit.result;

                    //resEdit包含了分类的原有信息


                    //预置顶级分类的数据
                    res.result.unshift({cg_id: 0, cg_name: "顶级分类"});

                    //编译模板，获取到真实内容
                    var categoryEdit = template.render(categoryEditTpl, res);

                    //删除旧的模态框
                    $("#modalEditCategory").remove();

                    //把真实内容放到页面中，并且弹出模态框
                    var $categoryEdit=$(categoryEdit)
                        .on("submit", "form", function () {
                            //通过ajax请求获取表单数据，把数据提交到服务器中
                            var formData=$(this).serialize();

                            api.post("category/modify",formData,function(res){

                                //隐藏模态框
                                $categoryEdit.modal("hide");
                                //刷新分类列表-->模拟点击课程分类按钮
                                callback();

                            })

                            return false;
                        })
                        .appendTo("body")
                        .modal();
                })


            })


        }
    })