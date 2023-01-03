import { component$, PropFunction, Slot } from "@builder.io/qwik";

interface ButtonProps {
  onClick$?: PropFunction<() => unknown>;
  disabled?: boolean;
}
export const Button = component$((props: ButtonProps) => {
  return <button
    class="px-4 py-2 transition-all bg-slate-100 hover:bg-slate-200 active:scale-90 disabled:hover:bg-slate-100 disabled:text-slate-400 disabled:active:scale-100 rounded font-bold"
    disabled={props.disabled}
    onClick$={props.onClick$}
  >
    <Slot />
  </button >;
});