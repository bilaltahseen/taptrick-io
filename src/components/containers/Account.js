'use client';

import { saveAll, savePageButtons, savePageLinks, savePageSettings } from '@/actions/pageActions';
import React, { useEffect, useState } from 'react'
import PageSettingsForm from '../forms/PageSettingsForm';
import PageButtonsForm from '../forms/PageButtonsForm';
import PageLinksForm from '../forms/PageLinksForm';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import SubmitButton from '../buttons/SubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import Link from 'next/link';

const AccountContainer = ({ page, user }) => {
    const [links, setLinks] = useState(page.links || []);
    const [isIconLoading, setIsIconLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsIconLoading(false);
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(timeoutId);
    }, []);

    async function savePage(formData) {

        try {
            const result = await saveAll(formData, links);

            if (result) {
                toast.success('Saved!');
            }

        } catch (error) {
            toast.error('Failed to save');
        }

    }

    return (
        <form action={savePage}>
            <PageSettingsForm page={page} user={user} />
            <PageButtonsForm page={page} user={user} />
            <PageLinksForm page={page} user={user} links={links} setLinks={setLinks} />
            <div className="max-w-[200px] mx-auto mt-8 max-w-xs mb-4">
                <SubmitButton>
                    {isIconLoading ? (
                        <div className="animate-pulse bg-gray-400 w-4 h-4 rounded-full" />
                    ) : (
                        <FontAwesomeIcon icon={faSave} className='h-4' />
                    )}
                    <span>Save</span>
                </SubmitButton>
            </div>
            <div className="flex flex-col items-center justify-center mb-2 underline">
                <Link target="_blank" className="font-semibold" href={"/" + page.uri}>/{page.uri}</Link>
            </div>
        </form>
    )
}

export default AccountContainer