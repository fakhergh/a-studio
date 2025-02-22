import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NavBar, NavBarItemProps } from '@/components/NavBar/NavBar';

const navBarItems: Array<NavBarItemProps> = [];

describe('<NavBar/>', () => {
    it('Should match snapshot', () => {
        const rendered = render(<NavBar items={navBarItems} />);

        expect(rendered).toMatchSnapshot();
    });
});
