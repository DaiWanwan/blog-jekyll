---
layout: page
title: "执行环境及作用域"
description: "执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。当代码在一个环境中执行时，会创建变量对象的一个作用域链，保证对执行环境有权访问的所有变量和函数的有序访问。"
category: Javascript
tags: [Javascript,读书笔记]
---

 <div class="p-section">
                                <h3><i class="fa fa-star"></i> 执行环境</h3>
                                <p>
                                    执行环境(execution context)是 javascript 中最为重要的一个概念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象(variable object)，环境中定义的所有变量和函数都保存在这个对象中。我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。
                                </p>
                                <p>
                                    全局执行环境是最外围的一个执行环境。根据 ECMAScript 实现所在的宿主环境不同，表示执行环境的对象也不一样。在web浏览器中，全局执行环境被认为是 <code>window</code> 对象，因此所有全局变量和函数都是作为 <code>window</code> 对象的属性和方法创建的。某个执行环境中的所有代码执行完毕后，该环境会被销毁，保存在其中的变量和函数定义也随之销毁。全局执行环境则在应用程序退出如关闭网页或浏览器时才会被销毁。
                                </p>
                                <p>
                                    每个函数都有自己的执行环境(局部环境)。当执行流进入一个函数时，函数的环境会被推入一个环境栈中，而在函数执行后，栈将其环境弹出，把控制权返回给之前的执行环境，ECMAScript 程序的执行流正是由这个方便的机制控制着。
                                </p>
                            </div>
                            <div class="gap-line"></div>
                            <div class="p-section">
                                <h3><i class="fa fa-star"></i> 作用域</h3>
                                <p>
                                    当代码在一个环境中执行时，会创建变量对象的一个作用域链(scope chain)。作用域链的用途是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动函数(activation object)作为变量对象，活动对象在最开始只包含一个变量，即 <code>arguments</code> 对象(这个对象在全局执行环境中是不存在的)。作用域链中的下一个变量对象来自包含(外部)环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境，全局执行环境中的变量对象始终都是作用域链中的最后一个对象。
                                </p>
                                <p>
                                    标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级的向后回溯，直到找到标识符为止。如果找不到标识符，通常会导致错误的发生。请看下面的示例代码：</p>
                                <pre><code class="javascript">    var color="blue";
    function changeColor(){
       var anotherColor = "red";
       function swapColors(){
          var tempColor = anotherColor;
          anotherColor = color;
          color = tempColor;
          // 这里可以访问 color、 anotherColor 和 tempColor
       }
       // 这里可以访问 color 和 anotherColor，但不能访问 tempColor
       swapColors();
    }
    // 这里只能访问 color
    changeColor();
                        </code></pre>
                                <p>
                                    以上代码共涉及 3 个执行环境：全局环境、 changeColor() 的局部环境和 swapColors() 的局部环境。全局环境中有一个变量 color 和一个函数 changeColor() 。 changeColor() 的局部环境中有一个名为 anotherColor 的变量和一个名为 swapColors() 的函数，但它也可以访问全局环境中的变量 color。 swapColors() 的局部环境中有一个变量 tempColor，该变量只能在这个环境中访问到。无论全局环境还是 changeColor() 的局部环境都无权访问 tempColor。然而，在 swapColors() 内部则可以访问其他两个环境中的所有变量，因为那两个环境是它的父执行环境。
                                </p>
                            </div>