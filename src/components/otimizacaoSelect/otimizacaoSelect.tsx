import { GroupBase, MenuListProps } from "react-select";
import { FixedSizeList } from "react-window";

interface TYPE_OBJETO_SELECT{
    value: string;
    label: string;
}

const MENU_LIST_ITEM_HEIGHT = 35;

export function MenuList({ maxHeight, children }: MenuListProps<TYPE_OBJETO_SELECT, false, GroupBase<TYPE_OBJETO_SELECT>>){

    if (!Array.isArray(children)) {
      return null;
    }
  
    // const initialScrollOffset = options.indexOf(selectedOption) * MENU_LIST_ITEM_HEIGHT;
  
    return (

      <FixedSizeList
        width="auto"
        height={maxHeight}
        itemCount={children.length}
        itemSize={MENU_LIST_ITEM_HEIGHT}
        // initialScrollOffset={initialScrollOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </FixedSizeList>

    );
}