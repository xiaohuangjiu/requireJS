/**
 * 课程图片模块
 * Author:Wilbert
 *   Date:2017/8/25
 */
define(["jquery","text!tpls/courseImage.html","common/api","template","upload"],function($,courseImageTpl,api,template){

    return function(cs_id){
        api.get("course/picture",{cs_id:cs_id},function(res){
            //获取到数据，把数据编译到模板中

            var courseImage=template.render(courseImageTpl,res.result);

            var $courseImage=$(courseImage);

            $(".panel-content .panel-body").html($courseImage);

            //希望在图片上传完毕之后，跳转到课程列表？

            //放到页面中之后才能渲染上传组件
            $("#fileImage").uploadify({
                auto:true,//选择文件之后是否自动上传        true自动上传

                fileObjName:"cs_cover_original", //：等同于file标签的name值

                fileTypeExts:"*.jpg; *.png; *.gif",

                formData:{
                    cs_id:cs_id
                },       //用于表单提交的额外数据

                itemTemplate:"<span></span>",     //上传模板

                buttonText:"选择图片",

                //height        : 198,
                //文件地址：/表示网站根目录
                swf           : '/assets/uploadify/uploadify.swf',//swf文件的地址
                uploader      : '/api/uploader/cover',//服务器中处理上传请求的地址
                //width         : 195,


                //文件上传完毕之后执行
                /**
                 *
                 * @param file 上传成功的文件信息
                 * @param data
                 * @param response 接口的返回值
                 */
                onUploadSuccess : function(file, data, response) {
                    console.log(file);
                    console.log(data);
                    console.log(response);

                    $(".left .list-group .course-manager").trigger("click");
                }


            })
        })


    }
})