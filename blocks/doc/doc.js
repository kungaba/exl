

export default async function decorate(block) {
  const ref = block.textContent.trim();
  let path = new URL(window.location.href).hash.split("#")[1];
  path = "http://localhost:8081/api/md2html" + path;
  const resp = await fetch(`${path}`);
  if (resp.ok) {
    const main = document.createElement('main');
    main.innerHTML = await resp.text();
    //decorateMain(main);
    //await loadBlocks(main);
    const blockSection = block.closest('.section');
    const fragmentSection = main.querySelector(':scope .section');
    while (fragmentSection && fragmentSection.firstChild) {
      blockSection.insertBefore(fragmentSection.firstChild, block.closest('.fragment-wrapper'));
    }

    const metadata = document.querySelector('#metadata');
    const head = document.getElementsByTagName('head');
    let title = document.querySelector('title');
    title.innerText = metadata.dataset.title
    let meta = document.createElement('meta');
    meta.name = "description";
    meta.content = metadata.dataset.description;
    head[0].appendChild(meta);


  }
  block.closest('.doc').remove();
}
