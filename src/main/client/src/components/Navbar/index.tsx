import slipstreamLogo from "/src/assets/images/slipstreamLogoWhite.png";
import {Fragment, useEffect, useState} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {getUserFromLocalStorage, logout} from "../../services/auth.service";
import IUser from "../../types/user.type.ts";

const navigation = [
    {name: "Home", href: "home", current: true},
    {name: "Register", href: "register", current: false},
    {name: "Login", href: "login", current: false},
    {name: "Dashboard", href: "dashboard", current: false},
    {name: "Admin", href: "admin", current: false},
    {name: "Log Out", href: "logout", current: false},
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function dropdownName(user: IUser | null | undefined) {
    if (user != null) {
        return user.username;
    } else {
        return "Profile";
    }
}

export default function Navbar() {
    const [currentUser, setCurrentUser]
        = useState<IUser | undefined>();

    useEffect(() => {
        const user = getUserFromLocalStorage();
        if (user) {
            setCurrentUser(user);
            // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);


    const logOut = () => {
        logout(currentUser?.id);
        // setShowModeratorBoard(false);
        // setShowAdminBoard(false);
        // setCurrentUser(undefined);
    };

    return (
        <Disclosure as="nav" className="bg-black">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-black-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src={slipstreamLogo}
                                        alt="Slipstream Logo"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-black-900 text-white"
                                                        : "text-black-300 hover:bg-black-700 hover:text-white",
                                                    "rounded-md px-3 py-2 text-sm font-medium"
                                                )}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button
                                            className="btn btn-dropdown flex rounded-full bg-black-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black-800 p-1">
                                            <span className="sr-only">Open user menu</span>
                                            <span>{dropdownName(currentUser)}</span>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? "bg-black-100" : "",
                                                            "block px-4 py-2 text-sm text-black-700"
                                                        )}
                                                    >Dashboard</a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? "bg-black-100" : "",
                                                            "block px-4 py-2 text-sm text-black-700"
                                                        )}
                                                    >Change Password</a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href="/home"
                                                        onClick={logOut}
                                                        // onClick={() => [recordLogout, logOut]}
                                                        className={classNames(
                                                            active ? "bg-black-100" : "",
                                                            "block px-4 py-2 text-sm text-black-700"
                                                        )}
                                                    >Log out</a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-black-900 text-white"
                                            : "text-black-300 hover:bg-black-700 hover:text-white",
                                        "block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

const Navbar2 = () => {
    return (
        <>
            {/*<div>*/}
            {/*    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-black">*/}
            {/*        <div className="container-fluid nav">*/}
            {/*            <button aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"*/}
            {/*                    className="navbar-toggler"*/}
            {/*                    data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse" type="button">*/}
            {/*                <span className="navbar-toggler-icon"></span>*/}
            {/*            </button>*/}
            {/*            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">*/}
            {/*                <div className="navbar-nav mx-auto">*/}
            {/*                    <a className="navbar-brand" href="/">*/}
            {/*                        <img alt="Slipstream logo" src="src/resources/static/images/slipstreamLogoWhite.png"*/}
            {/*                             className="h-10 w-40">*/}
            {/*                            /!*className="height: 60px; width: 300px;">*!/*/}
            {/*                        </img>*/}
            {/*                    </a>*/}
            {/*                    <a className="nav-item nav-link active" href="/home">Home</a>*/}
            {/*                    <div>*/}
            {/*                        <a className="nav-item nav-link" href="/admin">Admin</a>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        <a className="nav-item nav-link" href="/dashboard">Dashboard</a>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        <a className="nav-item nav-link" href="/register">Register</a>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        <a className="nav-item nav-link" href="/login">Login</a>*/}
            {/*                    </div>*/}
            {/*                    <div>*/}
            {/*                        <a className="nav-item nav-link" href="/confirm_logout">Logout</a>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </nav>*/}
            {/*</div>*/}
            <div>
                <nav className="bg-black-800">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/*Mobile menu button*/}
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-black-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {/*Icon when menu is closed.*/}
                                    {/*Menu open: "hidden", Menu closed: "block"*/}
                                    <svg
                                        className="block h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                        />
                                    </svg>
                                    {/*Icon when menu is open.*/}
                                    {/*Menu open: "block", Menu closed: "hidden"*/}
                                    <svg
                                        className="hidden h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src={slipstreamLogo}
                                        alt="Slipstream Logo"
                                    ></img>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {/*Current: "bg-black-900 text-white", Default: "text-black-300 hover:bg-black-700 hover:text-white"*/}
                                        <a
                                            href="#"
                                            className="bg-black-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                            aria-current="page"
                                        >
                                            Dashboard
                                        </a>
                                        <a
                                            href="#"
                                            className="text-black-300 hover:bg-black-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Admin
                                        </a>
                                        <a
                                            href="#"
                                            className="text-black-300 hover:bg-black-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Register
                                        </a>
                                        <a
                                            href="#"
                                            className="text-black-300 hover:bg-black-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Login
                                        </a>
                                        <a
                                            href="#"
                                            className="text-black-300 hover:bg-black-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                        >
                                            Log Out
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/*<button type="button"*/}
                                {/*        className="rounded-full bg-black-800 p-1 text-black-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black-800">*/}
                                {/*    <span className="sr-only">View notifications</span>*/}
                                {/*    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"*/}
                                {/*         stroke="currentColor" aria-hidden="true">*/}
                                {/*        <path stroke-linecap="round" stroke-linejoin="round"*/}
                                {/*              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>*/}
                                {/*    </svg>*/}
                                {/*</button>*/}
                                {/*Profile dropdown */}
                                <div className="relative ml-3">
                                    <div>
                                        <button
                                            type="button"
                                            className="flex rounded-full bg-black-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black-800"
                                            id="user-menu-button"
                                            aria-expanded="false"
                                            aria-haspopup="true"
                                        >
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={slipstreamLogo}
                                                alt=""
                                            ></img>
                                        </button>
                                    </div>
                                    {/*Dropdown menu, show/hide based on menu state.*/}
                                    {/*Entering: "transition ease-out duration-100"*/}
                                    {/*  From: "transform opacity-0 scale-95"*/}
                                    {/*  To: "transform opacity-100 scale-100"*/}
                                    {/*Leaving: "transition ease-in duration-75"*/}
                                    {/*  From: "transform opacity-100 scale-100"*/}
                                    {/*  To: "transform opacity-0 scale-95"*/}
                                    <div
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                        tabIndex={-1}
                                    >
                                        {/*Active: "bg-black-100", Not Active: ""*/}
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-black-700"
                                            role="menuitem"
                                            tabIndex={-1} id="user-menu-item-0"
                                        >
                                            Your Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-black-700"
                                            role="menuitem"
                                            tabIndex={-1} id="user-menu-item-1"
                                        >
                                            Settings
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-black-700"
                                            role="menuitem"
                                            tabIndex={-1} id="user-menu-item-2"
                                        >
                                            Sign out
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Mobile menu, show/hide based on menu state.*/}
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/*Current: "bg-black-900 text-white", Default: "text-black-300 hover:bg-black-700 hover:text-white"*/}
                            <a
                                href="#"
                                className="bg-black-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                                aria-current="page"
                            >Dashboard</a>
                            <a
                                href="#"
                                className="text-black-300 hover:bg-black-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >Admin</a>
                            <a
                                href="#"
                                className="text-black-300 hover:bg-black-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >Register</a>
                            <a
                                href="#"
                                className="text-black-300 hover:bg-black-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >Login</a>
                            <a
                                href="#"
                                className="text-black-300 hover:bg-black-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                            >Log Out</a>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export {Navbar2};
