import { component$, Slot } from "@builder.io/qwik";
import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

export default component$(() => {
  return (
    <div>
      <Header />
      <main class="relative">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
