/* Переключатель стиля: «blue» (по умолчанию) или «bold» (кирпичный акцент на белом).
   Атрибут html[data-style="bold"] ставится ещё в <head> коротким скриптом, чтобы страница
   не мигала синим при переходах. Здесь только кнопки и синхронизация между вкладками. */
(function(){
  var KEY='cv-style', root=document.documentElement;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  function read(){try{return localStorage.getItem(KEY)==='bold'?'bold':'blue'}catch(e){return 'blue'}}
  function apply(v){
    if(v==='bold') root.setAttribute('data-style','bold'); else root.removeAttribute('data-style');
    var bs=document.querySelectorAll('[data-style-set]');
    for(var i=0;i<bs.length;i++) bs[i].setAttribute('aria-pressed',String(bs[i].getAttribute('data-style-set')===v));
  }
  function set(v){
    try{localStorage.setItem(KEY,v)}catch(e){}
    if(!reduce){root.classList.add('ss-anim');clearTimeout(set.t);set.t=setTimeout(function(){root.classList.remove('ss-anim')},450)}
    apply(v);
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-style-set]');
    if(b) set(b.getAttribute('data-style-set'));
  });
  addEventListener('storage',function(e){if(e.key===KEY) apply(read())});
  addEventListener('pageshow',function(){apply(read())});
  apply(read());
})();
