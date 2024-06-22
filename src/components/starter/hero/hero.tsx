import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import ImgHisyam from "~/media/hisyam.jpg?jsx";
import ImgReparin from "~/media/reparin.png?jsx";

export default component$(() => {
  const nextSectionRef = useSignal<Element | undefined>(undefined);

  const scrollToNextSection = $(() => {
    nextSectionRef.value?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <>
      <section class="hero rounded-bl-[64px] bg-base-300 pb-24 pt-48">
        <div class="hero-content flex-col items-center lg:flex-row-reverse">
          <ImgHisyam class="max-w-sm transform rounded-lg shadow-2xl transition-transform duration-300 hover:scale-110" />
          <div class="text-center lg:mr-10 lg:text-left">
            <h1 class="text-6xl font-extrabold leading-tight drop-shadow-lg">
              Muhammad Hisyam Kamil
            </h1>
            <p class="py-6 text-lg leading-relaxed drop-shadow-md">
              Suka mencoba teknologi baru 💻
            </p>
            <button
              class="btn btn-primary  shadow-lg"
              onClick$={scrollToNextSection}
            >
              See More . . .
            </button>
          </div>
        </div>
      </section>

      <section ref={nextSectionRef}>
        <section class="container mx-auto px-6 py-10">
          <div class="container mx-auto flex flex-col space-y-6 px-6 py-4 lg:h-[32rem] lg:flex-row lg:items-center lg:py-16">
            <div class="flex w-full flex-col items-center lg:w-1/2 lg:flex-row">
              <div class="order-2 mt-6 flex justify-center lg:mt-0 lg:flex-col lg:space-y-3">
                <button class="mx-2 h-3 w-3 rounded-full bg-blue-500 focus:outline-none lg:mx-0"></button>
                <button class="mx-2 h-3 w-3 rounded-full bg-gray-300 hover:bg-blue-500 focus:outline-none lg:mx-0"></button>
                <button class="mx-2 h-3 w-3 rounded-full bg-gray-300 hover:bg-blue-500 focus:outline-none lg:mx-0"></button>
                <button class="mx-2 h-3 w-3 rounded-full bg-gray-300 hover:bg-blue-500 focus:outline-none lg:mx-0"></button>
              </div>

              <div class="max-w-lg lg:order-2 lg:mx-12">
                <h1 class="text-3xl font-semibold tracking-wide  lg:text-4xl">
                  Reparin
                </h1>
                <p class="mt-4 text-justify">
                  Reparin adalah sebuah situs web yang menyediakan layanan
                  perbaikan gadget atau perangkat untuk pelanggan. Website ini
                  dibuat menggunakan Next.js versi 14 dengan komponen UI dari
                  shadcn/ui, dan menggunakan backend yang dibangun dengan Golang
                  serta package manager Bun.
                </p>
                <div class="mt-6">
                  <Link href="https://reparin.xyz" class="btn btn-primary">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>

            <div class="flex h-96 w-full items-center justify-center lg:w-1/2">
              <ImgReparin class="h-full w-full max-w-2xl rounded-md object-cover" />
            </div>
          </div>

          <hr class="my-12 border-neutral-content" />

          <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-4">
            <div class="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
              <Link
                href="https://bun.sh/"
                class="flex min-w-full flex-row items-center justify-center"
              >
                <svg
                  id="Bun"
                  xmlns="http://www.w3.org/2000/svg"
                  width="auto"
                  height="auto"
                  viewBox="0 0 80 70"
                >
                  <title>Bun</title>
                  <path
                    id="Shadow"
                    d="M71.09,20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46,26.46,0,0,1,75.5,35.7c0,16.57-16.82,30.05-37.5,30.05-11.58,0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55,65.3,30.14,69.75,42,69.75c20.68,0,37.5-13.48,37.5-30C79.5,32.69,76.46,26,71.09,20.74Z"
                  />
                  <g id="Body">
                    <path
                      id="Background"
                      d="M73,35.7c0,15.21-15.67,27.54-35,27.54S3,50.91,3,35.7C3,26.27,9,17.94,18.22,13S33.18,3,38,3s8.94,4.13,19.78,10C67,17.94,73,26.27,73,35.7Z"
                      style="fill:#fbf0df"
                    />
                    <path
                      id="Bottom_Shadow"
                      data-name="Bottom Shadow"
                      d="M73,35.7a21.67,21.67,0,0,0-.8-5.78c-2.73,33.3-43.35,34.9-59.32,24.94A40,40,0,0,0,38,63.24C57.3,63.24,73,50.89,73,35.7Z"
                      style="fill:#f6dece"
                    />
                    <path
                      id="Light_Shine"
                      data-name="Light Shine"
                      d="M24.53,11.17C29,8.49,34.94,3.46,40.78,3.45A9.29,9.29,0,0,0,38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7c0,.4,0,.8,0,1.19C9.06,15.48,20.07,13.85,24.53,11.17Z"
                      style="fill:#fffefc"
                    />
                    <path
                      id="Top"
                      d="M35.12,5.53A16.41,16.41,0,0,1,29.49,18c-.28.25-.06.73.3.59,3.37-1.31,7.92-5.23,6-13.14C35.71,5,35.12,5.12,35.12,5.53Zm2.27,0A16.24,16.24,0,0,1,39,19c-.12.35.31.65.55.36C41.74,16.56,43.65,11,37.93,5,37.64,4.74,37.19,5.14,37.39,5.49Zm2.76-.17A16.42,16.42,0,0,1,47,17.12a.33.33,0,0,0,.65.11c.92-3.49.4-9.44-7.17-12.53C40.08,4.54,39.82,5.08,40.15,5.32ZM21.69,15.76a16.94,16.94,0,0,0,10.47-9c.18-.36.75-.22.66.18-1.73,8-7.52,9.67-11.12,9.45C21.32,16.4,21.33,15.87,21.69,15.76Z"
                      style="fill:#ccbea7;fill-rule:evenodd"
                    />
                    <path
                      id="Outline"
                      d="M38,65.75C17.32,65.75.5,52.27.5,35.7c0-10,6.18-19.33,16.53-24.92,3-1.6,5.57-3.21,7.86-4.62,1.26-.78,2.45-1.51,3.6-2.19C32,1.89,35,.5,38,.5s5.62,1.2,8.9,3.14c1,.57,2,1.19,3.07,1.87,2.49,1.54,5.3,3.28,9,5.27C69.32,16.37,75.5,25.69,75.5,35.7,75.5,52.27,58.68,65.75,38,65.75ZM38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7,3,50.89,18.7,63.25,38,63.25S73,50.89,73,35.7C73,26.62,67.31,18.13,57.78,13,54,11,51.05,9.12,48.66,7.64c-1.09-.67-2.09-1.29-3-1.84C42.63,4,40.42,3,38,3Z"
                    />
                  </g>
                  <g id="Mouth">
                    <g id="Background-2" data-name="Background">
                      <path
                        d="M45.05,43a8.93,8.93,0,0,1-2.92,4.71,6.81,6.81,0,0,1-4,1.88A6.84,6.84,0,0,1,34,47.71,8.93,8.93,0,0,1,31.12,43a.72.72,0,0,1,.8-.81H44.26A.72.72,0,0,1,45.05,43Z"
                        style="fill:#b71422"
                      />
                    </g>
                    <g id="Tongue">
                      <path
                        id="Background-3"
                        data-name="Background"
                        d="M34,47.79a6.91,6.91,0,0,0,4.12,1.9,6.91,6.91,0,0,0,4.11-1.9,10.63,10.63,0,0,0,1-1.07,6.83,6.83,0,0,0-4.9-2.31,6.15,6.15,0,0,0-5,2.78C33.56,47.4,33.76,47.6,34,47.79Z"
                        style="fill:#ff6164"
                      />
                      <path
                        id="Outline-2"
                        data-name="Outline"
                        d="M34.16,47a5.36,5.36,0,0,1,4.19-2.08,6,6,0,0,1,4,1.69c.23-.25.45-.51.66-.77a7,7,0,0,0-4.71-1.93,6.36,6.36,0,0,0-4.89,2.36A9.53,9.53,0,0,0,34.16,47Z"
                      />
                    </g>
                    <path
                      id="Outline-3"
                      data-name="Outline"
                      d="M38.09,50.19a7.42,7.42,0,0,1-4.45-2,9.52,9.52,0,0,1-3.11-5.05,1.2,1.2,0,0,1,.26-1,1.41,1.41,0,0,1,1.13-.51H44.26a1.44,1.44,0,0,1,1.13.51,1.19,1.19,0,0,1,.25,1h0a9.52,9.52,0,0,1-3.11,5.05A7.42,7.42,0,0,1,38.09,50.19Zm-6.17-7.4c-.16,0-.2.07-.21.09a8.29,8.29,0,0,0,2.73,4.37A6.23,6.23,0,0,0,38.09,49a6.28,6.28,0,0,0,3.65-1.73,8.3,8.3,0,0,0,2.72-4.37.21.21,0,0,0-.2-.09Z"
                    />
                  </g>
                  <g id="Face">
                    <ellipse
                      id="Right_Blush"
                      data-name="Right Blush"
                      cx="53.22"
                      cy="40.18"
                      rx="5.85"
                      ry="3.44"
                      style="fill:#febbd0"
                    />
                    <ellipse
                      id="Left_Bluch"
                      data-name="Left Bluch"
                      cx="22.95"
                      cy="40.18"
                      rx="5.85"
                      ry="3.44"
                      style="fill:#febbd0"
                    />
                    <path
                      id="Eyes"
                      d="M25.7,38.8a5.51,5.51,0,1,0-5.5-5.51A5.51,5.51,0,0,0,25.7,38.8Zm24.77,0A5.51,5.51,0,1,0,45,33.29,5.5,5.5,0,0,0,50.47,38.8Z"
                      style="fill-rule:evenodd"
                    />
                    <path
                      id="Iris"
                      d="M24,33.64a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,24,33.64Zm24.77,0a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,48.75,33.64Z"
                      style="fill:#fff;fill-rule:evenodd"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="auto"
                  height="auto"
                  viewBox="0 0 287 107"
                  class="fill-current"
                  fill="currentColor"
                >
                  <g clip-path="url(#a)">
                    <path d="M68.014 97.942c-26.4 0-40.947-3.678-41.6-4.495a1050.447 1050.447 0 0 1 0-68.081c.653-.735 15.12-3.433 41.6-3.433 24.6 0 33.999 9.072 33.999 19.943 0 7.028-4.25 13.403-12.75 17.081v1.226c10.217.736 15.202 7.437 15.202 15.038 0 11.688-11.85 22.721-36.451 22.721ZM51.259 55.606l15.937.082c5.231-.817 8.746-3.678 8.746-8.091 0-5.558-4.169-8.582-11.606-8.582-6.375 0-11.197 1.062-12.995 2.452-.082 4.659-.082 9.48-.082 14.14Zm13.159 23.457c7.437 0 11.932-3.351 11.932-9.072 0-4.659-3.678-7.438-9.154-7.601l-15.937-.082c0 4.74 0 9.48.082 14.14 1.716 1.47 6.62 2.615 13.077 2.615Zm116.861-42.909c.654 19.86.654 38.74 0 58.192-7.519 1.226-15.528 1.226-23.047 0l-2.289-13.812h-1.471c-2.942 12.014-9.317 15.774-19.207 15.774-20.023 0-23.701-16.346-23.701-36.452 0-5.067.163-12.014.163-23.702a90.967 90.967 0 0 1 26.644 0V65.25c0 8.337 4.25 11.442 9.317 11.442 3.596 0 7.356-1.798 9.236-4.822V36.154a76.09 76.09 0 0 1 24.355 0Zm10.109 58.192c-.654-19.86-.654-38.74 0-58.192 7.519-1.226 15.528-1.226 23.048 0l2.288 13.813h1.471c2.942-12.014 9.317-15.774 19.207-15.774 20.024 0 23.701 16.346 23.701 36.451 0 5.068-.163 12.015-.163 23.702a90.974 90.974 0 0 1-26.644 0V65.25c0-8.336-4.25-11.442-9.317-11.442-3.596 0-7.356 1.798-9.236 4.822v35.716a76.095 76.095 0 0 1-24.355 0Z" />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path d="M0 0h287v107H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>

            <div class="col-span-1 flex min-w-full items-center justify-center md:col-span-2 lg:col-span-1">
              <Link href="https://qwik.dev/">
                <svg
                  width="auto"
                  height="auto"
                  viewBox="0 0 167 53"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Qwik Logo"
                  class="qwik-logo"
                >
                  <path
                    d="M81.9545 46.5859H75.5513V35.4045C73.4363 36.8579 71.0496 37.5749 68.4884 37.5749C65.0151 37.5749 62.4344 36.6253 60.8239 34.6487C59.2134 32.6915 58.3984 29.2034 58.3984 24.2231C58.3984 19.1266 59.3492 15.5997 61.2702 13.5456C63.23 11.4721 66.3734 10.4644 70.7004 10.4644C74.7946 10.4644 78.5201 11.0264 81.9545 12.131V46.5859ZM75.5513 16.278C74.096 15.8323 72.4661 15.6191 70.7004 15.6191C68.5272 15.6191 66.9749 16.1811 66.1017 17.3244C65.2479 18.4871 64.7823 20.6962 64.7823 23.9712C64.7823 27.0524 65.1897 29.1065 66.0435 30.2304C66.8973 31.335 68.3719 31.897 70.5452 31.897C73.3781 31.897 75.5513 30.7343 75.5513 29.2809V16.278Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M91.133 11.1426C93.4033 17.4406 95.3242 23.7386 96.993 30.0948C99.205 23.5836 101.087 17.2856 102.542 11.1426H108.15C110.265 17.4406 112.031 23.7386 113.447 30.0948C115.97 23.196 117.949 16.8787 119.404 11.1426H125.71C123.033 20.173 120.064 28.777 116.785 36.8966H109.256C108.402 32.3039 107.044 26.7617 105.22 20.1536C104.056 25.2889 102.445 30.8893 100.33 36.8966H92.8018C90.2793 27.5174 87.5434 18.9522 84.6328 11.1426H91.133Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M132.832 7.55758C129.999 7.55758 129.203 6.85996 129.203 3.97257C129.203 1.39523 130.018 0.794495 132.832 0.794495C135.665 0.794495 136.46 1.39523 136.46 3.97257C136.46 6.85996 135.665 7.55758 132.832 7.55758ZM129.649 11.1426H136.053V36.8966H129.649V11.1426Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M166.303 11.1426C161.763 17.5956 158.581 21.5295 156.815 22.9441C158.27 23.8937 162.17 28.8933 167.002 36.916H159.628C153.613 27.7887 150.742 23.8549 149.325 23.2542V36.916H142.922V0H149.325V23.2348C150.78 22.169 153.963 18.1382 158.872 11.1426H166.303Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M40.973 52.5351L32.0861 43.6985L31.9503 43.7179V43.621L13.0511 24.9595L17.708 20.4637L14.9721 4.76715L1.99103 20.8513C-0.220992 23.0798 -0.628467 26.7036 0.962635 29.3778L9.07337 42.8265C10.3152 44.9 12.566 46.1402 14.9915 46.1208L19.0081 46.082L40.973 52.5351Z"
                    fill="#18B6F6"
                  ></path>
                  <path
                    d="M45.8232 20.5411L44.038 17.2468L43.1066 15.5609L42.738 14.902L42.6992 14.9408L37.8094 6.47238C36.587 4.34075 34.2974 3.02301 31.8137 3.04239L27.5255 3.15865L14.7384 3.19741C12.313 3.21679 10.101 4.49577 8.87853 6.56927L1.09766 21.9945L15.0101 4.72831L33.2496 24.7656L30.0091 28.0406L31.9495 43.7178L31.9689 43.679V43.7178H31.9301L31.9689 43.7565L33.4824 45.2293L40.8364 52.4187C41.1469 52.7094 41.6514 52.3606 41.4379 51.9924L36.8975 43.0589L44.8142 28.4282L45.0664 28.1375C45.1634 28.0212 45.2604 27.905 45.3381 27.7887C46.8904 25.6764 47.1038 22.8472 45.8232 20.5411Z"
                    fill="#AC7EF4"
                  ></path>
                  <path
                    d="M33.3076 24.6882L15.0099 4.74774L17.61 20.3668L12.9531 24.882L31.9105 43.6985L30.203 28.0794L33.3076 24.6882Z"
                    fill="white"
                  ></path>
                </svg>
              </Link>
            </div>
            <div class="col-span-1 flex min-w-full items-center justify-center md:col-span-2 lg:col-span-1">
              <Link href="https://daisyui.com">
                <svg
                  viewBox="0 0 3600 1024"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="auto"
                  height="auto"
                >
                  <rect
                    x="256"
                    y="670.72"
                    width="512"
                    height="256"
                    rx="128"
                    fill="#1AD1A5"
                  />
                  <circle cx="512" cy="353.28" r="256" fill="white" />
                  <circle
                    cx="512"
                    cy="353.28"
                    r="261"
                    stroke="currentColor"
                    stroke-opacity="0.2"
                    stroke-width="10"
                  />
                  <circle cx="512" cy="353.28" r="114.688" fill="#FF9903" />
                  <path
                    d="M2788.44 729.2C2751.24 729.2 2719.24 722.4 2692.44 708.8C2665.64 695.2 2645.04 675.8 2630.64 650.6C2616.64 625 2609.64 594.6 2609.64 559.4H2720.64C2720.64 573.4 2723.44 585.4 2729.04 595.4C2734.64 605.4 2742.44 613 2752.44 618.2C2762.84 623.4 2775.24 626 2789.64 626C2804.04 626 2816.44 623.4 2826.84 618.2C2837.24 613 2845.04 605.4 2850.24 595.4C2855.84 585.4 2858.64 573.4 2858.64 559.4H2969.64C2969.64 594.6 2962.44 625 2948.04 650.6C2933.64 675.8 2912.84 695.2 2885.64 708.8C2858.84 722.4 2826.44 729.2 2788.44 729.2ZM2609.64 559.4V302H2720.64V559.4H2609.64ZM2858.64 559.4V302H2969.64V559.4H2858.64Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3035.76 722V302H3146.76V722H3035.76Z"
                    fill="currentColor"
                  />
                  <path
                    d="M1280.8 722L1275.4 666.2V302H1383.4V722H1280.8ZM1195.6 729.2C1167.2 729.2 1142.8 723 1122.4 710.6C1102.4 698.2 1087 680.2 1076.2 656.6C1065.4 633 1060 604.8 1060 572C1060 538.8 1065.4 510.6 1076.2 487.4C1087 463.8 1102.4 445.8 1122.4 433.4C1142.8 421 1167.2 414.8 1195.6 414.8C1220.4 414.8 1240.8 421 1256.8 433.4C1273.2 445.8 1285.2 463.8 1292.8 487.4C1300.8 510.6 1304.8 538.8 1304.8 572C1304.8 604.8 1300.8 633 1292.8 656.6C1285.2 680.2 1273.2 698.2 1256.8 710.6C1240.8 723 1220.4 729.2 1195.6 729.2ZM1224.4 629.6C1234.4 629.6 1243.2 627.2 1250.8 622.4C1258.8 617.2 1265 610.4 1269.4 602C1273.8 593.2 1276 583.2 1276 572C1276 560.8 1273.8 551 1269.4 542.6C1265 533.8 1258.8 527 1250.8 522.2C1243.2 517.4 1234.2 515 1223.8 515C1214.2 515 1205.6 517.4 1198 522.2C1190.4 527 1184.4 533.8 1180 542.6C1175.6 551 1173.2 560.8 1172.8 572C1173.2 583.2 1175.6 593.2 1180 602C1184.4 610.4 1190.4 617.2 1198 622.4C1206 627.2 1214.8 629.6 1224.4 629.6Z"
                    fill="currentColor"
                  />
                  <path
                    d="M1612.31 722L1609.31 653V575C1609.31 561 1608.51 548.4 1606.91 537.2C1605.31 526 1601.31 517.2 1594.91 510.8C1588.51 504.4 1578.11 501.2 1563.71 501.2C1553.71 501.2 1545.51 503.6 1539.11 508.4C1532.71 513.2 1527.31 518.8 1522.91 525.2L1428.71 495.2C1437.11 478.8 1447.51 464.6 1459.91 452.6C1472.71 440.6 1487.51 431.4 1504.31 425C1521.51 418.2 1540.51 414.8 1561.31 414.8C1593.31 414.8 1620.71 420.6 1643.51 432.2C1666.31 443.8 1683.71 460 1695.71 480.8C1707.71 501.6 1713.71 525.8 1713.71 553.4V722H1612.31ZM1532.51 729.2C1497.71 729.2 1470.51 721.4 1450.91 705.8C1431.71 689.8 1422.11 667 1422.11 637.4C1422.11 606.2 1431.71 583.2 1450.91 568.4C1470.51 553.2 1497.71 545.6 1532.51 545.6H1620.71V607.4H1575.11C1561.11 607.4 1550.31 609.8 1542.71 614.6C1535.11 619.4 1531.31 626.2 1531.31 635C1531.31 641 1533.91 645.6 1539.11 648.8C1544.31 652 1551.51 653.6 1560.71 653.6C1570.71 653.6 1579.31 651.8 1586.51 648.2C1593.71 644.2 1599.31 638.8 1603.31 632C1607.31 624.8 1609.31 616.6 1609.31 607.4H1637.51C1637.51 646.2 1628.31 676.2 1609.91 697.4C1591.51 718.6 1565.71 729.2 1532.51 729.2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M1770.65 722V422H1878.65V722H1770.65ZM1824.65 393.2C1808.65 393.2 1794.65 387.2 1782.65 375.2C1770.65 363.2 1764.65 349.2 1764.65 333.2C1764.65 316.8 1770.65 302.8 1782.65 291.2C1794.65 279.2 1808.65 273.2 1824.65 273.2C1841.05 273.2 1855.05 279.2 1866.65 291.2C1878.65 302.8 1884.65 316.8 1884.65 333.2C1884.65 349.2 1878.65 363.2 1866.65 375.2C1855.05 387.2 1841.05 393.2 1824.65 393.2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2052.07 729.2C2032.07 729.2 2013.47 726.4 1996.27 720.8C1979.07 715.2 1964.27 707.4 1951.87 697.4C1939.87 687 1931.47 674.6 1926.67 660.2L2012.47 626.6C2016.87 637.4 2023.07 644.4 2031.07 647.6C2039.07 650.4 2046.07 651.8 2052.07 651.8C2058.47 651.8 2063.67 650.4 2067.67 647.6C2071.67 644.8 2073.67 640.8 2073.67 635.6C2073.67 630 2070.87 625.4 2065.27 621.8C2059.67 617.8 2051.07 614.4 2039.47 611.6L2014.87 605.6C1988.07 598.8 1967.87 587 1954.27 570.2C1940.67 553.4 1933.87 533.8 1933.87 511.4C1933.87 480.6 1945.07 456.8 1967.47 440C1990.27 423.2 2021.07 414.8 2059.87 414.8C2083.47 414.8 2103.27 417.8 2119.27 423.8C2135.67 429.4 2149.07 437.4 2159.47 447.8C2169.87 458.2 2177.87 470.2 2183.47 483.8L2100.07 515.6C2097.27 507.6 2092.47 501.8 2085.67 498.2C2079.27 494.6 2071.27 492.8 2061.67 492.8C2054.87 492.8 2049.47 494.4 2045.47 497.6C2041.87 500.8 2040.07 504.6 2040.07 509C2040.07 513.8 2042.87 518 2048.47 521.6C2054.47 524.8 2063.47 528 2075.47 531.2L2100.07 537.2C2118.47 541.6 2134.47 548.4 2148.07 557.6C2161.67 566.4 2172.27 577.4 2179.87 590.6C2187.47 603.8 2191.27 619 2191.27 636.2C2191.27 655.8 2185.47 672.6 2173.87 686.6C2162.27 700.2 2146.07 710.8 2125.27 718.4C2104.47 725.6 2080.07 729.2 2052.07 729.2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M2324 849.2C2310 849.2 2295.2 846.4 2279.6 840.8C2264 835.6 2251.6 830 2242.4 824L2282.6 737C2287 740.6 2291.6 743.4 2296.4 745.4C2301.6 747.8 2306.4 749 2310.8 749C2317.2 749 2323.2 747.4 2328.8 744.2C2334.8 741 2339.4 735.6 2342.6 728L2378.6 644L2459.6 422H2579.6L2450.6 732.8C2441.4 755.2 2431.8 775.2 2421.8 792.8C2411.8 810.4 2399.2 824.2 2384 834.2C2369.2 844.2 2349.2 849.2 2324 849.2ZM2350.4 722L2206.4 422H2326.4L2415.8 644L2452.4 722H2350.4Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>

            <div class="col-span-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
              <Link href="https://tailwindcss.com/">
                <svg
                  viewBox="0 0 248 31"
                  class="h-10 fill-current"
                  width="auto"
                  height="auto"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                    fill="#38bdf8"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
});
