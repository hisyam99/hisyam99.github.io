import { component$, Slot } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useAuth, logoutServer } from "~/hooks/useAuth";
import type { User } from "~/services/auth";
import type { JSX } from "@builder.io/qwik";
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";

interface AuthData {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AdminLayoutProps {
  authData?: AuthData;
}

interface MenuItem {
  title: string;
  href: string;
  icon: JSX.Element;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: (
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: "Blog Posts",
    href: "/admin/blogs",
    icon: (
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: (
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: (
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    title: "Resume Contents",
    href: "/admin/resume-contents",
    icon: (
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: (
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      </svg>
    ),
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: (
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

interface AdminSidebarProps {
  currentUser?: User | null;
}

const AdminSidebar = component$<AdminSidebarProps>(({ currentUser }) => {
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    if (href === "/admin") {
      return (
        location.url.pathname === "/admin" ||
        location.url.pathname === "/admin/"
      );
    }
    return location.url.pathname.startsWith(href);
  };

  return (
    <aside class="bg-base-200 min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div class="sticky top-0 z-20 bg-base-200 border-b border-base-300 px-4 py-4 lg:px-6">
        <Link
          href="/admin"
          class="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span class="hidden lg:inline">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav class="flex-1 overflow-y-auto px-2 py-4 lg:px-4">
        <ul class="menu menu-compact lg:menu-normal gap-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                class={`
                  flex items-center gap-3 rounded-lg transition-all duration-200
                  ${
                    isActiveRoute(item.href)
                      ? "active bg-primary text-primary-content font-semibold"
                      : "hover:bg-base-300"
                  }
                `}
              >
                <span class="flex-shrink-0">{item.icon}</span>
                <span class="hidden lg:inline">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      {currentUser && (
        <div class="sticky bottom-0 z-20 bg-base-200 border-t border-base-300 p-2 lg:p-4">
          <div class="dropdown dropdown-top w-full">
            <div
              tabIndex={0}
              role="button"
              class="btn btn-ghost w-full justify-start gap-3 hover:bg-base-300"
            >
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-8 h-8 lg:w-10 lg:h-10">
                  <span class="text-sm lg:text-base">
                    {currentUser.name?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
              </div>
              <div class="hidden lg:flex flex-col items-start flex-1 min-w-0">
                <p class="text-sm font-medium truncate w-full">
                  {currentUser.name || "Admin User"}
                </p>
                <p class="text-xs text-base-content/70 truncate w-full">
                  {currentUser.email || "admin@example.com"}
                </p>
              </div>
            </div>
            <ul
              tabIndex={0}
              class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mb-2"
            >
              <li>
                <Link href="/profile" class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                  </svg>
                  Settings
                </Link>
              </li>
              <div class="divider my-1"></div>
              <li>
                <button
                  onClick$={async () => {
                    await logoutServer();
                    window.location.href = "/";
                  }}
                  class="flex items-center gap-2 text-error"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
});

interface AdminHeaderProps {
  currentUser?: User | null;
}

const AdminHeader = component$<AdminHeaderProps>(({ currentUser }) => {
  return (
    <header class="sticky top-0 z-30 bg-base-100 border-b border-base-300">
      <div class="navbar px-4 lg:px-6 min-h-16">
        {/* Mobile: Menu Button + Title */}
        <div class="flex-1 lg:hidden">
          <label
            for="admin-drawer"
            class="btn btn-ghost btn-square drawer-button"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        {/* Desktop: Breadcrumb or Title */}
        <div class="flex-1 hidden lg:flex">
          <div class="text-sm breadcrumbs">
            <ul>
              <li>
                <Link href="/admin">Admin</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side Actions */}
        <div class="flex-none gap-2">
          {/* Notifications */}
          <div class="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              class="btn btn-ghost btn-circle btn-sm lg:btn-md"
            >
              <div class="indicator">
                <svg
                  class="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span class="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </div>
            <div
              tabIndex={0}
              class="mt-3 z-[1] card card-compact dropdown-content w-64 lg:w-80 bg-base-100 shadow-xl"
            >
              <div class="card-body">
                <h3 class="font-bold text-lg">Notifications</h3>
                <p class="text-sm text-base-content/70">
                  You have 3 unread messages
                </p>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block btn-sm">
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile User Avatar - Only on Mobile */}
          <div class="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              class="btn btn-ghost btn-circle avatar"
            >
              <div class="w-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span class="text-sm font-bold">
                  {currentUser?.name?.charAt(0).toUpperCase() || "A"}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li class="menu-title">
                <span>{currentUser?.name || "Admin User"}</span>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/admin/settings">Settings</Link>
              </li>
              <div class="divider my-1"></div>
              <li>
                <button
                  onClick$={async () => {
                    await logoutServer();
                    window.location.href = "/";
                  }}
                  class="text-error"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
});

export default component$<AdminLayoutProps>(({ authData }) => {
  const auth = useAuth();
  const breadcrumbs = useBreadcrumbs();

  // Use server-side auth data if available, otherwise fallback to client-side auth
  const currentAuthData = authData || {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isAdmin: auth.user?.role === "ADMIN",
  };

  return (
    <div class="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" class="drawer-toggle" />

      {/* Main Content */}
      <div class="drawer-content flex flex-col bg-base-100">
        {/* Header */}
        <AdminHeader currentUser={currentAuthData.user} />

        {/* Page Content */}
        <main class="flex-1 overflow-y-auto">
          <div class="container mx-auto p-4 lg:p-6 xl:p-8 max-w-7xl">
            {/* Breadcrumbs */}
            <div class="mb-4 lg:mb-6">
              <Breadcrumbs items={breadcrumbs} size="sm" />
            </div>

            <Slot />
          </div>
        </main>

        {/* Footer */}
        <footer class="footer footer-center p-4 bg-base-200 text-base-content border-t border-base-300">
          <aside>
            <p class="text-sm">
              Copyright © {new Date().getFullYear()} - All rights reserved by
              Admin Panel
            </p>
          </aside>
        </footer>
      </div>

      {/* Sidebar Drawer */}
      <div class="drawer-side z-40">
        <label
          for="admin-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <div class="w-64 lg:w-72">
          <AdminSidebar currentUser={currentAuthData.user} />
        </div>
      </div>
    </div>
  );
});
