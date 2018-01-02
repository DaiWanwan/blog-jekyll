---
layout: post
title: "私有变量"
description: "在块级作用域中创建静态私有变量；利用模块模式为单例创建私有变量和特权方法；增强的模块模式，为单例指定具体的类型。"
category: Javascript
tags: [Javascript,读书笔记]
---


<div class="p-section">
	<h3>模仿块级作用域</h3>
	<p>Javascript中没有块级作用域的概念，这意味着在块语句（如循环语句）中定义的变量实际上是包含在函数中而非语句所创建的，从它有定义开始，就可以在在函数内部随处访问它。Javascript从来不会告诉你是否多次声明了同一个变量，后面的声明会覆盖掉前面的相同声明。匿名函数可以用来模仿块级作用域避免这个问题。</p>
<pre><code class="javascript">(function(){
   //这里是块级作用域
})();
</code></pre>
	<p>将函数声明包含在圆括号中，表示它实际上是一个函数表达式，而紧随其后的另一对圆括号会立即调用这个函数。可能感到奇怪的是左边的一对圆括号，去掉后，Javascript会把<code>function</code>关键字作为一个函数声明的开始，而函数声明后面是不能加圆括号的，这样的代码会导致错误。无论在什么地方，如果只是临时需要一些变量的话，就可以包含在块级作用域中，在其中定义的任何变量，都会在执行结束时被销毁。这种技术经常在全局作用域中被用在函数外部，从而限制向全局作用域中添加过多的变量和函数，一般来说我们都应该尽量减少向全局作用域中添加过多的变量和函数。</p>
</div>

<div class="p-section">
	<h3>静态私有变量</h3>
	<p>任何在函数中定义的变量，都可以认为是私有变量，因而不能再函数的外部访问这些变量。如果在这个函数内部创建一个闭包，那么闭包通过自己的作用域链也能够访问到这些变量。而利用这一点，就可以创建用于访问私有变量的公有方法，我们把有权访问私有变量和私有函数的公有方法统称为特权方法。</p>
<pre><code class="javascript">(function(){

   //私有变量和私有函数
   var privateVariable=10;
   
   function privateFunction(){
      return false;
   }
   
   //构造函数
   myObject=function(){
   };
   
   //公有和特权方法
   myObject.prototype.publicMethod=function(){
      privateVariable++;
      return privateFunction();
   };
})();
</code></pre>

	<p>这个模式创建了一个私有作用域，在私有作用域中，首先定义了私有变量和私有函数，然后又定义了构造函数及其公有方法。公有方法是在原型上定义的，这一点体现了典型的原型模式。需要注意的是，这个模式在定义构造函数时并没有使用函数声明，而是使用了函数表达式。函数声明只能创建局部函数，但这并不是我们所需要的，出于同样的原因，在声明<code>myObject</code>关键字时没有使用<code>var</code>关键字，这样<code>myObject</code>就成了一个全局变量，能够在私有作用域之外被访问到。</p>
</div>

<div class="p-section">
	<h3>模块模式</h3>
	<p>前面的模式是用于为自定义类型创建私有变量和特权方法的，而模块模式则是为单例创建私有变量和特权方法的，所谓单例，指的是只有一个实例的对象。语法形式如下：</p>
<pre><code class="javascript">var singleton=function(){
   
   //私有变量和私有函数
   var privateVariable=10;
   function privateFunction(){
      return false;
   }
   
   //特权方法
   return {
      publicProperty: true,
      publicMethod: function(){
         privateVariable++;
         return privateFunction();
      }
   }
}();
</code></pre>

</div>


<div class="p-section">
	<h3>增强的模块模式</h3>
	<p>有人进一步改进了模块模式，即在返回对象之前加入对其增强的代码。这种增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性和（或）方法对其加以增强的情况。来看下面的例子。</p>
<pre><code class="javascript">var singleton=function(){
   //私有变量和私有函数
   var privateVariable=10;
   function privateFunction(){
      return false;
   }
   
   //创建对象
   var object=new CustomeType();
   
   //添加特权方法
   object.publicProperty=true;
   onject.publicMethod=function(){
      privateVariable++;
      return privateFunction();
   }
   
   //返回这个对象
   return object;
}();
</code></pre>
</div>