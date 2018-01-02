---
layout: post
title: "二叉搜索树"
description: "树是计算机科学中经常用到的一种数据结构。树是一种非线性的数据结构，以分层的方式存储数据。树被用来存储具有层级关系的数据，比如文件系统中的文件，有序列表等。"
category: 数据结构与算法 
tags: [数据结构,Javascript,读书笔记]
---


<div class="p-section">
	<h3>树的定义</h3>
	<p>树是由一组以边连接的节点组成，边描述了各节点之间的关系。一棵树最上面的节点称为根节点，如果一个节点下面连接多个节点，那么该节点称为父节点，它下面的节点称为子节点。一个节点可以有0个、1个或多个子节点。没有任何子节点的节点称为叶子节点。沿着一组特定的边，可以从一个节点走到另一个与它不直接相连的节点，从一个节点到另一个节点的这一组边称为路径，图中用虚线表示。以某种特定的顺序访问树中所有的节点称为树的遍历。树可以分为几个层次，根节点是第0层，它的子节点是第1层，子节点的子节点是第2层，以此类推。树中任何一层的节点可以都看做是子树的根，该子树包含根节点的子节点，子节点的子节点等。我们定义树的层数就是树的深度。</p>
	<div class="image"><img src="http://ffandii.github.io/Personal-blog/images/post/ds&al/tree1.png" width="621" height="429"/></div>
	<p>二叉树每个节点的子节点不允许超过两个，一个父节点的两个子节点分别称为左节点和右节点。在一些二叉树的实现中，左节点包含一组特定的值，右节点包含另一组特定的值。</p>
</div>

<div class="p-section">
	<h3>实现二叉搜索树</h3>
	<p>二叉搜索树由节点组成，所以我们要定义的第一个对象是<code>Node</code>类。</p>
<pre><code class="javascript">function Node(data,left,right){
   this.data=data;
   this.count=1;  //同一记录出现的次数
   this.left=left;
   this.right=right;
   this.show=show;
}

function show(){    //显示当前节点
   return this.data+"  "+this.count;
}
</code></pre>
	<p><code>Node</code>对象既保存数据，也保存和其他节点的链接（<code>left</code>和<code>right</code>），<code>show()</code>方法用来显示保存在节点中的数据。现在可以创建一个类，用来表示二叉查找树（<code>BST</code>）。我们让类只包含一个数据成员：一个表示二叉查找树根节点的<code>Node</code>对象。该类的构造函数将根节点初始化为<code>null</code>，以此创建一个空节点。</p>
<pre><code class="javascript">function BST(){
   this.root=null;
   this.insert=insert;      //插入
   this.inOrder=inOrder;    //中序遍历
   this.preOrder=preOrder;  //先序遍历
   this.postOrder=postOrder;  //后序遍历
   this.getMin=getMin;  //返回值最小的节点
   this.getMax=getMax;  //返回值最大的节点
   this.find=find;  //返回二叉查找树上的查找结果
   this.remove=remove;
   this.removeNode=removeNode;  //删除节点
}
</code></pre>
	<p><code>BST</code>类的方法如下：</p>
<pre><code class="javascript">    function insert(data){
        var n=new Node(data,null,null);
        if(this.root==null){
            this.root=n;
        }
        else {
            var current=this.root;
            var parent;     //parent用来保存当前节点的父节点
            while(true){
                parent=current;
                if(data<current.data){
                    current=current.left;
                    if(current==null){
                        parent.left=n;
                        break
                    }
                }
                else if(data>current.data){
                    current=current.right;
                    if(current==null){
                        parent.right=n;
                        break;
                    }
                }
                else {
                    current.count++;
                    break;
                }
            }
        }
    }

    //在二叉查找树上进行查找  查找给定值 查找最小值 查找最大值
    function getMin(node){
        var current=node;
        while(current.left!=null){
            current=current.left;
        }
        return current.data;
    }

    function getMax(node){
        var current=node;
        while(current.right!=null){
            current=current.right;
        }
        return current.data;
    }

    function find(data){
        var current=this.root;
        while(current!=null){
            if(current.data==data){
                return current;
            }
            else if(current.data<data){
                current=current.right;
            }
            else {
                current=current.left;
            }
        }
        return null;
    }

    function remove(data){
        this.root=removeNode(this.root,data);
    }

    function removeNode(node,data){
        if(node==null){
            return null;
        }

        if(data==node.data){
            if(node.left==null&&node.right==null){
                return null;
            }
            //没有左子节点的节点
            if(node.left==null){
                return node.right;
            }
            //没有右子节点的节点
            if(node.right==null){
                return node.left;
            }

            //有两个子节点的节点
            var tmpNode=getMin(node.right);
            node.data=tmpNode;
            node.right=removeNode(node.right,tmpNode);
            return node;
        }
        else if(data<node.data){
            node.left=removeNode(node.left,data);
            return node;
        }
        else {
            node.right=removeNode(node.right,data);
            return node;  //当前节点返回后，即为上一层节点所指
        }
    }

    //我们还需要有能力遍历BST，这样就可以按照不同的顺序显示节点上的数据
    function inOrder(node){
        if(node!=null){
            inOrder(node.left);
            document.write(node.show()+"\n");
            inOrder(node.right);
        }
    }

    function preOrder(node){
        if(node!=null){
            document.write(node.show()+"\n");
            preOrder(node.left);
            preOrder(node.right);
        }
    }

    function postOrder(node){
        if(node!=null){
            postOrder(node.left);
            postOrder(node.right);
            document.write(node.show()+"\n");
        }
    }

</code></pre>
</div>
