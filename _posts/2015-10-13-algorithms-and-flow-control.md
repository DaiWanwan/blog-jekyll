---
layout: page
title: "算法和流程控制"
description: "代码的整体结构是影响运行速度的主要因素之一。代码数量少一定运行快，代码数量多确不意味着运行速度一定慢。影响性能的最直接因素是代码的组织结构，以及具体问题的解决办法。"
category: 数据结构与算法
tags: [算法,性能优化,读书笔记]
---

<div class="p-section">
	<h3>循环</h3>
	<p>对大多数编程语言而言，代码执行时间大部分消耗在循环中。循环处理一系列值是最常见的编程模式之一，因此也是提升性能必须关注的要点之一。理解javascript中循环对性能的影响至关重要，死循环或长时间运行的循环会严重影响整体用户体验。javascript中有四种类型的循环。第一种是标准<code>for</code>循环，与其他类C语言的语法相同，<code>for</code>循环清晰明确的语法风格被开发者们所喜爱；第二种为<code>while</code>循环，它是最简单的前测循环，由一个前测条件和一个循环体构成；第三种循环类型为do-while循环，它是javascript中唯一一种后测循环；最后一种循环类型为for-in循环，它有个非常特殊的用途，就是可以枚举任何对象的属性名。</p>
	<p>不断引发循环性能争论的源头是循环类型的选择。在javascript提供的四种循环类型中，只有for-in循环比其他几种明显要慢。由于每次迭代操作会同时搜索实例或原型属性，for-in循环的每次迭代都会产生额外的开销，因此要比其他循环类型要慢。对比相同迭代次数的循环，for-in循环最终只有其他类型速度的1/7。因此，除非你需要迭代一个属性数量未知的对象，否则应尽量避免使用for-in循环。除for-in循环外，其他循环类型的性能都差不多，深究哪种循环没有意义，循环类型的选择更应基于需求而不是性能。如果循环类型与性能无关，那么该如何选择呢？其实只有两个可选因素：（1）每次迭代处理的事物（2）迭代的次数。通过减少这两个中的任何一个或全部，都能对循环的整体性能产生积极影响。</p>
	<p>很明显，如果一次循环迭代要花很长时间去执行，那么多次循环就需要花费更长的时间。一个提升循环整体速度的好办法是限制循环中耗时操作的数量。即使是在循环体中最快的代码，累计迭代上千次也会变慢下来，此外循环体运行时也会带来小性能开销，不仅仅是增加了总体运行时间。减少迭代次数能获得更加显著的性能提升。最广为人知的一种限制循环迭代次数的模式被称为“达夫设备”。"Duff's Device"是一个循环体展开技术，它使得一次迭代中实际上执行了多次跌打的操作。一个典型实现如下：</p>
<pre><code class="javascript">//credit: Jeff Greenberg
var iterations=Math.floor(items/8),
startAt=items%8,
i=0;

do { 
   switch(startAt){
      case 0: process(items[i++]);
	  case 7: process(items[i++]);
	  case 6: process(items[i++]);
	  case 5: process(items[i++]);
	  case 4: process(items[i++]);
	  case 3: process(items[i++]);
	  case 2: process(items[i++]);
	  case 1: process(items[i++]);
   }
   startAt=0;
}while(--iterations)
</code></pre>	
	<p>Duff's Device背后的基本理念是：每次循环最多调用8次<code>process()</code>。循环的迭代次数为总数除以8，变量startAt用来存放余数是否使用Duff's Device，很大程度上依赖于迭代次数。如果循环迭代次数小于1000，你很有可能看到它与常规循环结构相比只有微不足道的性能提升。如果迭代次数超过1000，那么它的执行效率将会得到明显的提升，例如在500000次迭代中，其运行时间比常规少70%。</p>
</div>

<div class="p-section">
	<h3>条件语句</h3>
	<p>与循环的原理类似，条件表达式决定了javascript程序的流句。其他语言对应该使用if-else语句还是switch语句的传统观点同样适用于javascript。由于不同的浏览器针对流程控制进行了不同的优化，因此使用哪种技术更没有定论。使用if-else语句还是switch，最流行的方法是基于测试条件的数量来判断：条件数量越大，越倾向于使用switch而不是if-else。这通常归结为代码的可读性，通常，当判断多于两个离散值时，switch语句是更好的判断。</p>
	<p>优化if-else的目标是：最小化到达正确分支前所需判断的条件数量，最简单的优化方法是确保最可能出现的条件放在首位，if-else中的条件语句应该总是按照从最大概率到最小概率的顺序排列，以确保运行速度最快。另一种减少条件判断次数的方法是把if-else组织成一系列嵌套的if-else语句，使用单个庞大的if-else会运行很慢，因为每个条件都需要判断。</p>
</div>

<div class="p-section">
	<h3>递归</h3>
	<p>使用递归可以把复杂的算法变得简单，事实上有些传统算法正是递归实现的，比如阶乘函数。阶乘函数的潜在问题是终止条件不明确或缺少终止条件会导致函数长时间运行，并使得用户界面处于假死状态，而且递归函数还可能遇到浏览器的调用栈大小限制。</p>
	<p>javascript引擎支持的递归数量与javascript调用栈大小直接相关。只有IE例外，它的调用栈与系统空闲内存有关，而其他所有浏览器都有固定数量的调用栈限制。当你使用了太多的递归甚至超过最大调用栈容量时，浏览器会报告错误信息。当你遇到调用栈大小限制时，第一步应该先检查代码中的递归实例。为此有两种递归模式值得注意，一种为直接递归模式，另一种模式被称为隐伏模式。</p>
<pre><code class="javascript">//直接递归模式
function recurse(){
   recurse();
}

//隐伏模式
function first(){
   second();
}

function second(){
   first();
}
</code></pre>	

	<p>大多数调用栈错误都与这两种模式有关，最常见的导致栈溢出的原因是不正确的终止条件，因此定位模式错误的第一步是验证终止条件，如果终止条件没问题，那么可能是
	算法中包含了太多层的递归，为了能在浏览器中安全地执行，建议改用迭代、Memoization或者两者的结合。
	</p>
	<p>任何递归能实现的算法也可以用同样的迭代来实现。迭代算法通常包含几个不同的循环分别对应计算过程的几个不同的方面，这也会引入它们自身的性能问题。然而优化
	后的循环替代长时间运行的递归函数可以提升性能，因为运行一个循环要比反复调用一个函数的开销少的多。例如合并排序算法是最常见的用递归实现的算法：</p>
<pre><code class="javascript">//递归实现的合并排序算法
function merge(left,right){
   var result=[];
   while(left.length>0&&right.length>0){
      if(left[0]<right[0]){
	     result.push(left.shift());
	  }
	  else {
	     result.push(right.shift());
	  }
   }
   return result.concat(left).concat(right);
}

function mergeSort(items){
   if(items.length==1){
      return items;
   }
   var middle=Math.floor(items.length/2);
   left=items.slice(0,middle);
   right=items.slice(middle);
   return merge(mergeSoft(left),mergeSoft(right));
}
</code></pre>

	<p>这段合并排序的代码相当直观，但是mergeSoft()函数会导致很频繁的自调用，一个长度为n的数组最终会调用<code>mergeSoft()</code>2*n-1次，这意味着一个长度超过1500
	的数组会在firefox上发生栈溢出错误。迭代实现如下：</p>
<pre><code class="javascript">function mergeSoft(items){
   if(items.length==1){
      return items;
   }
   var work=[];
   for(var i=0,len=items.length;i<len;i++){
      work[i].push([items[i]]);
   }
   work.push();  //如果数组长度为奇数
   for(var lim=len,lim>1,lim=(lim+1)/2){
      for(var j=0,k=0;k<lim;j++,k+=2){
	     work[j]=merge(work[k],work[k+1]);
	  }
	  work[j]=[]; //如果数组长度为奇数
   }
   return work[0];
}
</code></pre>
</div>


