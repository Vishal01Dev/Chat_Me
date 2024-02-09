"use client"

import React from 'react';
import clsx from 'clsx';
import useConversation from '../hooks/useConversation';
import EmptyState from '../components/EmptyState';

const Page: React.FC = (props) => {
    const { isOpen } = useConversation();

    return (
        <div className={clsx('lg:pl-[350px] h-full lg:block', isOpen ? 'block' : 'hidden')}>
            <EmptyState />
        </div>
    );
};

Page.displayName = 'Page';

export default Page;
