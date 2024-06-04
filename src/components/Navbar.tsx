import { useState } from "react"

export function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-white w-full sticky top-0 z-[15] text-black min-h-12 py-3">
				<div className="flex flex-col justify-center items-center">
					<a href="/">
						<img className="m-2 lg:min-h-[75px]" src="logo-nasel.svg" alt="logo" />
					</a>
					<div className="px-3 flex">
						<ul className="flex gap-3.5 text-sm lg:text-base">
                            <li className="font-medium hover:underline"><a href="#about">من نحن</a></li>
							<li className="font-medium hover:underline"><a href="#projects">المشاريع</a></li>
							<li className="font-medium hover:underline"><a href="#get-touch">تواصل معنا</a></li>
						</ul>
					</div>
					{/* <button onClick={()=> setIsOpen(state => !state)} className="m-3 block lg:hidden md:hidden">
						{
                            !isOpen ? (<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M4 6h24v2H4zm0 18h24v2H4zm0-12h24v2H4zm0 6h24v2H4z"/>
                            </svg>) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 32 32">
                                    <path fill="currentColor" d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"/>
                                </svg>
                            )
                        }  
					</button>
                    {
                        isOpen && (
                        <div className="w-full min-h-[100px] bg-white absolute top-16 z-10">
                            <ul className="flex flex-col text-sm gap-3 p-3" >
                                <li className="font-medium"><a href="/projects">المشاريع</a></li>
                                <li className="font-medium"><a href="/#">من نحن</a></li>
                                <li className="font-medium"><a href="/#">تواصل معنا</a></li>
                            </ul>
                        </div>
                        )
                    } */}
				</div>
			</nav>
    )
}