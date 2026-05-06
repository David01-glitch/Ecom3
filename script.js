// Mobile menu
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.menu-btn');
  const ul=document.querySelector('nav ul');
  if(btn) btn.addEventListener('click',()=>ul.classList.toggle('open'));

  // Read more / read less inline expand
  document.querySelectorAll('.read-more').forEach(b=>{
    b.addEventListener('click',()=>{
      const card=b.closest('.article');
      const full=card.querySelector('.full');
      const open=full.classList.toggle('open');
      b.textContent=open?'Read Less ←':'Read More →';
    });
  });

  // Contact form
  const form=document.querySelector('form.contact');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      showToast('✓ Message sent! We\'ll reply within 2 hours.');
      form.reset();
    });
  }

  // Add to cart toast
  document.querySelectorAll('.add').forEach(b=>{
    b.addEventListener('click',()=>{
      const card=b.closest('.card');
      const name=card?.querySelector('h3')?.textContent || 'Item';
      showToast('🛒 '+name+' added to cart');
    });
  });

  // Filter products on categories page
  const filterBtns=document.querySelectorAll('.filter-btn');
  if(filterBtns.length){
    const applyFilter=(cat)=>{
      filterBtns.forEach(b=>b.classList.toggle('active',b.dataset.cat===cat));
      document.querySelectorAll('.card[data-cat]').forEach(c=>{
        c.style.display=(cat==='all'||c.dataset.cat===cat)?'flex':'none';
      });
    };
    filterBtns.forEach(b=>b.addEventListener('click',()=>applyFilter(b.dataset.cat)));
    // honor URL hash like #phones
    const hash=location.hash.replace('#','');
    if(hash) applyFilter(hash); else applyFilter('all');
  }
});

function showToast(msg){
  let t=document.querySelector('.toast');
  if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'),2200);
}
