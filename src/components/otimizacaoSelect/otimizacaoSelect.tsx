import { GroupBase, MenuListProps } from "react-select";
import { FixedSizeList } from "react-window";

interface TYPE_OBJETO_SELECT{
    value: string;
    label: string;
}

const MENU_LIST_ITEM_HEIGHT = 35;
const MENU_LIST_ITEM_HEIGHT_2 = 50;

export function MenuList({ options, getValue, maxHeight, children , cx }: MenuListProps<TYPE_OBJETO_SELECT, false, GroupBase<TYPE_OBJETO_SELECT>>){

    if (!Array.isArray(children)) {
      return null;
    }
  
    const [selectedOption] = getValue();
    const initialScrollOffset = options.indexOf(selectedOption) * MENU_LIST_ITEM_HEIGHT;
  
    return (

      <FixedSizeList
        width="auto"
        height={maxHeight}
        itemCount={children.length}
        itemSize={MENU_LIST_ITEM_HEIGHT}
        initialScrollOffset={initialScrollOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </FixedSizeList>

    );
}

export function MenuList2({ options, getValue, maxHeight, children}: MenuListProps<TYPE_OBJETO_SELECT, false, GroupBase<TYPE_OBJETO_SELECT>>){

  if (!Array.isArray(children)) {
    return null;
  }

  const [selectedOption] = getValue();
  const initialScrollOffset = options.indexOf(selectedOption) * MENU_LIST_ITEM_HEIGHT;

  return (

    <FixedSizeList
      width="auto"
      height={maxHeight}
      itemCount={children.length}
      itemSize={MENU_LIST_ITEM_HEIGHT_2}
      initialScrollOffset={initialScrollOffset}
      className="option-react-select"
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </FixedSizeList>

  );
}

export function MenuListMulti({ options, getValue, maxHeight, children}: MenuListProps<TYPE_OBJETO_SELECT, true, GroupBase<TYPE_OBJETO_SELECT>>){

  if (!Array.isArray(children)) {
    return null;
  }

  const [selectedOption] = getValue();
  const initialScrollOffset = options.indexOf(selectedOption) * MENU_LIST_ITEM_HEIGHT;

  return (

    <FixedSizeList
      width="auto"
      height={maxHeight}
      itemCount={children.length}
      itemSize={MENU_LIST_ITEM_HEIGHT}
      initialScrollOffset={initialScrollOffset}
      className="option-react-select"
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </FixedSizeList>

  );
}
