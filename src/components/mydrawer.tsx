import * as React from "react"

import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function MyDrawer() {
  const [open, setOpen] = React.useState(true)
  const isDesktop = import.meta.env.SSR ? false : window.matchMedia("(min-width: 768px)").matches;
  React.useEffect(()=>{
     if(!import.meta.env.SSR){
        document.querySelector<HTMLMetaElement>('[name="viewport"]')?.setAttribute("content", "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no")
     }
     return ()=>{
        if(!import.meta.env.SSR){
            document.querySelector<HTMLMetaElement>('[name="viewport"]')?.setAttribute("content", "width=device-width")
        }
     }
  })
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">سجل اهتمامك</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-right">سجل اهتمامك</DialogTitle>
            <DialogDescription>
            أدخل معلوماتك لتسجيل اهتمامك
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">سجل اهتمامك</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white outline-none">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-right">سجل اهتمامك</DrawerTitle>
          <DrawerDescription className="text-right">
            أدخل معلوماتك لتسجيل اهتمامك
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          {/* <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input type="email" id="email" placeholder="user@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">الاسم</Label>
        <Input id="name" placeholder="الاسم الأول" />
      </div>
      <Button type="submit" variant="outline">ارسال</Button>
    </form>
  )
}
