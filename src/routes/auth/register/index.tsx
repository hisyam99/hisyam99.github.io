import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  routeLoader$,
  zod$,
  z,
  Form,
  useNavigate,
} from "@builder.io/qwik-city";
import { registerUser } from "~/services/auth";

// Input validation schemas
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username minimal 3 karakter")
      .max(20, "Username maksimal 20 karakter")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Username hanya boleh mengandung huruf, angka, - dan _",
      ),
    email: z.string().email("Format email tidak valid"),
    password: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password harus mengandung huruf besar, kecil, dan angka",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
  });

export const useRegisterAction = routeAction$(
  async (data, { cookie, redirect }) => {
    try {
      const validatedData = registerSchema.parse(data);

      const result = await registerUser({
        name: validatedData.username,
        email: validatedData.email,
        password: validatedData.password,
      });

      // Set auth cookies
      cookie.set("accessToken", result.tokens.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: result.tokens.expiresIn, // Use token expiry time
        path: "/",
      });

      cookie.set("refreshToken", result.tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      cookie.set("user", JSON.stringify(result.user), {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        maxAge: result.tokens.expiresIn, // Use token expiry time
        path: "/",
      });

      // Redirect to dashboard or home
      throw redirect(302, "/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          error: error.errors[0].message,
          fieldErrors: error.errors.reduce(
            (acc, err) => {
              if (err.path[0]) {
                acc[err.path[0] as string] = err.message;
              }
              return acc;
            },
            {} as Record<string, string>,
          ),
        };
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : "Terjadi kesalahan",
      };
    }
  },
  zod$(registerSchema),
);

export const useCheckAuth = routeLoader$(async ({ cookie, redirect }) => {
  const accessToken = cookie.get("accessToken");
  if (accessToken) {
    // User already logged in, redirect to home
    throw redirect(302, "/");
  }
  return { authenticated: false };
});

export default component$(() => {
  const registerAction = useRegisterAction();
  const nav = useNavigate();

  return (
    <div class="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-base-content">
            Buat Akun Baru
          </h2>
          <p class="mt-2 text-center text-sm text-base-content/70">
            Sudah punya akun?{" "}
            <button
              type="button"
              class="font-medium text-primary hover:text-primary-focus link"
              onClick$={() => nav("/auth/login")}
            >
              masuk di sini
            </button>
          </p>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <Form action={registerAction} class="space-y-6">
              {/* Username Field */}
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="username_anda"
                  class={`input input-bordered w-full ${
                    registerAction.value?.fieldErrors?.username
                      ? "input-error"
                      : ""
                  }`}
                  required
                />
                {registerAction.value?.fieldErrors?.username && (
                  <label class="label">
                    <span class="label-text-alt text-error">
                      {registerAction.value.fieldErrors.username}
                    </span>
                  </label>
                )}
                <label class="label">
                  <span class="label-text-alt">
                    3-20 karakter, hanya huruf, angka, - dan _
                  </span>
                </label>
              </div>

              {/* Email Field */}
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="contoh@email.com"
                  class={`input input-bordered w-full ${
                    registerAction.value?.fieldErrors?.email
                      ? "input-error"
                      : ""
                  }`}
                  required
                />
                {registerAction.value?.fieldErrors?.email && (
                  <label class="label">
                    <span class="label-text-alt text-error">
                      {registerAction.value.fieldErrors.email}
                    </span>
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Masukkan password"
                  class={`input input-bordered w-full ${
                    registerAction.value?.fieldErrors?.password
                      ? "input-error"
                      : ""
                  }`}
                  required
                />
                {registerAction.value?.fieldErrors?.password && (
                  <label class="label">
                    <span class="label-text-alt text-error">
                      {registerAction.value.fieldErrors.password}
                    </span>
                  </label>
                )}
                <label class="label">
                  <span class="label-text-alt">
                    Minimal 6 karakter dengan huruf besar, kecil, dan angka
                  </span>
                </label>
              </div>

              {/* Confirm Password Field */}
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Konfirmasi Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Ulangi password"
                  class={`input input-bordered w-full ${
                    registerAction.value?.fieldErrors?.confirmPassword
                      ? "input-error"
                      : ""
                  }`}
                  required
                />
                {registerAction.value?.fieldErrors?.confirmPassword && (
                  <label class="label">
                    <span class="label-text-alt text-error">
                      {registerAction.value.fieldErrors.confirmPassword}
                    </span>
                  </label>
                )}
              </div>

              {/* Error Alert */}
              {registerAction.value?.error && (
                <div class="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{registerAction.value.error}</span>
                </div>
              )}

              {/* Terms of Service */}
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-primary"
                    required
                  />
                  <span class="label-text text-sm">
                    Saya setuju dengan{" "}
                    <button
                      type="button"
                      class="link link-primary"
                      onClick$={() => {
                        // TODO: Show terms of service modal
                        alert("Syarat dan ketentuan akan segera hadir");
                      }}
                    >
                      syarat dan ketentuan
                    </button>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div class="form-control mt-6">
                <button
                  type="submit"
                  class={`btn btn-primary w-full ${
                    registerAction.isRunning ? "loading" : ""
                  }`}
                  disabled={registerAction.isRunning}
                >
                  {registerAction.isRunning
                    ? "Memproses..."
                    : "Daftar Sekarang"}
                </button>
              </div>
            </Form>
          </div>
        </div>

        {/* Back to Home */}
        <div class="text-center">
          <button
            type="button"
            class="btn btn-ghost btn-sm"
            onClick$={() => nav("/")}
          >
            ← Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
});
