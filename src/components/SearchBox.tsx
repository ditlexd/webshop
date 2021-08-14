import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchBox = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    return (
        <div className="flex flex-col justify-evenly gap-1">
            <div className="bg-red shadow-xl w-100">
                <form
                    onSubmit={() => {
                        router.push({
                            pathname: '/products/search',
                            query: { searchQuery, page: '1' },
                        });
                    }}
                >
                    <input
                        className="py-4 px-6 text-gray-700"
                        id="search"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
};

export default SearchBox;
