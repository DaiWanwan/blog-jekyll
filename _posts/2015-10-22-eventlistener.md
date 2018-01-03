---
layout: page
title: "添加和移除事件处理器"
description: "在计算机科学领域中最主要的性能优化技术之一就是避免无谓的工作，避免无谓的工作的概念有两重意思：别做无关紧要的工作，别重复做已经完成的工作。考虑一个添加和移除事件处理器的例子。"
category: javascript
tags: [javascript,性能优化,读书笔记]
---


<div class="p-section">
	<h3>典型的跨浏览器代码</h3>
<pre><code class="javascript">function addHandler(target,eventType,handler){
   if(target.addEventListener){   //DOM2 events
      target.addEventListener(eventType,handler,false);
   }
   else {   //IE
      target.attachEvent("on"+eventType,handler);
   }
}

function removeHandler(target,eventType,handler){
   if(target.removeEventListener){  //DOM2 events
      target.removeEventListener(eventType,handler,false);
   }
   else {
      target.detachEvent("on"+eventType,handler);
   }
}
</code></pre>	
	<p>此代码通过测试<code>addEventListener()</code>和<code>removeEventListener()</code>来测试DOM2 level事件是否被支持。除IE外，所有主流浏览器支持DOM2 level事件，如果此方法在<code>target</code>中不存在，则假定当前浏览器为IE，并使用IE特有的方法。</p><p>咋一看这个函数似乎已经充分优化了。隐藏的性能问题在于每次函数调用时都做了重复工作，因为每次的检测过程都相同：看看指定方法是否存在。如果你假定<code>target</code>唯一值就是DOM对象，而且用户不可能在加载完页面后奇迹般的改变浏览器，那么这次检测就是重复的。如果在第一次调用<code>addHandler()</code>时就确定<code>addEventListener()</code>是存在的，那么随后每次调用它都是存在的，每次调用同一个函数都重复相同的工作是一种浪费，有几种方法可以避免它。</p>
</div>

<div class="p-section">
	<h3>延迟加载</h3>
	<p>第一种消除函数中的重复工作的方法是延迟加载(lazy loading)。延迟加载意味着信息被使用前不回做任何操作。比如前面的例子，在函数被调用前，没有必要判断改用哪个
	方法去绑定或消除事件处理器。采用延迟加载的函数版本如下：</p>
<pre><code class="javascript">function addHandler(target,eventType,handler){

   //复写现有函数
   if(target.addEventListener){  //DOM2 events
      addHandler = function(target,eventType,handler){
	     target.addEventListener(eventType,handler,false);
	  };
   }
   else {   //IE
      addHandler= function(target,eventType,handler){
	     target.attachEvent("on"+eventType,handler);
	  };
   }
   
   //调用新函数
   addHandler(target,eventType,handler);
}

function removeHandler(target,eventType,handler){
   //复写现有函数
   if(target.removeEventListener){
      removeHandler=function(target,eventType,handler){
	     target.removeEventListener(eventType,handler,false);
	  };
   }
   else {  //IE
      removeHandler=function(target,eventType,handler){
	     target.detachEvent("on"+eventType,handler);
	  };
   }
   
   //调用新函数
   removeHandler(target,event,handler);
}
</code></pre>	
	<p>这两个函数实现了延迟加载模式。这两个方法在第一次调用时，会先检查并决定用哪种方法去绑定或取消绑定事件处理器。然后原始函数会被包含正确操作的新函数覆盖。最后一步调用新的函数，并传入原始参数。随后每次调用<code>addHandler()</code>和<code>removeHandler()</code>都不会再做检查，因为检测代码已经被新的函数覆盖。</p>
	<p>调用延迟加载函数时，第一次总会消耗较长的时间，因为它必须运行检测接着再调用另一个函数完成任务。但随后调用相同的函数，速度会更快，因为不需要再执行检测逻辑，当一个函数在页面中不会被立即调用时延迟加载是最好的选择。</p>
</div>

<div class="p-section">
	<h3>条件预加载</h3>
	<p>除了延迟加载函数之外的另一种选择是：条件预加载(conditional advanceloading)，它会在脚本加载期间提前检测，而不会等到函数被调用。检测的操作依然只是一次，
	只是它在过程中来的更早。例如</p>
<pre><code class="javascript">var addHandler=document.body.addEventListener?
   function(target,eventType,handler){
      target.addEventListener(eventType,handler,false);
   }:
   function(target,eventType,handler){
      target.attachEvent("on"+eventType,handler);
   };
   
var removeHandler=document.body.removeEventListener?
   function(target,eventType,handler){
      target.removeEventListener(eventType,handler,false);
   }:
   function(target,eventType,handler){
      target.detachEvent("on"+eventType,handler);
   }
</code></pre>	
	<p>这个例子会先检测<code>addEventListener()</code>和<code>removeEventListener()</code>是否存在，然后根据结果指定选择最佳的函数。如果它们存在的话，三元运算符会返回DOM2 level函数，否则返回IE特有的函数，这样做的结果是所有对<code>addHandler()</code>和<code>removeHandler()</code>的调用都十分快，因为检测提前发生了。条件预加载确保所有函数调用消耗的时间相同。其代价是需要在脚本加载时检测，而不是加载后，预加载适合于一个函数马上就要被用到，而且在整个页面的生命周期中频繁出现的场合。</p>
</div>






