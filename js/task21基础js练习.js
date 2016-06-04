/**
 * Created by Lily on 2016/5/24.
 */
window.onload=function(){
    var oTag=document.getElementById("tagInp");
    var oUl=document.getElementById("tag1");
    var oBtn1=document.getElementById("btn1");
    var oUl2=document.getElementById("tag2")
    oTag.addEventListener("input",ideMark,false);        //绑定监听事件，attachEvent{ 事件名，函数 }   IE独有
    var arr3=[];
    oBtn1.onclick=function(){
        disInterests();
    }

    var arr=[];

    //遇到用户输入空格，逗号，回车时
    function ideMark(){
        var a=oTag.value;
        var len= a.length;
        var oLast=a.charAt(len-1);
        var b=0;
        switch (oLast){
            case ",":addTag(a,b);  break;
            case "，":addTag(a,b);  break;
            case " ":addTag(a,b);  break;
        }
        oTag.onkeydown=function(ev){
            var oEvent=ev||event;
            var b=1;
            switch (oEvent.keyCode){
                case 13: addTag(a,b);break;
            }
        }
    }
    function addTag(tagvalue,judge){
        var oCreat=false;
        if(judge==0){
            var c=tagvalue.substring(0,tagvalue.length-1);
        }else{
            c=tagvalue;
        }

        if(c.length==0){
            oCreat=false;
        }else{
            for(var i=0;i< c.length;i++){
                if(c.charAt(i)==" "&&i!= c.length){
                    continue;
                }else{
                    oCreat=true;
                    break;
                }
            }
        }

        if(oCreat==true){
            var oLi=document.createElement("li");
            c= c.trim();
            if(arr.length==0){
                arr.push(c);
                oLi.innerHTML=c;
                oTag.value=null;
                oUl.appendChild(oLi);
            }else if(arr.length>=10){
                arr.shift();
                arr.push(c);
                oLi.innerHTML=c;
                oTag.value=null;
                oUl.removeChild(oUl.childNodes[0]);
                oUl.appendChild(oLi);
            }else{
                var d=true;
                for(var i=0;i<arr.length;i++){
                    if(c==arr[i]){
                        oTag.value=null;
                        d=false;
                        var aLi=oUl.getElementsByTagName("li");
                        var timer=setInterval(function(){                       //如果输入相同字符，则闪一下
                            aLi[i].style.border="1px solid green";
                        },500)
                        setTimeout(function(){
                            aLi[i].style.border="0";
                            clearInterval(timer);
                        },2000)
                        break;
                    }
                }
                if(d){                                                                       //如果不和arr中有一样的字符
                    arr.push(c);
                    oLi.innerHTML=c;
                    oTag.value=null;
                    oUl.appendChild(oLi);
                }
            }
        }
        var aLi=oUl.getElementsByTagName("li");
        overDel(aLi,oUl,arr);
    }

    /* 添加兴趣标签 */
    function disInterests(){
        var oDiv2=document.getElementById("div2");
        var oArea=oDiv2.getElementsByTagName("textarea")[0];
        var txt=oArea.value;
        var result=txt.replace(/\ +/g,",");  //空格用逗号代替
        result=result.replace(/[\r\n]+/g,",");  //回车换行用逗号代替
        result=result.replace(/[，]+/g,",");  //中文逗号用逗号代替
        result=result.replace(/[、]+/g,",");  //顿号用逗号代替

        oUl2.innerHTML="";              //这样可以保证第二次点击的时候清空原来的爱好
        if(result.charAt(result.length-1)==","){                    // 防止最后一个分隔出一个空兴趣标签
            result=result.substring(0,result.length-1);
        }
        /*console.log(result);*/
        var arr2=result.split(",");
        var len2=arr2.length;                   //输入框内分隔出数组 的长度

        /*var len3=oUl2.getElementsByTagName("li").length;            //当前已有的兴趣标签数,动态标签没法获取*/

        if(arr3.length==0){
            arr3.push(arr2[0]);
        }

        /* 把arr2中不重复的内容分隔开放到arr3 中   第一次点击 */
        for(var i=0;i<len2;i++){
            for(var j=0;j<arr3.length;j++){
                if(arr2[i]==arr3[j]){
                    /*arr3.splice("0","j").concat(arr3.splice("j+1",arr3.length));
                     arr3.push(arr2[i]);*/
                    break;
                }else if(arr2[i]!=arr3[j]&&j==arr3.length-1){
                    arr3.push(arr2[i]);
                }
            }
        }

        if(arr3!=""&&arr3.length<=10){
            for(var i=0;i<arr3.length;i++){
                var oLi2=document.createElement("li");
                arr3[i]=arr3[i].trim();
                oLi2.innerHTML=arr3[i];
                oUl2.appendChild(oLi2);
            }
        }else if(arr3.length>10){
            var f=arr3.length-10;
            for(var i=0;i<f;i++){
                arr3.shift();
            }
            for(var i=0;i<10;i++){
                var oLi2=document.createElement("li");
                arr3[i]=arr3[i].trim();
                oLi2.innerHTML=arr3[i];
                oUl2.appendChild(oLi2);
            }
        }
        oArea.value=null;

        var aLi2=oUl2.getElementsByTagName("li");
        overDel(aLi2,oUl2,arr3);
        console.log(aLi2.length)
    }

    function overDel(aLi,oUl,arr){
        for(var j=0;j<aLi.length;j++){
            aLi[j].index=j;
            aLi[j].onmouseover=function(){
                /*aLi[this.index].className="blue";*/                           // 此处添加class没有效果
                this.style.backgroundColor="deepskyblue";
                this.innerHTML="删除"+this.innerHTML;
            };
            aLi[j].onmouseout=function(){
                this.style.backgroundColor="orange";
                this.innerHTML=this.innerHTML.substring(2);
            };
            aLi[j].onclick=function(){
                this.innerHTML=null;
                oUl.removeChild(oUl.childNodes[this.index]);
                arr=arr.slice(0,j).concat(arr.slice(j+1,arr.length-1));
            };
        }
    }

}






