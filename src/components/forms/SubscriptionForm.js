'use client';

import React, { useEffect, useState } from 'react'
import SectionBox from '../layout/SectionBox'
import SubmitButton from '../buttons/SubmitButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const SubscriptionForm = ({ user }) => {
    const [isIconLoading, setIsIconLoading] = useState(true);
    
    const router = useRouter();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsIconLoading(false);
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(timeoutId);
    }, []);



    const handleCancelSubscription = async () => {

        try {
            const result = await fetch('/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = await result.json()

            if (result.ok) {
                toast.success('Subscription canceled');
                signOut();
                router.push('/login');
            }

        } catch (error) {
            toast.error('Failed to cancel subscription');
        }

    }


    return (
        <div>
            <form action={handleCancelSubscription}>
                <SectionBox>
                    <h2 className="text-2xl font-bold mb-4">Subscription</h2>
                    <div className="p-0">
                        <label className="input-label" htmlFor="nameIn">Email</label>
                        <p>{user.email}</p>
                    </div>
                    <div className="p-0">
                        <label className="input-label" htmlFor="nameIn">Plan</label>
                        <p>£2 / month</p>
                    </div>
                    <div className="p-0">
                        <label className="input-label" htmlFor="nameIn">Status</label>
                        <p>Active</p>
                    </div>
                    <div className="max-w-[200px] mx-auto mt-8 max-w-xs mb-8">
                        <SubmitButton loadingText='Canceling...'>
                            {isIconLoading ? (
                                <div className="animate-pulse bg-gray-400 w-4 h-4 rounded-full" />
                            ) : (
                                <FontAwesomeIcon icon={faCancel} className='h-4' />
                            )}
                            <span>Cancel Subscription</span>
                        </SubmitButton>
                    </div>
                    <small className="text-gray-400 font-semibold"><span className='text-red-400'>Canceling your subscription</span> will result in the permanent deletion of your account, including all user data and any pages you have created. This action is irreversible, and once canceled, your account and pages cannot be recovered. Please ensure you have backed up any necessary information before proceeding.</small>
                </SectionBox>
            </form>
        </div>
    )
}

export default SubscriptionForm