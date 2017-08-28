/**
 * 添加课时
 * Author:Wilbert
 *   Date:2017/8/24
 */
define(["jquery","text!tpls/courseTimeAdd.html","common/api"],function($,courseTimeAddTpl,api){

    /**
     * @param id 课程id  需要把它作为表单数据提交，
     *  (繁琐)第一种方式：id编译到模板中：arttemplate，把它放到模板的隐藏域中
     *  (取巧)第二种方式：给formData补充这个参数
     */
    return function(id,callback){
        //弹出模态框
        var $courseTimeAdd=$(courseTimeAddTpl).on("submit","form",function(e){
            //阻止默认行为：阻止跳转-->把同步变成异步
            e.preventDefault();
            //通过ajax请求把数据提交到服务器中
            var formData=$(this).serialize();   //每一个表单元素都应该具有name属性

            formData+="&ct_cs_id="+id;

            api.post("course/chapter/add",formData,function(res){
                //隐藏模态框
                $courseTimeAdd.modal("hide");
                //刷新课时列表页面
                callback();
            })


        }).appendTo("body").modal();
    }
})