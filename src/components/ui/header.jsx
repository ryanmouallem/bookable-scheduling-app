import { Search } from 'lucide-react';
import Image from 'next/image';
import placeholder from '../../assets/placeholder.jpg';
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: '600',
});

export const Header = () => {
    return ( 
        <header className="flex justify-between p-5">
            <h1 className={`${montserrat.className} text-2xl`}>Bookable.</h1>

            <div className="flex gap-4 items-center">

                {/* TODO: Have to implement click search icon to open search */}

                {/* <input 
                    className='rounded-full p-3'
                    placeholder='lookup'

                />
                <Search className='h-12 w-12 stroke-gray-500'/> */}

                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                        className="w-full h-full object-cover"
                        src={placeholder}
                        width={50}
                        height={50}
                        alt="Profile placeholder"
                    />
                </div>
            </div>
        </header>
    );
}