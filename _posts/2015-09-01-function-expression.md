---
layout: page
title: "函数表达式"
description: "函数表达式的特征；使用函数实现递归；使用闭包定义私有变量"
category: Javascript
tags: [Javascript,读书笔记]
---

<div class="p-section">
	<h3>理解函数表达式</h3>
	<p>函数表达式是JavaScript中一个既强大又令人感到困惑的特性。定义函数的方式有两种，一种是使用函数声明，另一种就是函数表达式。函数声明的语法是这样的，首先是<code>function</code>关键字，然后是函数的名字。关于函数声明，它的一个重要特征是函数声明提升，意思是在执行代码之前会先读取函数，这就意味着可以把函数声明放在调用它的语句之后。第二种创建函数的方式是使用函数表达式。函数表达式有几种不同的语法形式，以下为最常见的一种形式。</p>
<pre><code class="javascript">var functionName=function(arg0,arg1,arg2){
   //函数体
};
</code></pre>	
	<p>这种形式看起来就像是常规的变量赋值语句，即创建一个函数并将它赋值给变量<code>functionName</code>。这种情况下创建的函数叫做匿名函数，因为<code>function</code>关键字后面没有标识符，匿名函数的name属性(<code>functionName.name</code>就是函数名)也是空字符串。
	</p>
</div>

<div class="p-section">
	<h3>使用函数实现递归</h3>
	<p>采用松散耦合的方式实现经典的递归阶乘函数，下面是比较常见的一种方式。</p>
<pre><code class="javascript">function factorial(num){
   if(num<=1) return 1;
   else {
      return num*arguments.callee(num-1);
   }
}
</code></pre>
	<p><code>arguments.callee</code>是一个指向正在执行的函数的指针，因此可以用它来实现经典的递归调用，但在严格模式下，不能通过脚本访问这个指针，会导致错误。不过，可以使用函数命名表达式来达成相同的结果。</p>
<pre><code class="javascript">var factorial=(function f(num){
   if(num<=1){
      return 1;
   }
   else {
      return num*f(num-1);
   }
});
</code></pre>	
	<p>以上代码创建了一个名为<code>f()</code>的命名函数表达式，然后将它赋值给变量<code>factorial</code>。即便把函数赋值给了另一个变量，函数的名字<code>f</code>仍然有效，所以递归调用照样能正确完成。这种方式在严格模式和非严格模式下都行得通。
	</p>
</div>

<div class="p-section">
	<h3>闭包</h3>
	<p>闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包的常见方式就是在一个函数内部创建另一个函数。</p>
<pre><code class="javascript">function createFunction(propertyName){
   return function(object1,object2){
          var value1=object1[propertyName];
	  var value2=object2[propertyName];
	  if(value1<value2){
	     return -1;
	  }
	  else if(value1>value2) {
	     return 1;
	  }
	  else return 0;
   }
}

var result=createFunction("name");
</code></pre>
	<p>一般情况下，函数执行完毕后，会销毁其中的局部变量。但如果我们调用上面的函数，内部函数会被返回，返回后的函数如果在其他地方被调用了,仍然可以访问到变量<code>propertyName</code>，之所以能够访问到这个变量是因为内部函数的作用域链中已经包含了<code>createFunction()</code>的作用域。要彻底搞清楚其中的细节，必须从理解函数被调用的时候都发生了什么入手。</p>
	<p>回忆之前关于作用域链的概念，当某个函数被调用时会创建一个执行环境及相应的作用域链。然后，使用<code>arguments</code>和其他命名参数的值初始化函数的变量对象。在作用域链中，外部函数的变量对象始终处在第二位，外部函数的外部函数的变量对象处在第三位，...直到作为作用域链终点的全局变量对象。</p>
	<div class="image"><img src="http://ffandii.github.io/Personal-blog/images/post/javascript/scope1.png" width="626" height="254"/></div>
	<p>后台的每个执行环境都有一个表示变量的对象——变量对象。全局环境的变量对象始终存在，而像<code>createFunction()</code>这样的局部环境的变量对象，则只在函数执行的过程中存在。在创建函数时，会预先创建一个包含全局变量对象的作用域链，这个作用域链保存在内部的<code>[[scope]]</code>属性中，当调用函数时，会为函数创建一个执行环境，然后通过复制<code>[[scope]]</code>属性中的对象构建起执行环境的作用域链。此后，又有一个变量对象被创建并推入执行环境作用域链的前端，上图中的这个变量对象则为<code>createFunction()</code>的变量对象。作用域本质上是一个指向变量对象的指针列表，它仅仅只是引用变量对象。</p>
	<p>一般来讲，当函数执行完毕后，局部变量对象就会被销毁，内存中仅保存全局变量对象，但是闭包的情况又有所不同。在另一个函数内部定义的函数会将包含函数（即外部函数）的活动对象添加到它的作用域链中。因此，在<code>createFunction()</code>函数内部定义的匿名函数的作用域链中，实际上将会包含外部函数<code>createFunction()</code>的变量对象。</p>
	<div class="image"><img src="http://ffandii.github.io/Personal-blog/images/post/javascript/scope2.png" width="601" height="408"/></div>
	<p>在匿名函数从<code>createFunction()</code>中被返回后，它的作用域链被初始化为包含其包含函数的活动对象和全局变量对象。这样，匿名函数就可以访问在包含函数中定义的所有变量。更为重要的是，<code>createFunction()</code>函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。换句话说，当<code>createFunction()</code>函数返回后，其执行环境的作用域链会被销毁，但它的活动对象仍然会留在内存中；直到匿名函数被销毁后，<code>createFunction()</code>的活动对象才会被销毁。</p>
</div>