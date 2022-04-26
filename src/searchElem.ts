function searchElem(selector: string, rootNode: HTMLElement) {
  const elems: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
  let target: HTMLElement | null;
  let checkElem = (item: HTMLElement) => {

    if (item === rootNode) {
      target = item;
      return;
    } 
    
    if (item.parentElement){
      checkElem(item.parentElement);
    }

    if (!item.parentElement){
      target = item.parentElement;
      return;
    }
    return target;
  };
  const check = () => {
    for (let i = 0; i < elems.length; i += 1) {
      const newElem = checkElem(elems[i]);
      if (newElem) {
        return elems[i];
      }
    }
  }; 
  return check();
}

export default searchElem;