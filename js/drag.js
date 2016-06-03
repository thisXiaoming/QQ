function getByClass(clsName,parent){//clsName为必须的，parent为可选的，即如果不传父元素，就是document
  var oParent=parent?document.getElementById(parent):document,//如果传了父元素过来，就获取父元素的Id,否则就用document
      eles=[],//定义一个数组，因为父元素下有很多类
      elements=oParent.getElementsByTagName('*');//获取到父元素下的所有元素,是一个数组

  for(var i=0,l=elements.length;i<1;i++){//可以同时初始化多个变量
    if(elements[i].className==clsName){//这个集合中与传递过来的clsName相同
      eles.push(elements[i]);
    }
  }
  return eles;
}
/*拖拽效果*/
window.onload=drag;//页面加载

function drag(){
   var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
   // 拖曳
   oTitle.onmousedown=fnDown;//ononmousedown在用户按下任何鼠标按钮（左键或右键）时候触发
   // 关闭
   var oClose=document.getElementById('ui_boxyClose');
   oClose.onclick=function(){
   	  document.getElementById('loginPanel').style.display='none';
   }
   // 切换状态
   var loginState=document.getElementById('loginState'),
       stateList=document.getElementById('loginStatePanel'),
       lis=stateList.getElementsByTagName('li'),
       stateTxt=document.getElementById('login2qq_state_txt'),
       loginStateShow=document.getElementById('loginStateShow');

   loginState.onclick=function(e){
   	 e = e || window.event;
     if(e.stopPropagation){
          e.stopPropagation();
     }else{
          e.cancelBubble=true;
     }
   	 stateList.style.display='block';
   }

   // 鼠标滑过、离开和点击状态列表时
   for(var i=0,l=lis.length;i<l;i++){
      lis[i].onmouseover=function(){
      	this.style.background='#567';
      }
      lis[i].onmouseout=function(){
      	this.style.background='#FFF';
      }
      lis[i].onclick=function(e){
      	e = e || window.event;
      	if(e.stopPropagation){
          e.stopPropagation();
      	}else{
          e.cancelBubble=true;
      	}
      	var id=this.id;
      	stateList.style.display='none';
        stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
        loginStateShow.className='';
        loginStateShow.className='login-state-show '+id;
      }
   }
   document.onclick=function(){
   	  stateList.style.display='none';
   }
}

function fnDown(event){
  event = event || window.event;
  var oDrag=document.getElementById('loginPanel'),
      // 光标按下时光标和面板之间的距离
      disX=event.clientX-oDrag.offsetLeft,
      disY=event.clientY-oDrag.offsetTop;
  // 移动
  document.onmousemove=function(event){//当鼠标在元素内部移动时重复触发
  	event = event || window.event;
  	fnMove(event,disX,disY);
  }
  // 释放鼠标
  document.onmouseup=function(){
  	document.onmousemove=null;
  	document.onmouseup=null;
  }
}
//弹框的移动
function fnMove(e,posX,posY){
  var oDrag=document.getElementById('loginPanel'),
      l=e.clientX-posX,//面板的坐标
      t=e.clientY-posY,
      //浏览器页面的宽度和高度
      winW=document.documentElement.clientWidth || document.body.clientWidth,
      winH=document.documentElement.clientHeight || document.body.clientHeight,
      maxW=winW-oDrag.offsetWidth-10,//拖拽的最大宽度
      maxH=winH-oDrag.offsetHeight;
  if(l<0){//出了左边界，就强制等于0，与浏览器左边窗口契合
    l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if(t<0){
    t=10;//因为样式里面设置了-10
  }else if(t>maxH){
    t=maxH;
  }
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}