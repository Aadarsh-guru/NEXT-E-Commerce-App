import SettingsConntainer from '@/components/dashboard/settings/SettingsConntainer'
import React from 'react'

export const metadata = {
    title: 'Admin Dashboard - Settings',
    description: 'this is the Admin Dashboard settings page',
}

const Settings = () => {
    return (
        <div className="w-full h-full">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full py-4 flex items-center justify-center px-6 rounded-t-lg">
                <h4 className='text-2xl font-bold text-white'>Your Site Settings</h4>
            </div>
            <SettingsConntainer />
        </div>
    )
}

export default Settings