import { useNavigate } from 'react-router-dom'
import Search from '../globals/search'
import { Button } from '../ui/button'
import { ModeToggle } from '../ui/mode-toggle'
function Header() {
  const title = import.meta.env.VITE_TITLE ?? ''
  const navigate = useNavigate()
  return (
    <div className='flex items-center h-16 px-6 gap-2'>
      <div className='flex gap-2 cursor-pointer' onClick={() => navigate('/')}>
        <img src='/icon.svg' width={45} height={45} alt={title} />
      </div>

      {/* SEARCH */}
      <div>
        <Search />
      </div>
      {/* NAVIGATIONS */}
      <div className='flex gap-2'>
        <Button variant={'outline'} onClick={() => navigate('/browse')}>
          Browse
        </Button>
      </div>
      {/* ACCOUNT & DEVICE SETTINGS */}
      <div className='flex gap-2'>
        {/* <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'} size={'icon'}>
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hello</DropdownMenuItem>
              <DropdownMenuItem>World</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Header
