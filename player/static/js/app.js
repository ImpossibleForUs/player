var playerApp = angular.module('playerApp', ['ngRoute']);

/*
 module是angular程序的入口,需要先声明module才能定义angular中其他组件
关于module函数可以传递3个参数，它们分别为：

name：模块定义的名称，它应该是一个唯一的必选参数，它会在后边被其他模块注入或者是在ngAPP指令中声明应用程序主模块；
requires：模块的依赖，它是声明本模块需要依赖的其他模块的参数。特别注意：如果在这里没有声明模块的依赖，
则我们是无法在模块中使用依赖模块的任何组件的；它是个可选参数。
configFn： 模块的启动配置函数，在angular config阶段会调用该函数，对模块中的组件进行实例化对象实例之前的特定配置，
如我们常见的对$routeProvider配置应用程序的路由信息。它等同于”module.config“函数，建议用”module.config“函数替换它。
这也是个可选参数。*/
