import Image from 'next/image';
import placeholder from '../../assets/placeholder.jpg';
import { Montserrat } from "next/font/google";
import SearchBar from './search-bar';

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: '700',
});

export const Header = () => {
    return ( 
        <header className="flex justify-between px-5 py-3 items-center">
            <h1 className={`${montserrat.className} text-2xl`}>Bookable.</h1>
                <div className="flex gap-4 items-center">
                    <SearchBar />

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