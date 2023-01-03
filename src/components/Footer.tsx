import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer class="flex flex-col border-t mt-4 gap-4 p-4 items-center">
      <ul class="flex gap-4">
        <li>
          <a
            class="text-slate-500 text-sm transition-colors hover:underline hover:text-rose-500"
            href="https://playeternalreturn.com/posts/news"
            target="_blank"
            rel="noopener noreferrer"
          >
            ER 새소식
          </a>
        </li>
        <li>
          <a
            class="text-slate-500 text-sm transition-colors hover:underline hover:text-rose-500"
            href="https://playeternalreturn.com/posts/news?categoryPath=patchnote"
            target="_blank"
            rel="noopener noreferrer"
          >
            ER 패치노트
          </a>
        </li>
        <li>
          <a
            class="text-slate-500 text-sm transition-colors hover:underline hover:text-black"
            href="https://github.com/tnraro/np"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
      <div>
        <span class="text-slate-500 text-sm">
          Made by
        </span>
        {" "}
        <a
          class="text-slate-500 text-sm transition-colors hover:underline hover:text-yellow-400"
          href="https://twitter.com/tnraro_er"
          target="_blank"
          rel="noopener noreferrer"
        >
          @tnraro_er
        </a>
      </div>
    </footer>
  );
});
