import { component$, Slot } from '@builder.io/qwik';
import Footer from '~/components/Footer';

export default component$(() => {
  return (
    <>
      <header class="mb-9"/>
      <main class="flex flex-col md:w-[400px] mx-auto gap-8">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
