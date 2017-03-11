
function ShowDialog(id,vTopOffset)
{
   if(typeof arguments[1] == "undefined")
     vTopOffset = 90;
     
   var bb=(document.compatMode && document.compatMode!="BackCompat") ? document.documentElement : document.body;
   $Y("overlay").style.width = Math.max(parseInt(bb.scrollWidth),parseInt(bb.offsetWidth))+"px";
   $Y("overlay").style.height = Math.max(parseInt(bb.scrollHeight),parseInt(bb.offsetHeight))+"px";

   $Y("overlay").style.display = 'block';
   $Y(id).style.display = 'block';

   $Y(id).style.left = ((bb.offsetWidth - $Y(id).offsetWidth)/2)+"px";
   $Y(id).style.top  = (vTopOffset + bb.scrollTop)+"px";
}
function HideDialog(id)
{
   $Y("overlay").style.display = 'none';
   $Y(id).style.display = 'none';
}