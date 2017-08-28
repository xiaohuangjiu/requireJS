/**
 * 加载课程分类列表模块
 * Author:Wilbert
 *   Date:2017/8/20
 */
define(["jquery","text!tpls/categoryList.html","template","common/api","category/add","category/edit"],
    /**
     * 
     * @param $ 
     * @param categoryListTpl
     * @param template
     * @param api
     * @param categoryAdd
     * @param categoryEdit
     * @returns {Function}
     */
    function($,categoryListTpl,template,api,categoryAdd,categoryEdit){

    //需求：加载出一个分类列表？
    //a、表格的布局
    //      1、新建一个分类列表模板
    //      2、通过text插件获取模板内容
    //      3、把模板内容放到页面中的指定位置？


    //b、表格中数据的加载
    //      1、数据从哪里来？ajax请求调用接口：/api/category
    //      2、数据放到表格中
    //          i>通过arttemplate模板引擎把数据编译到分类列表模板中
    //      3、把包含了真实内容的html放到页面中的指定位置

    return function categoryListFn(){
        api.get("category",{},function(res){
            //i》数据已经成功获取-->数据放到表格中
            var categoryList=template.render(categoryListTpl,res);

            //为了给添加分类按钮绑定事件，需要把html字符串转换为jquery对象
            var $categoryList=$(categoryList);
            $categoryList.on("click",".btn-add",function(){
                //单元测试：
                //alert("事件绑定成功");

                //实现添加分类功能
                categoryAdd();
            }).on("click",".btn-edit",function(){
                // //单元测试：
                // alert("事件绑定成功");

                
                //获取分类id
                var id=$(this).parent().attr("cg_id");

                //调用编辑分类模块-->实现编辑分类功能
                categoryEdit(id,function(){


                    //刷新分类列表？
                    categoryListFn();
                });
            })

            //ii》把包含了真实内容的html放到页面中的指定位置
            $(".panel-content .panel-body").html($categoryList);
        })
    }
})