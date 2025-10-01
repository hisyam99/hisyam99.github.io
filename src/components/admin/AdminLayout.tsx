import { component$, Slot, useSignal, $, type QRL } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { useAuth, logoutServer } from "~/hooks/useAuth";
import type { User } from "~/services/auth";

interface AuthData {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AdminLayoutProps {
  authData?: AuthData;
}

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: QRL<() => void>;
  currentUser?: User | null;
}

const AdminSidebar = component$<AdminSidebarProps>(
  ({ isOpen, onToggle, currentUser }) => {
    const location = useLocation();

    const menuItems = [
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
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10z"
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
        title: "Media",
        href: "/admin/media",
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
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
      <>
        {/* Mobile backdrop */}
        {isOpen && (
          <div
            class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick$={onToggle}
          />
        )}

        {/* Sidebar */}
        <aside
          class={`
        fixed top-0 left-0 z-50 w-64 h-full bg-base-200 border-r border-base-300 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
        >
          {/* Header */}
          <div class="flex items-center justify-between p-4 border-b border-base-300">
            <h2 class="text-xl font-bold text-primary">Admin Panel</h2>
            <button onClick$={onToggle} class="btn btn-ghost btn-sm lg:hidden">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav class="p-4">
            <ul class="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    class={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors duration-200
                    ${
                      isActiveRoute(item.href)
                        ? "bg-primary text-primary-content"
                        : "text-base-content hover:bg-base-300"
                    }
                  `}
                    onClick$={onToggle}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User info */}
          {currentUser && (
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300">
              <Link
                href="/profile"
                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-300 transition-colors"
              >
                <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span class="text-primary-content text-sm font-bold">
                    {currentUser.name?.charAt(0).toUpperCase() || "A"}
                  </span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium">
                    {currentUser.name || "Admin User"}
                  </p>
                  <p class="text-xs text-base-content/70">
                    {currentUser.email || "admin@example.com"}
                  </p>
                </div>
              </Link>
            </div>
          )}
        </aside>
      </>
    );
  },
);

const AdminHeader = component$<{
  onMenuToggle: QRL<() => void>;
  currentUser?: User | null;
}>(({ onMenuToggle, currentUser }) => {
  const auth = useAuth();

  const handleLogout = $(async () => {
    await logoutServer();
    window.location.href = "/";
  });

  return (
    <header class="bg-base-100 border-b border-base-300 h-16">
      <div class="flex items-center justify-between h-full px-4">
        {/* Mobile menu button */}
        <button onClick$={onMenuToggle} class="btn btn-ghost btn-sm lg:hidden">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Title for mobile */}
        <h1 class="text-lg font-semibold lg:hidden">Admin Dashboard</h1>

        {/* Right side */}
        <div class="flex items-center space-x-4">
          {/* Notifications */}
          <button class="btn btn-ghost btn-sm">
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
                d="M15 17h5l-5-5-5 5h5zM15 17H9a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2z"
              />
            </svg>
          </button>

          {/* User dropdown */}
          <div class="dropdown dropdown-end">
            <div tabIndex={0} role="button" class="btn btn-ghost btn-sm">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span class="text-primary-content text-sm font-bold">
                  {(currentUser?.name || auth.user?.name)
                    ?.charAt(0)
                    .toUpperCase() || "A"}
                </span>
              </div>
            </div>
            <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/admin/settings">Settings</Link>
              </li>
              <li>
                <button onClick$={handleLogout} class="text-error">
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
  const sidebarOpen = useSignal(false);
  const auth = useAuth();

  const toggleSidebar = $(() => {
    sidebarOpen.value = !sidebarOpen.value;
  });

  // Use server-side auth data if available, otherwise fallback to client-side auth
  const currentAuthData = authData || {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isAdmin: auth.user?.role === "ADMIN",
  };

  // Server-side auth check already handled in layout.tsx onGet
  // No need for loading state or redirect here since server handles it

  return (
    <div class="min-h-screen bg-base-100">
      <AdminSidebar
        isOpen={sidebarOpen.value}
        onToggle={toggleSidebar}
        currentUser={currentAuthData.user}
      />

      {/* Main content */}
      <div class="lg:ml-64">
        <AdminHeader
          onMenuToggle={toggleSidebar}
          currentUser={currentAuthData.user}
        />

        {/* Page content */}
        <main class="p-6">
          <Slot />
        </main>
      </div>
    </div>
  );
});
