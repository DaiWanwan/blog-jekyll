---
layout: post
title: "css中的布局模式"
description: "早期的布局主要依赖于表格，从CSS2.1中有关布局的机制有所改变，但还是并不多，开发者通常不愿意使用绝对定位，因为不太灵活；浮动定位常用于页面的布局，但对于全页多列布局来说，它总是存在一些小毛病，功能上也有很多限制。CSS3则引入了一种全新的伸缩布局盒模型。"
category: CSS
tags: [CSS,布局模式]
---


<div class="p-section">
	<h3>CSS2布局模式</h3>
	<p>谈到布局，CSS2.1中定义了四种布局模式，由一个盒与其兄弟、祖先盒的关系决定其尺寸与位置的算法。</p>
	<ul>
		<li><span class="icon fa fa-cube"></span>块布局：呈现文档的布局模式。</li>
		<li><span class="icon fa fa-cube"></span>行内布局：呈现文本的布局模式。</li>
		<li><span class="icon fa fa-cube"></span>表格布局：用格子来呈现2D数据的布局模式。</li>
		<li><span class="icon fa fa-cube"></span>定位布局：能够直接的定位元素的布局模式，定位元素基本与其他元素没有任何关系。</li>
	</ul>
</div>

<div class="p-section">
	<h3>CSS3 Flexbox布局</h3>
	<p>CSS3引入的布局模式Flexbox布局，主要思想是让容器有能力让其子项目能够改变其宽度、高度（甚至顺序），以最佳方式填充可用空间（主要是为了适应所有类型的显示设备和屏幕大小）。Flex容器会使子项目（伸缩项目）扩展来填满可用空间，或缩小以防止溢出容器。最重要的是，Flexbox布局方向不可预知，不想常规的布局，块就是从上到下，内联就是从左到右。而那些常规的适合页面布局，但对于支持大型或者复杂的应用程序（特别是涉及取向改变、缩放和收缩等）就缺乏灵活性。</p>
	<p>Flexbox布局对于设计比较复杂的页面非常有用。可以轻松实现屏幕和浏览器窗口大小发生变化时保持元素的相对位置和大小不变。同时减少了依赖于浮动布局实现元素位置的定义以及重置元素的大小。综合而言，Flexbox布局功能主要具有以下几点。</p>
	<ul>
		<li><span class="icon fa fa-cube"></span>屏幕和浏览器窗口大小发生改变也可以灵活调整布局。</li>
		<li><span class="icon fa fa-cube"></span>指定伸缩项目沿着主轴或侧轴按比例分配额外空间，从而调整伸缩项目的大小。</li>
		<li><span class="icon fa fa-cube"></span>指定伸缩项目沿着主轴或侧轴将伸缩容器额外空间分配到伸缩项目之前、之后或之间。</li>
		<li><span class="icon fa fa-cube"></span>指定如何将垂直于元素布局轴的额外空间分布到该元素周围。</li>
		<li><span class="icon fa fa-cube"></span>指定元素在页面上的布局方向。</li>
		<li><span class="icon fa fa-cube"></span>按照不同于DOM所指定的排序方式对屏幕上的元素重新排序。</li>
	</ul>
</div>

<div class="p-section">
	<h3>Flexbox模型中的术语</h3>
	<p>和CSS3其他属性不一样，Flexbox并不是一个属性，而是一个模块，包括多个CSS3属性，涉及很多东西，包括整个组属性。虽然现在对Flexbox有一定的了解，如果想更好的使用Flexbox，新的术语和概念可能是一个障碍，所以首先了解基本的概念。下图为一个row伸缩容器中各种方向与大小术语。</p>
	<div class="image"><img src="http://ffandii.github.io/Personal-blog/images/post/css/flexbox.png" width="588" height="231"/></div>
	<p>主轴、主轴方向：用户代理沿着一个伸缩容器的主轴配置伸缩项目，主轴是主轴方向的延伸。伸缩容器的主轴，伸缩项目主要沿着这条轴进行布局。小心，它不一定是水平的，这主要取决于<code>justify-content</code>属性，如果取值为<code>column</code>，主轴的方向为纵向的。</p>
	<p>主轴起点、主轴终点：伸缩项目的配置从容器的主轴起点开始，往主轴终点边结束。也就是说，伸缩项目放置在伸缩容器从主轴起点到主轴终点方向。</p>
	<p>主轴长度、主轴长度属性：伸缩容器在主轴方向上的宽度或高度就是项目的主轴长度，伸缩项目的主轴长度属性就是<code>width</code>和<code>height</code>属性，由哪一个对着主轴方向决定。</p>
	<p>侧轴起点、侧轴终点：填满项目的伸缩行的配置从容器的侧轴起点开始，往侧轴终点边结束。</p>
	<p>侧轴长度、侧轴长度属性：伸缩项目在侧轴方向的宽度或高度就是项目的侧轴长度，伸缩项目的侧轴长度属性为<code>width</code>和<code>height</code>属性，由哪一个对着侧轴方向决定。</p>
</div>

<div class="p-section">
	<h3>伸缩容器和伸缩项目</h3>
	<p>通过<code>display</code>属性，可以显式的给一个元素设置为<code>flex</code>或者<code>inline-flex</code>，这个容器就是一个伸缩容器。伸缩容器会为其内容创立新的伸缩格式化上下文，其中设置为<code>flex</code>的容器会被渲染为一个块级元素，而被设置为<code>inline-flex</code>的容器则被渲染为一个行内元素。若元素<code>display</code>的指定值是<code>inline-flex</code>切=且元素为一个浮动或绝对定位元素，则<code>display</code>的计算值为<code>flex</code>。</p>
	<h4>伸缩容器的属性</h4> 
	<p>Flexbox伸缩布局中伸缩容器和伸缩项目是伸缩布局模块的重要部分，其中每一部分都具有各自的属性。</p>
	<p>伸缩流方向：是指伸缩容器的主轴方向，其决定了伸缩项目放置在伸缩容器的方向。伸缩流方向主要通过<code>flex-direction</code>属性来设置，其默认值为<code>row</code>。</p>
	<p>伸缩行换行：伸缩项目在伸缩容器中有时候也会溢出伸缩容器。与传统的盒模型一样，CSS允许使用<code>overflow</code>属性来处理溢出内容的显示方式。在伸缩容器中，有一个伸缩换行属性，主要用来设置伸缩容器的伸缩项目是单行显示还是多行显示，以及决定侧轴的方向，主要通过<code>flex-wrap</code>属性决定伸缩项目是否换行，默认值为<code>nowrap</code>。伸缩方向与换行属性<code>flex-flow</code>同时设定了伸缩流方向<code>flex-direction</code>和伸缩换行<code>flex-wrap</code>属性。</p>
	<h4>伸缩项目的属性</h4>
	<p>一个伸缩项目是一个伸缩容器的子元素。伸缩容器中的文本也被视为一个伸缩项目。伸缩项目中内容与普通流一样。比如说当一个伸缩项目被设置为浮动，依然可以在伸缩项目中放置一个浮动元素。伸缩项目都有一个主轴长度和一个侧轴长度。主轴长度是主轴项目在主轴上的尺寸，侧轴长度是伸缩项目在侧轴上的尺寸。或者说，一个伸缩项目的宽或高取决于伸缩容器的轴。下面的几个属性可以调整伸缩项目的行为。</p>
	<p>显示顺序：伸缩容器中的伸缩项目默认显示顺序是遵循文档在源码中出现的先后顺序，可以通过伸缩项目的显示顺序来修改在页面的显示顺序，也可以通过这个属性对伸缩项目进行排序组合。</p>
	<p>侧轴对齐：包括两种，一种是<code>align-items</code>属性，可以用来设置伸缩容器中包括匿名伸缩项目的所有项目的对齐方式；另一种为<code>align-self</code>属性，主要用来在单独的伸缩项目上覆写默认的对齐方式，对于匿名的伸缩项目，<code>align-self</code>的值永远与其关联的伸缩容器的<code>align-items</code>的值相同。</p>
	<p>伸缩性：定义伸缩项目可以改变它们的宽度或高度填补可用的空间。可以将伸缩容器的额外空间分发给其伸缩项目（与伸缩项目的真弹性成正比）或将它们缩小以防止伸缩项目的溢出。</p>
	<p>伸缩行：伸缩项目沿着伸缩容器内的一个伸缩行定位，伸缩容器可以是单行的，也可以是多行的。其主要由<code>flex-wrap</code>属性决定。每一个伸缩行至少包含一个伸缩项目。</p>
	<h4>旧版本Flexbox模型浏览器的支持情况</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>属性</th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/ie.png" width="32" height="32" /></th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/firefox.png" width="32" height="32" /></th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/Chrome.png" width="32" height="32" /></th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/Opera.png" width="32" height="32" /></th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/Safari.png" width="32" height="32" /></th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>Flexbox</td>
					<td>×</td>
					<td>2~21√</td>
					<td>4~20√</td>
					<td>×</td>
					<td>3.1~6√</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>新版本Flexbox模型浏览器的支持情况</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>属性</th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/ie.png" width="32" height="32" /></th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/firefox.png" width="32" height="32" /></th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/Chrome.png" width="32" height="32" /></th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/Opera.png" width="32" height="32" /></th>
                    <th><img src="http://ffandii.github.io/Personal-blog/images/post/browser/Safari.png" width="32" height="32" /></th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>Flexbox</td>
					<td>11+√</td>
					<td>22+√</td>
					<td>21+√</td>
					<td>12.1+√</td>
					<td>×</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>开启Flexbox：让一个元素变成一个伸缩容器</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
                    <th>块伸缩容器</th>
                    <th>内联伸缩容器</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>display</td>
					<td>flex</td>
					<td>inline-flex</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>display</td>
					<td>flexbox</td>
					<td>inline-flexbox</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td>display</td>
					<td>box</td>
					<td>inline-box</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>主轴对齐方式：指定伸缩项目沿主轴对齐方式</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
                    <th>start</th>
                    <th>center</th>
					<th>end</th>
					<th>justify</th>
					<th>distribute</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>justify-pack</td>
					<td>flex-start</td>
					<td>center</td>
					<td>flex-pack</td>
					<td>flex-end</td>
					<td>space-around</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>flex-pack</td>
					<td>start</td>
					<td>center</td>
					<td>end</td>
					<td>justify</td>
					<td>distribute</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td>box-pack</td>
					<td>start</td>
					<td>center</td>
					<td>end</td>
					<td>justify</td>
					<td>N/A</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>侧轴对齐方式：指定伸缩项目沿侧轴对齐方式</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
                    <th>start</th>
                    <th>center</th>
					<th>end</th>
					<th>baseline</th>
					<th>stretch</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>align-items</td>
					<td>flex-start</td>
					<td>center</td>
					<td>flex-end</td>
					<td>baseline</td>
					<td>stretch</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>flex-align</td>
					<td>start</td>
					<td>center</td>
					<td>end</td>
					<td>baseline</td>
					<td>stretch</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td>box-align</td>
					<td>start</td>
					<td>center</td>
					<td>end</td>
					<td>baseline</td>
					<td>stretch</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>伸缩项目行对齐方式</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
                    <th>start</th>
                    <th>center</th>
					<th>end</th>
					<th>justify</th>
					<th>distribute</th>
					<th>stretch</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>align-content</td>
					<td>flex-start</td>
					<td>center</td>
					<td>flex-end</td>
					<td>space-between</td>
					<td>space-around</td>
					<td>stretch</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>flex-line-pack</td>
					<td>start</td>
					<td>center</td>
					<td>end</td>
					<td>justify</td>
					<td>distribute</td>
					<td>stretch</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td colspan="7">N/A</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>单个伸缩项目行对齐方式</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
					<th>auto</th>
                    <th>start</th>
                    <th>center</th>
					<th>end</th>
					<th>baseline</th>
					<th>stretch</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>align-self</td>
					<td>auto</td>
					<td>flex-start</td>
					<td>center</td>
					<td>flex-end</td>
					<td>baseline</td>
					<td>stretch</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>flex-item-align</td>
					<td>auto</td>
					<td>start</td>
					<td>center</td>
					<td>end</td>
					<td>baseline</td>
					<td>stretch</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td colspan="7">N/A</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>显示顺序：指定伸缩项目的顺序</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
					<th>属性值</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>order</td>
					<td>&lt;number&gt;</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>flex-order</td>
					<td>&lt;number&gt;</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td>box-ordinal-group</td>
					<td>&lt;integer&gt;</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>伸缩性：指定伸缩项目如何伸缩尺寸</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
					<th>属性值</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>flex</td>
					<td>none | [&lt;flex-grow&gt;&lt;flex-shrink&gt;?||&lt;flex-basis&gt;]</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>flex</td>
					<td>none | [&lt;pos-flex&gt;&lt;neg-flex&gt;?||&lt;preferred-size&gt;]</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td>box-flex</td>
					<td>&lt;number&gt;</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>伸缩流：指定伸缩容器主轴的伸缩流方向</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
					<th>水平方向</th>
					<th>反向水平</th>
					<th>垂直方向</th>
					<th>反向垂直</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>flex-direction</td>
					<td>row</td>
					<td>row-reverse</td>
					<td>column</td>
					<td>column-reverse</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>flex-direction</td>
					<td>row</td>
					<td>row-reverse</td>
					<td>column</td>
					<td>column-reverse</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td>box-orient</td>
					<td>horizontal</td>
					<td>horizontal</td>
					<td>vertical</td>
					<td>vertical</td>
				</tr>
			</tbody>
        </table>
    </div>
	<h4>换行：指定伸缩项目是否沿着侧轴排列</h4>
	<div class="browser">
        <table class="browser">
            <thead>
                <tr>
                    <th>规范版本</th>
                    <th>属性名称</th>
					<th>不换行</th>
					<th>换行</th>
					<th>反转换行</th>
                </tr>
            </thead>
			<tbody>
				<tr>
					<td>标准版本</td>
					<td>flex-wrap</td>
					<td>nowrap</td>
					<td>wrap</td>
					<td>wrap-reverse</td>
				</tr>
				<tr>
					<td>混合版本</td>
					<td>flex-wrap</td>
					<td>nowrap</td>
					<td>wrap</td>
					<td>wrap-reverse</td>
				</tr>
				<tr>
					<td>最老版本</td>
					<td>box-lines</td>
					<td>single</td>
					<td>multiple</td>
					<td>N/A</td>
				</tr>
			</tbody>
        </table>
    </div>
</div>