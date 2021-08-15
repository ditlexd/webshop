import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchBox = (): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    async function onSubmit() {
        await router.push({
            pathname: '/products/search',
            query: { searchQuery, page: '1' },
        });
    }

    return (
        <div className="ml-20 mt-10">
            <form onSubmit={onSubmit}>
                <input
                    className="py-4 px-6 text-gray-700 border-2 border-black"
                    id="search"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>
        </div>
    );
};

export default SearchBox;
