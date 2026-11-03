/* Настройки сайта: цвет «blue» (по умолчанию) или «bold» (кирпич) и тема «auto» / «light» / «dark».
   html[data-style="bold"] и html[data-theme="light|dark"] ставятся ещё в <head> коротким скриптом,
   чтобы страница не мигала при переходах. Здесь панель, кнопки и синхронизация между вкладками. */
(function(){
  var root=document.documentElement;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var OPTS={style:{key:'cv-style',attr:'data-style',def:'blue',vals:['blue','bold']},
            theme:{key:'cv-theme',attr:'data-theme',def:'auto',vals:['auto','light','dark']}};
  function read(o){try{var v=localStorage.getItem(o.key);return o.vals.indexOf(v)>-1?v:o.def}catch(e){return o.def}}
  function current(o){var v=root.getAttribute(o.attr);return v||o.def}
  function apply(name,v){
    var o=OPTS[name];
    if(v===o.def) root.removeAttribute(o.attr); else root.setAttribute(o.attr,v);
    var bs=document.querySelectorAll('[data-set-'+name+']');
    for(var i=0;i<bs.length;i++) bs[i].setAttribute('aria-pressed',String(bs[i].getAttribute('data-set-'+name)===v));
  }
  function set(name,v){
    try{localStorage.setItem(OPTS[name].key,v)}catch(e){}
    if(!reduce){root.classList.add('ss-anim');clearTimeout(set.t);set.t=setTimeout(function(){root.classList.remove('ss-anim')},450)}
    apply(name,v);
  }
  function syncAll(){for(var n in OPTS) apply(n,read(OPTS[n]))}

  var box=document.querySelector('.settings'), btn=box&&box.querySelector('.settings-btn'), panel=box&&box.querySelector('.settings-panel');
  function toggle(open){
    if(!btn) return;
    if(open===undefined) open=panel.hidden;
    panel.hidden=!open; btn.setAttribute('aria-expanded',String(open));
  }
  document.addEventListener('click',function(e){
    var t=e.target;
    if(!t.closest) return;
    var s=t.closest('[data-set-style]'); if(s){set('style',s.getAttribute('data-set-style'));return}
    var th=t.closest('[data-set-theme]'); if(th){set('theme',th.getAttribute('data-set-theme'));return}
    if(btn&&t.closest('.settings-btn')){toggle();return}
    if(box&&!t.closest('.settings')) toggle(false);
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&panel&&!panel.hidden){toggle(false);btn.focus()}
  });
  addEventListener('storage',function(e){if(e.key==='cv-style'||e.key==='cv-theme') syncAll()});
  addEventListener('pageshow',syncAll);
  syncAll();
})();
