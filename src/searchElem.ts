function searchElem(selector: string, rootNode: HTMLElement) {
  const elems: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
  let checkElem = (item: HTMLElement) => {

    if (item.parentElement === rootNode) {
      return item;
    } else if (item.parentElement){
      checkElem(item.parentElement);
    }
    return item;
  };
  const check = () => {
    for (let i = 0; i < elems.length; i ++) {
      checkElem(elems[i]);
      if (checkElem(elems[i])) {
        return elems[i];
      }
    }
  }; 
  return check();
}

export default searchElem;