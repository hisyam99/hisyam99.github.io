import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface DrawerProps {}

export const Drawer = component$<DrawerProps>(() => {
  return (
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        {/* Page content here */}
      </div>
      <div class="drawer-side z-10">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="rounded-r-badge menu bg-base-200 text-base-content min-h-full w-80 space-y-2 p-4">
          {/* Sidebar content here */}
          <li>
            <Link>Blog</Link>
          </li>
          <li>
            <details>
              <summary>Portfolio</summary>
              <ul>
                <li>
                  <Link href="https://reparin.xyz">Reparin</Link>
                </li>
                <li>
                  <Link>coming soon . . .</Link>
                </li>
              </ul>
            </details>
          </li>
          <div class="ml-2 py-2">
          </div>
        </ul>
      </div>
    </div>
  );
});
