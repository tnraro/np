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
      <p class="text-slate-500 text-sm">
        본 사이트는 이터널 리턴의 가격정책을 실시간으로 반영하지 않습니다.<br />
        참고 이외의 목적으로 사용할 수 없으며, 목적 외 이용에 대한 책임은 전적으로 본인에게 있습니다.
      </p>
      <div>
        <span class="text-slate-500 text-sm">
          문의
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
