import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
  } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { CameraIcon, FileIcon, KeyIcon, LogoutIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
  export function AppSidebar() {
    const navigate = useNavigate()
    const { setOpenMobile } = useSidebar()
    const menuItems = [
        { title: "Registra Copie ", url: "/", icon: CameraIcon },
        { title: "Gestione Docenti", url: "/gestione-docenti", icon: FileIcon },
        { title: "Gestione Utenze", url: "/gestione-utenze", icon: KeyIcon },
    ]
    const handleLogout = () => {
        navigate('/login')
    }
    return (
      <Sidebar  >
        <SidebarHeader className="bg-sidebar-primary">
            
        <SidebarGroup>
            <SidebarGroupLabel className="">
                <h1 className="text-xl  font-bold whitespace-nowrap text-sidebar-accent ">Registro Fotocopie</h1> 
            </SidebarGroupLabel>
        </SidebarGroup>    
        </SidebarHeader>
        <SidebarContent className="bg-sidebar-primary">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <Link to={item.url} className="" onClick={() => setOpenMobile(false)}>
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton  className="rounded-none h-12 text-sidebar-border hover:text-primary w-full justify-between gap-2 " >
                      
                        <p className="font-semibold">{item.title}</p>
                        <HugeiconsIcon icon={item.icon} strokeWidth={2}  />
                    
                    </SidebarMenuButton>
                </SidebarMenuItem>
                  </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="bg-sidebar-primary">
            <SidebarGroup>
                <SidebarGroupLabel className="flex items-center gap-2">
                    <Button variant="secondary" className="w-full" onClick={() => handleLogout()}>
                        <HugeiconsIcon icon={LogoutIcon} className="" />
                        Esci
                    </Button>
                </SidebarGroupLabel>
               
            </SidebarGroup>
        </SidebarFooter>
      </Sidebar>
    )
  }