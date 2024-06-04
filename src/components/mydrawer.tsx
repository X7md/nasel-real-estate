import * as React from "react"
import { useStore } from '@nanostores/react';
import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { isOpen } from '../store/nanostore';
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
import { toast } from "sonner"
import { useForm } from "react-hook-form"


interface propsType {
buttonTitle?: string,
description?: string,
title?: string
}

export function MyDrawer(props: propsType) {
  const isOpen_ = useStore(isOpen);
  const open = isOpen_;
  const setOpen = isOpen.set
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
        {/* <DialogTrigger asChild>
          <Button variant="outline">{props.buttonTitle}</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-right">{props.title}</DialogTitle>
            <DialogDescription>
            {props.description}
            </DialogDescription>
          </DialogHeader>
          <ProfileForm isOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">
            {props.buttonTitle}
        </Button>
      </DrawerTrigger> */}
      <DrawerContent className="bg-white outline-none">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-right">
            {props.title}
          </DrawerTitle>
          <DrawerDescription className="text-right">
            {props.description}
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm isOpen={setOpen} className="px-4" />
        <DrawerFooter className="pt-2">
          {/* <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className, isOpen }: React.ComponentProps<"form"> & { isOpen: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = async (data: any) => {
        try {
          const req = await fetch('/interest', {
            method: 'POST',
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(data)
          }
        )
        if(req.ok){
          toast(<React.Fragment>
            <span className="bg-black rounded-lg h-full w-2 absolute right-0"></span>
            <div className="text-black absolute h-full flex justify-center items-center">
              <span>شكرًا لتسجيل اهتمامك</span>
            </div>
          </React.Fragment>, {
          position: 'bottom-right',
          duration: 2100,
          style: {
              fontFamily: 'Tajawal',
              fontWeight: "bold",
              backgroundColor: 'white',
              padding: '1.5rem',
              border: 0,
              position: 'relative'
              },
        });
        } else {
          throw new Error("not okay");
        }
        //console.log(data);
        } catch (error) {
          toast(<React.Fragment>
            <span className="bg-red-600 rounded-lg h-full w-2 absolute right-0"></span>
            <div className="text-black absolute h-full flex justify-center items-center">
              <span>حصلت مشكلة...</span>
            </div>
          </React.Fragment>, {
          position: 'bottom-right',
          duration: 2100,
          style: {
              fontFamily: 'Tajawal',
              fontWeight: "bold",
              backgroundColor: 'white',
              padding: '1.5rem',
              border: 0,
              position: 'relative'
              },
        });
        }
        isOpen(false);
       }
  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-2 items-start">
      <div className="grid gap-2">
        <Label htmlFor="firstname">الاسم الأول</Label>
        <Input {...register("firstName", { required: true })} id="firstname" className="placeholder:text-slate-400" placeholder="الاسم الأول" />
        {errors?.firstName && <p className="text-red-500 text-sm">أدخل الاسم الأول!</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="lastname">الاسم الأخير</Label>
        <Input {...register("lastName", { required: true })} id="lastname" className="placeholder:text-slate-400" placeholder="الاسم الأخير" />
        {errors?.lastName && <p className="text-red-500 text-sm">أدخل الاسم الأخير!</p>}
      </div>
      </div>
      {/* <div className="grid gap-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input type="email" id="email"
        {...register("email", { required: true })}
         className="placeholder:text-slate-400 text-right"
         dir="ltr"
         placeholder="user@example.com" />
        {errors?.email && <p className="text-red-500 text-sm">أدخل البريد!</p>}
      </div> */}
      <div className="grid gap-2">
        <Label htmlFor="phonenumber">رقم الجوال</Label>
        <Input
        {...register("tel", { required: true })}
        className="text-right placeholder:text-slate-400" dir="ltr"
        type="tel" id="phonenumber" placeholder="0510000000" />
        {errors?.tel && <p className="text-red-500 text-sm">أدخل رقم الجوال!</p>}
      </div>
      <Button type="submit" variant="outline">ارسال</Button>
    </form>
  )
}
