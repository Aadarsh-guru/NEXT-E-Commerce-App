import { MdGridView, MdOutlineAddShoppingCart, MdOutlineAdminPanelSettings, MdOutlineList, MdOutlineLocalShipping, MdOutlineProductionQuantityLimits, MdOutlineSettings, MdPeopleOutline } from 'react-icons/md'

export const AdminDashboardData = [
    {
        title: 'Overview',
        icon: MdGridView,
        url: '/dashboard'
    },
    {
        title: 'Users',
        icon: MdPeopleOutline,
        url: '/dashboard/users'
    },
    {
        title: 'Admins',
        icon: MdOutlineAdminPanelSettings,
        url: '/dashboard/admins'
    },
    {
        title: 'Orders',
        icon: MdOutlineLocalShipping,
        url: '/dashboard/orders'
    },
    {
        title: 'Products',
        icon: MdOutlineProductionQuantityLimits,
        url: '/dashboard/products'
    },
    {
        title: 'Create Product',
        icon: MdOutlineAddShoppingCart,
        url: '/dashboard/create-product'
    },
    {
        title: 'Categories',
        icon: MdOutlineList,
        url: '/dashboard/categories'
    },
    {
        title: 'Site Settings',
        icon: MdOutlineSettings,
        url: '/dashboard/settings'
    },
];