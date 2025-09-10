import Image from 'next/image';
import placeholder from '../../assets/placeholder.jpg';
import { Montserrat } from "next/font/google";
import { SearchBar } from './search-bar';

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: '700',
});

export const Header = () => {
    return ( 
        <div className="flex justify-between px-4 py-2 items-center border-b border-gray-200">
            <h1 className={`${montserrat.className} text-xl`}>Bookable.</h1>
                <div className="flex gap-3 items-center">
                    <SearchBar className='!hidden md:!flex' />

                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            className="w-full h-full object-cover"
                            src={placeholder}
                            width={50}
                            height={50}
                            alt="Profile placeholder"
                        />
                    </div>
                </div>
        </div>
    );
}