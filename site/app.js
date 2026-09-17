(() => {
  document.documentElement.classList.add('js');
  const $ = selector => document.querySelector(selector);
  let toastTimer;
  function notify(message) {
    const toast = $('#toast'); toast.textContent = message; toast.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
  }
  const journey = $('#workflow');
  if (journey) {
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        journey.classList.add('is-visible');
        observer.disconnect();
      }, { threshold: .12 });
      observer.observe(journey);
    } else {
      journey.classList.add('is-visible');
    }
  }
  const zipDialog = $('#zip-preview');
  const zipOpenButton = $('#open-zip-preview');
  const zipCloseButton = $('#close-zip-preview');
  zipOpenButton?.addEventListener('click', () => {
    zipDialog.showModal();
    document.body.classList.add('zip-open');
  });
  zipCloseButton?.addEventListener('click', () => zipDialog.close());
  zipDialog?.addEventListener('click', event => { if (event.target === zipDialog) zipDialog.close(); });
  zipDialog?.addEventListener('close', () => {
    document.body.classList.remove('zip-open');
    zipOpenButton?.focus();
  });
  $('#zip-to-agent')?.addEventListener('click', () => zipDialog.close());
  $('#copy-address').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('chrome://extensions');notify('已复制，在 Chrome 地址栏粘贴后打开');}catch{$('#copy-address span').textContent='请选中左侧地址复制';notify('请手动复制：chrome://extensions');}});
  $('#copy-agent-prompt').addEventListener('click',async()=>{
    const prompt=$('#agent-prompt-text');
    try{await navigator.clipboard.writeText(prompt.textContent.trim());notify('提示词已复制，请将走查 ZIP 一起交给 Agent');}
    catch{notify('浏览器未允许自动复制，请从 GitHub 文档中复制 Agent 提示词');}
  });
})();
