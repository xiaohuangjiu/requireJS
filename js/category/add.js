/**
 * 添加分类
 * Author:Wilbert
 *   Date:2017/8/22
 */
define(["jquery","text!tpls/categoryAdd.html","common/api","template"],function($,categoryAddTpl,api,template){


    return function(){
        // //单元测试：
        // alert("加载了添加分类的模板");

        //ajax请求获取一级分类数据
        api.get("category/top",{},function(res){

            //把顶级分类的数据预加载到result数组中-->模板中遍历的时候就可以遍历出这个顶级分类的数据了
            res.result.unshift({cg_id:0,cg_name:"顶级分类"});

            //编译模板
            var categoryAdd=template.render(categoryAddTpl,res);

            //把真实内容放到页面中，并且以模态框的形式呈现出来
            var $categoryAdd=$(categoryAdd);

            $("#modalAddCategory").remove();//删除之前的模态框

            //把同步的表单变成异步的表单-->ajax请求
            //a、给表单绑定submit事件
            //b、在submit事件最后一行通过return false;
            $categoryAdd.on("submit","form",function(){
                var formData=$(this).serialize();//前提：每一个表单元素都应该具有name属性

                api.post("category/add",formData,function(res){

                    //a、隐藏模态框：先找到模态框的容器
                    $categoryAdd.modal('hide');
                    //b、刷新分类列表：模拟点击课程分类按钮
                    $(".left .list-group .course-category").trigger("click");


                })

                return false;
            })

            $categoryAdd.appendTo("body").modal();

        })



    }
})