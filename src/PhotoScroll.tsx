import { useEffect, useRef } from "react";

const ITEM_WIDTH = 250;
const ITEM_HEIGHT = 300;
const PADDING_X = 10;

const PhotoScroll = (props:{imageData:string[]}) => {
  
  // Instance variable to save current selected photo
  const selectedIndex = useRef(-1);

  // Reference to gallery container
  const el = useRef<HTMLDivElement>(null);

  // Apply select effect on item
  const doSelect = (targetIndex:number) => {

    const children = el.current!.children;

    if (selectedIndex.current !== -1) {
      const currentEl = children[selectedIndex.current] as HTMLDivElement;
      currentEl.style.transform = 'scale(1)';
      currentEl.style.zIndex = '0';
    }

    const targetEl = children[targetIndex] as HTMLDivElement;
    if (!targetEl) return;
    targetEl.style.transform = 'scale(1.75)';
    targetEl.style.zIndex = '999';
    selectedIndex.current = targetIndex;

    // Update container position
    const theWidth = ITEM_WIDTH + PADDING_X;
    el.current!.style.transform = `translateX(calc(50% - ${theWidth * targetIndex + theWidth * 0.5}px))`
  }

  useEffect(() => {
    doSelect(0);
  });

  // Render the items
  const renderedList = props.imageData.map((it, index) => (
    <div 
      className="absolute sahdotransition-all duration-700 top-48 ease-out origin-center rounded-lg bg-no-repeat bg-contain bg-center my-2 cursor-pointer" 
      key={index} 
      onClick={e => doSelect(index)}
      style={
        { width:ITEM_WIDTH, 
          height:ITEM_HEIGHT, 
          boxShadow:'2px 10px 77px -6px rgba(0,0,0,0.85)',
          left:(ITEM_WIDTH + PADDING_X) * index,
          backgroundImage:`url(${it})`
      }}/>
  ))

  return (
    <div className="relative transition-all duration-700 w-screen h-full my-4" ref={el}>
      {renderedList}
    </div>
  )
}

export default PhotoScroll
