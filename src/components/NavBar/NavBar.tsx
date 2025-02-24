import { Link } from '@tanstack/react-router';

import { IconLogo } from '@/icons/IconLogo';

export interface NavBarItemProps {
    to: string;
    title: string;
}

export interface NavBarProps {
    currentPath?: string;
    items: Array<NavBarItemProps>;
}

export function NavBar({ items, currentPath }: NavBarProps) {
    return (
        <nav className="bg-white border-b border-b-gray-50">
            <div className="px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <IconLogo className="w-32" />
                    <div className="flex flex-1 gap-2 justify-center">
                        {items.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${item.to === currentPath ? 'underline underline-offset-3 text-yellow' : 'text-black'}`}
                                aria-current="page"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
