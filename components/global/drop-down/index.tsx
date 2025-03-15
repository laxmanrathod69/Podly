import { DropDownMenuProps } from "@/types/indexx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const GlobalDropdownMenu = ({
  trigger,
  items,
  specialItems,
  className,
}: DropDownMenuProps) => {
  const handleItemClick = (action: () => void) => action()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`outline-none ${className}`}>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit p-1 m-0 bg-black-6 rounded-md border-none cursor-default"
        side="bottom"
      >
        <DropdownMenuGroup>
          {items.map(({ id, item, action }) => (
            <DropdownMenuItem
              key={id}
              onClick={() => handleItemClick(action)}
              className="py-2.5 px-2.5 rounded-md focus:bg-black-5"
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        {specialItems?.length && (
          <DropdownMenuSeparator className="bg-black-5" />
        )}
        {specialItems?.map(({ id, item, action }) => (
          <DropdownMenuItem
            key={id}
            onClick={() => handleItemClick(action)}
            className="py-2.5 px-2.5 rounded-md focus:bg-black-5"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
