# 博学谷项目
## 目录结构
bxg9
    js/
        teacher
            add.js
            index.js
            edit.js
        course
            index.js-->课程列表
            add.js-->添加课程
        lib：存放第三方的纯js库
            jquery.js
            require.js
    assets/：存放第三方的项目(可能拥有js/css/fonts等资源文件)
        bootstrap
        ueditor
        uploadify
        datetimepicker
    css/
        index.less/
    tpls/   -->用于存放网站中的模板文件
        teacherAddTpl.html
        courseAddTpl.html
    login.html  -->登录页
        -->没有模块化开发
    index.html  -->主页
        -->用requireJS进行模块化开发
    main.js
        -->requireJS的入口文件
## jquery事件回调函数有一个参数：事件对象e
+ e.preventDefault();阻止事件的默认行为
+ e.stropPropagation();阻止事件冒泡

## 登录功能？
1. bootstrap进行页面布局
2. 要进行表单提交-->异步提交
    1. 阻止页面跳转-->通过给form标签绑定submit事件，并且return false阻止默认行为就可以实现阻止页面跳转
    2. 自己通过ajax的方式把数据提交到服务器中验证？
        + 要进行ajax，就必须要有接口地址、接口类型，接口请求参数这三个条件
            - 接口地址，接口类型通过接口文档：http://doc.botue.com得知
            - 请求参数（要提交的数据）：
                - 基本原理：$("form").serialize();获取表单的序列化数据
                    - 要获取的表单数据，该表单必须要有name属性，name属性应该通过接口文档查看参数说明，一一对应的编写

## 错误情况
1. 整个博学谷项目在调试的时候，一定，必须，千万要用昨天配置的网站来访问
    -- file
    -- localhost
    -- 127.0.0.1
        -- bxg.com
2. 请求失败404的情况？
    1. 看下数据有没有
    2. 看看数据内容对不对
        tc_name：前端学院
        tc_pass：123456


## arttemplate模板引擎
### 介绍
+ 作者：糖饼
+ github：https://github.com/aui/art-template
+ 官网：https://aui.github.io/art-template/

### 基本使用
+ 下载arttemplate
+ 页面中引用arttemplate
+ 编写模板内容：
    var tpl="hi,{{value}}";
+ 编译模板内容：
    var html=template.render(tpl,{ value:100 });//正常编译完成之后的内容存放在html中

### API比较
template("script的id",数据);//-->弊端：一定要在页面中准备无数个模板


template.render("模板字符串",数据);


template("模板文件路径",数据);


## 首页菜单的切换
1. 给菜单绑定事件
    1. 通过给菜单的容器绑定事件，通过事件委托由不同的菜单触发
2. 事件触发的时候，判断用户到底是什么菜单？
    1. 通过给不同的菜单添加了不同的类名
    2. 事件触发的时候，判断该菜单是否有指定的类名，根据不同的类名实现不同的功能
        $("div").hasClass("hover")
3. 发现页面一旦加载完成之后，就出现了讲师列表？
    1. 实际上点击了讲师管理菜单就可以出现讲师列表
    2. 解决方案：通过模拟点击讲师管理菜单实现该功能

## 讲师列表的加载-->teacher/list中实现的
1. 编写了teacher/list模块
    1. 准备讲师数据
        ajax：/api/teacher   数据存放在返回值的result中
    2. 准备讲师列表的模板
        tpls/teacherList.html-->通过requireJS提供的text插件获取模板内容
    3. 将讲师数据放在模板中编译，获取到真实内容
        arttemplate
        var html=template.render(模板内容,数据);
    4. 把真实内容放到页面的指定位置
        $(".panel-content .panel-body").html(html);
2. 在main.js中，首先引入teacher/list的模块依赖；然后在菜单切换的时候，调用teacher/list

## http状态码
+ 登录获取其他接口出现：503/501这样的状态码-->没有联网
+ index.html中的请求出现401：授权失败、验证失败-->没有正确的用户名和密码-->没有登录过

## 跨页面访问数据的方式
### h5：localStorage/sessionStorage
+ 这两种方式的区别：数据缓存时间不同
    - localStorage缓存的数据是永久保存
    - sessionStorage缓存的数据在关闭浏览器之后就会消失
+ API：
    - sessionStorage.setItem("键","值");
        - `备注`：值表面上是可以接收任意数据类型的值，然而如果存储了非字符串类型的值，最终存储的时候，会把该值转换为字符串类型
    - sessionStorage.getItem("键")：获取该键对应的值

    - sessionStorage.removeItem：清除指定的键值
    - sessionStorage.clear：清空所有的数据

## cookie：浏览器中的技术(王牌劲旅)
+ cookie不仅可以在浏览器中读写，也可以在服务器中读写
+ cookie不能跨域
+ cookie不能存储安全性较高的内容：比如用户密码

## session：服务器中的技术：php/java/node

## 数据序列化和反序列化
+ JSON.stringify()：将对象序列化为JSON字符串格式
+ JSON.parse()：将JSON字符串反序列化为对象格式



## 项目中使用：$.cookie
+ 1. 通过paths，配置$.cookie的路径
+ 2. 哪里使用cookie，就在哪里导入cookie模块（cookie模块是jquery插件，没有返回值的，不要形参接收）
+ 3. $.cookie操作


## 查看讲师：
1. 给讲师列表中的查看按钮绑定单击事件
    + 给父元素绑定单击事件，通过事件委托，由页面中每一个查看按钮(查看按钮设置类名)触发

2. 事件触发的时候，弹出模态框
    + tpls文件夹下面：新建一个查看讲师的模态框模板，通过text插件获取模板内容
    + 获取讲师数据(/api/teacher/view)
        - 接口参数：tc_id表示每一个讲师的唯一标示，需要事先在表格中存储这个tc_id
    + 把数据编译到模板中，获取到真实的内容
        - arttemplate   template.render()
    + 把真实的内容放在页面中，并且以模态框的形式呈现出来

## 添加讲师：
1. 给添加讲师按钮绑定单击事件
2. 事件触发的时候，弹出模态框
    + tpls文件夹下面：新建一个添加讲师模板,通过text插件获取模板内容
    + 把模板内容放到页面中，以模态框的形式呈现出来
3. 给提交按钮绑定事件(submit)
    + 应该注意：阻止事件的默认行为（同步的表单-->异步的表单）
    + 通过ajax方式的获取表单中的数据，把数据提交到服务器中
        - $(...).serialize()    //-->数据一定要有name属性，name属性怎么来？根据文档来一一对应
            - 文本框/文本域 直接添加name
            - 单选框、复选框：每一项都应该有name
            - 下拉框：select设置name，option设置value
        - 调用/api/teacher/add接口，把数据传递到服务器中，等数据已经成功添加之后

    + 刷新讲师列表模块
        - 模拟点击一下讲师管理按钮

## 编辑讲师
1. 给表格中每一行的编辑按钮绑定事件
    + 绑定事件3要素：给谁绑定事件/事件类型/事件源
        - 事件绑定在表格容器中
        + click
        + 由表格中每一个编辑按钮触发？
            - 给编辑按钮设置一个类名
2. 等事件触发的时候弹出模态框，模态框中要有该用户的基本信息
    + 准备一个模态框的模板
    + 获取模板内容-->字符串
        - text插件
    + 通过jquery操作把字符串放到body中，并且以模态框的形式呈现出来
        - $(模板).appendTo("body").modal();

    + 模态框中要有该用户的基本信息？
        - 获取基本信息
            - 获取按钮的父元素中存放的tc_id
            - 通过ajax请求调用指定的接口：/api/teacher/edit
        - 把基本信息放在模态框模板中（数据渲染）
            - 添加一个arttemplate的模块依赖，通过依赖注入获取模块的返回值：template
            - 编译模板：var html=template.render(模板内容,数据)
            - 最终把编译成功之后的模板放到页面中，并且以模态框的形式呈现出来

3. 给模态框里面的表单绑定submit事件
    + 获取表单数据，通过ajax请求把数据更新到服务器中
        - 给需要提交到服务器中的表单数据添加对应的name属性
        - $(this).serialize();
        - 调用ajax请求：/api/teacher/update
    + 把同步的表单变成异步的表单

## 注销/启用讲师
1. 给表格中的注销按钮绑定单击事件
2. 事件触发的时候
    + 修改该讲师服务器中的数据状态
    + 修改表格中显示的指定的列的文本，以及按钮的文本

## 隐藏域：
+ 隐藏域：用户看不到，但是隐藏域中的数据是可以提交到服务器中的

## 严格模式文档
http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html

## 一种特殊的函数表达式
var fn=function(){}
fn();

var fn2=function fn3(){
    //在函数体内部fn3和fn2和arguments.callee都表示当前函数体
};
fn2();
//不能使用fn3()调用

## 2017.8.19作业
### 自己分析+代码实现添加讲师功能

### 课后练习：已知字符串："id=666; PHPSESSID=c993fp0r0eu9c8pp7esdmr1oq5"，封装一个函数，获取指定的键值
```
function fn(key){ }
    fn("id")-->"666"
    fn("PHPSESSID")-->"c993fp0r0eu9c8pp7esdmr1oq5"
```

### 项目中使用日期控件：
1. 页面中导入bootstrap样式之后，导入日期控件的样式
2. 在main.js配置日期控件的2个包(主包、语言包)的路径
3. 通过shim配置语言包依赖于主包
4. 在需要加载日期控件的页面中添加一个input，指定id、类名
5. 在指定的模块中，先依赖主包，然后依赖语言包，通过$("...").datetimepicker()渲染出日期控件


## 添加分类
1. 点击添加分类按钮-->给按钮绑定单击事件
2. 事件触发的时候，弹出模态框
    + 准备一个模态框的模板
    + 通过text插件获取模板内容
    + 通过jquery操作把模板放到页面中，并且以模态框的形式呈现出来

    + 获取数据？
        - 数据在服务器中
            - 数据需要通过ajax请求获取
    + 把数据放到页面中 - 把数据放到模态框模板中，之后数据就会随着模态框的模板一起放到页面中
        - 通过arttemplate模板引擎编译模板

## 备注：下拉框的使用
+ 下拉框的name值应该设定在select标签中，value值存在于每一个option标签中
+ option的使用
    - option有文本，文本是给用户看的
    - option有value，value是用来提交表单的

## 如何排查ajax请求错误？
1. 看请求报文：XHR/All才能看到ajax请求报文
2. 每一个请求对应一个请求报文，请求报文中，包含了：请求头、请求体  post传入的数据在请求体的Form Data中，确认数据有没有问题
3. 确认了数据有问题？-->a、看你的最终的ajax请求的位置，$.ajax方法中data参数存放了请求的数据，b、然后一步步排查代码逻辑错误

## 编辑分类
### 需求：点击表格中的编辑按钮，弹出模态框，模态框中首先展示该分类的原来的信息，点击模态框中的提交按钮把数据提交到服务器中，提交成功之后隐藏模态框，同时刷新分类列表
### 思路：
1. 点击表格中的编辑按钮，弹出模态框
    + 给表格中的编辑按钮绑定单击事件
    + 事件触发，弹出模态框
        - 准备一个编辑分类的模块，在事件触发的时候调用该模块
        + 准备一个模态框的模板文件
        + 使用text插件获取模板文件的内容
        + 把模板文件的内容通过jquery操作放到页面中，并且以模态框的形式呈现出来

### 编辑分类ajax嵌套之后的数据处理实现思路：
1. 有了嵌套，第一个嵌套res存放顶级分类信息，第二个嵌套resEdit存放原来的信息
2. 把顶级分类信息放到下拉框中，这段逻辑之前就已经实现了(res)，所以只需要把resEdit中的信息也放进去就好了
3. 为了把resEdit中的信息放进去，我们通过把resEdit中的result属性存储在res中：res.obj=resEdit.result;
4. 后续在模板中通过：obj.cg_name就相当于：resEdit.result.cg_name，其他的表单也与其类似

## 课程管理列表实现思路
1. 功能的入口：点击课程管理菜单
2. 实现过程：点击课程管理菜单之后，加载出课程列表，本质上其实也就是做了2件事
    - 页面结构
        - 在哪里写？
            - 新建一个模板文件
        - 怎么写页面结构？
            - bootstrap布局
        - 页面结构放在哪里？
            - 要把页面结构放到页面中的指定位置？
                - a、text插件读取到模板文件的内容
                - b、jquery操作将页面结构添加到页面指定位置

    - 页面数据
        - 数据在哪里？
            - 数据在服务器中
        - 数据怎么获取？
            - 通过ajax请求调用相应的接口:1.5.11. 课程列表
        - 数据有什么用？-->渲染到页面中
        - 数据如何渲染到页面中
            - 导入arttemplate模块，通过依赖注入，获取模块的返回值：template
            - var html=template.render(页面结构,数据) 获取到真实内容
            - 把真实内容放到页面中


## 编辑分类：为什么要有嵌套ajax请求？
1. 第一个ajax请求用于获取顶级分类数据-->下拉框
2. 第二个ajax请求获取该分类原来的信息，用于表单数据的渲染
3. 2个ajax请求的数据都需要渲染到页面中-->模板中
4. 渲染只有一次机会，所以只能在这仅有的一次机会中把所有的数据都放进去一起渲染，所以才有了嵌套ajax请求，在ajax请求都完成之后，把数据再合成一个整体：把resEdit中的result存放到res中，这样才能保证在编译模板的时候同时可以编译2个请求中的相关数据

## 课时信息页面
### 需求
1. 点击列表中的每一个行的课时信息按钮，进入到一个新的页面，新的页面中展示该课程对应的课程基本信息+课时列表

### 思路；
1. 给课程列表容器绑定单击事件，通过事件委托的方式让课时信息按钮触发
2. 事件触发的时候，改变网页中指定区域的内容
    $(".panel-content .panel-body").html(内容)
3. 页面内容？
    内容：该课程对应的课程基本信息+课时列表
    内容怎么来？-->服务器中：1.5.7. 课时管理
        ajax请求调用该接口，传入一个：课程id，为参数
    把内容放到页面中，所以需要准备一个html模板，把数据编译到模板中，然后把编译好的内容放到第2步的html参数中

## jquery插件
+ 要编写一个像bootstrap.js这样的jquery插件，本质上就是给$.fn添加一个方法

+ $：jQuery
+ $.fn：jQuery.prototype

+ 举例：
```js
//编写
$.fn.myModal=function(){};
//调用
$("div").myModal();
```
## jQuery链式编程
```js
var $1=$("body").css({color:"red"}).myModal();

//因为链式编程，所以：
// $("body")
// $("body").css({color:"red"})
// $("body").css({color:"red"}).myModal()这3句代码的返回值都是同一个对象
````

## 编辑课程基本信息
1. 点击课程列表中基本信息的按钮-->给按钮绑定事件-->找到按钮的容器(课程列表模板)绑定事件，通过事件委托由按钮触发
2. 事件触发的时候，加载出一个页面，页面中首先获取课程对应的原来的基本信息
    + 新建一个模板页，获取模板页的内容，通过jquery操作把模板放到页面中
    + 通过ajax请求获取课程原来的基本信息：(1.5.2. 基本信息)
        - 参数：cs_id-->课程id：通过按钮的父元素获取
    + 将获取到的数据放到页面中-->编译模板，获取到真实的数据，再把真实的数据放到页面中
        - 导入模板引擎
        - template.render(模板内容,数据)

## 联动下拉框实现原理
需求：根据选中的前一个下拉框的值，获取对应的【后一个下拉框】中的数据
思路：
    1、获取第一个下拉框的值-->给下拉框绑定change事件，事件触发的时候，获取下拉框的value
    2、根据value获取到指定的数据，把数据加载到【后一个下拉框】中



## 预习：
uploadify：上传插件 http://www.uploadify.com/documentation/
ueditor: 富文本编辑器 http://ueditor.baidu.com/website/
echarts；canvas做出来图表软件   http://echarts.baidu.com/

## $.extend  实现了混入继承(拷贝继承)
参数1：目标对象-->接受数据的对象
参数2、参数3.。。。。。。。：源对象，提供数据的对象

1. 将一个对象中的属性拷贝到另一个对象中
var o1={num:100,age:50,gender:"男"};

var o2={};


$.extend(o2,o1);


//给o2添加了length/height/width
$.extend(o2,{length:100},{height:30},{width:60})

## UEidtor
+ ueditor是什么？
UEidtor是由百度前端团队开发的一款富文本编辑器

+ 常见的富文本编辑器
    - ueditor
    - ckeditor

+ 使用ueditor
    - 导入ueditor.config.js
    - 导入ueditor.all.js

+ 项目中使用
    - 在ueditor.config.js中修改ueditor文件夹路径：window.UEDITOR_HOME_URL = "/assets/ueditor/";
    - 在ueditor.config.js中修改zIndex属性，超过模态框的zindex(>1050)

    - 配置ueditor.config.js/ueditor.all.js的路径
    - 通过shim解决2个js文件的依赖
    - 在需要渲染编辑器的模块，导入指定的js
    - 在需要渲染编辑器的页面模板中，添加一段代码
    <script id="ueContainer" name="tc_introduce" type="text/plain"></script>
    - 当页面已经加载完毕之后，初始化编辑器：var ue=UE.getEditor('ueContainer');
    - 当编辑器初始化完毕后，加载原来的自我介绍
    ```js
        ue.ready(function(){
            ue.setContent(res.result.tc_introduce);
        })
    ```

## 图表软件
echarts     百度
highcharts  老外

+ 入门：文档-->教程
+ 参数：文档-->配置项手册
+ 案例：实例-->官方实例


