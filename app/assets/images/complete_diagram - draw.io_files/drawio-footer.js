Draw.loadPlugin(function(ui){var basicAds=['<a title="'+ mxResources.get('loveIt',['draw.io'])+'" target="_blank" href="https://twitter.com/intent/tweet?text='+
encodeURIComponent(mxResources.get('loveIt',['www.draw.io']))+'" onclick="javascript:window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,'+'left=\'+((screen.width-640)/2)+\',top=\'+((screen.height-280)/3)+\',height=280,width=640\');return false;"\'>'+'<img border="0" align="absmiddle" width="18" height="18" style="margin-top:-2px;padding-right:8px;" src="'+
Editor.tweetImage+'"/>'+ mxResources.get('loveIt',['draw.io'])+'</a>','<a title="Share on Facebook" target="_blank" href="https://www.facebook.com/sharer.php?u='+
encodeURIComponent('https://www.draw.io')+'" onclick="javascript:window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,'+'left=\'+((screen.width-640)/2)+\',top=\'+((screen.height-520)/3)+\',height=520,width=640\');return false;"\'>'+'<img border="0" align="absmiddle" width="18" height="18" style="margin-top:-2px;padding-right:8px;" src="'+
Editor.facebookImage+'"/>Share on Facebook</a>','<a title="draw.io Offline" href="https://www.draw.io/app" target="_blank">'+'<img border="0" align="absmiddle" style="margin-top:-1px;padding-right:8px;" src="images/download.png"/>'+'draw.io Offline</a>'];var rotate=mxUtils.bind(this,function(elt,html,delay,fn)
{delay=(delay!=null)?delay:500;mxUtils.setPrefixedStyle(elt.style,'transition','all '+(delay/1000)+'s ease');mxUtils.setPrefixedStyle(elt.style,'transform','scale(0)');elt.style.visibility='visible';elt.style.opacity='0';window.setTimeout(function()
{elt.innerHTML=html;mxUtils.setPrefixedStyle(elt.style,'transform','scale(1)');elt.style.opacity='1';if(fn!=null)
{fn();}},delay);});var td2=document.getElementById('geFooterItem1');if(td2!=null)
{td2.innerHTML='<a id="geFooterLink1" title="#1 Rated Confluence Add-on" target="_blank" '+'href="https://about.draw.io/integrations/confluence-integration/">'+'<img border="0" width="24" height="24" align="absmiddle" style="padding-right:10px;"'+'src="images/logo-confluence.png"/>#1 Rated Confluence App</a>';}
var td=document.getElementById('geFooterItem2');if(td!=null&&mxClient.IS_SVG)
{var last=[td.innerHTML];if(mxSettings.getOpenCounter()>10&&urlParams['embed']!='1')
{last.push('<a title="'+ mxResources.get('loveIt',['draw.io'])+'" target="_blank" href="https://twitter.com/intent/tweet?text='+
encodeURIComponent(mxResources.get('loveIt',['www.draw.io']))+'" onclick="javascript:window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,'+'left=\'+((screen.width-640)/2)+\',top=\'+((screen.height-280)/3)+\',height=280,width=640\');return false;"\'>'+'<img border="0" align="absmiddle" width="18" height="18" style="margin-top:-2px;padding-right:8px;" src="'+
Editor.tweetImage+'"/>'+ mxResources.get('loveIt',['draw.io'])+'</a>')}
rotate(td,'<a title="Collaborate on diagrams in Samepage" target="_blank" '+
((mxClient.IS_SF)?'style="margin-top:-22px;" ':'')+'href="https://www.samepage.io/draw-diagram-online?SPcid=SIOF%2BDraw%2Breferral%2BDraw%2Bv1%2BNA"\>'+'<img border="0" align="absmiddle" width="24" height="24" style="margin-top:-2px;padding-right:8px;" '+'src="'+ IMAGE_PATH+'/samepage-icon-color.svg"/>Collaborate on diagrams in Samepage</a>')
mxEvent.addListener(td,'click',function()
{if(last.length>0)
{rotate(td,last.pop());}});var userChanged=function()
{var user=ui.drive.getUser();if(user!=null&&user.email!=null&&user.email.substring(user.email.length- 10)=='@gmail.com')
{last.push(td.innerHTML);window.setTimeout(function()
{rotate(td,'<a title="Please help us to 5 stars" href="https://chrome.google.com/webstore/detail/drawio-pro/onlkggianjhjenigcpigpjehhpplldkc/reviews" target="_blank">'+'<img border="0" align="absmiddle" style="margin-top:-4px;" src="images/glyphicons_star.png"/>&nbsp;&nbsp;Please help us to 5 stars</a>');},5000);}};var install=function()
{if(ui.drive!=null)
{if(ui.drive.getUser()!=null)
{userChanged();}
else
{ui.drive.addListener('userChanged',userChanged);}}};if(ui.drive!=null)
{install();}
else
{ui.addListener('clientLoaded',install);}}});