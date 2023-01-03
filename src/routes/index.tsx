import { $, component$, QwikChangeEvent, useClientEffect$, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Button } from '~/components/Button';

interface Case {
  id: string;
  products: number[];
  np: number;
  krw: number;
  diff: number;
}

export default component$(() => {
  const np = useStore({
    target: 6500,
    current: 0,
    event: 0,
  });
  const result = useStore({
    cases: [] as Case[],
  });
  useClientEffect$(() => {
    np.current = Number(localStorage.getItem("current np")) || 0;
    np.event = Number(localStorage.getItem("event np")) || 0;
  });
  useTask$(({ track }) => {
    const target = track(() => np.target);
    const current = track(() => np.current);
    const event = track(() => np.event);
    const npKrwMap = new Map([
      [800, 6600],
      [1205, 9900],
      [2435, 19800],
      [4335, 34100],
      [6500, 49500],
      [13550, 99000],
    ]);
    const nps = [...npKrwMap.keys()];
    const sum = (rest: number[]) => rest.reduce((a, b) => [a[0] + nps[b], a[1] + npKrwMap.get(nps[b])!], [0, 0]);
    const t = target - (event + current);
    const iterationCount = Math.min(6, Math.ceil(t / (nps.at(0) ?? 800)));
    const list: Case[] = [];
    let minKrw = 100000000;
    const visiteds = new Set<string>();
    const find = (base: number[]) => {
      if (base.length >= iterationCount) {
        return;
      }
      for (let j = 0; j < nps.length; j++) {
        const arr = base.slice();
        arr.push(j);
        arr.sort();
        const id = arr.join();
        if (visiteds.has(id)) continue;
        visiteds.add(id);
        const [np, krw] = sum(arr);
        const diff = np - t;
        if (diff < 0) {
          find(arr);
        } else {
          if (krw < minKrw) minKrw = krw;
          const products = arr.map(x => nps[x]);
          list.push({
            id,
            products,
            np,
            krw,
            diff,
          });
        }
      }
    }
    find([]);
    const all = list.sort((a, b) => a.krw - b.krw)
      .filter(x => x.krw === minKrw)
      .sort((a, b) => b.diff - a.diff);
    // .sort((a, b) => a.krw - b.krw)
    result.cases = all;
  });
  const changeCurrentNp = $((e: QwikChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    np.current = value;
    localStorage.setItem("current np", value.toString());

  });
  const changeEventNp = $((e: QwikChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    np.event = value;
    localStorage.setItem("event np", value.toString());
  });
  return (
    <>
      <div>
        <h1 class="text-3xl font-extrabold">효율적으로 NP 소비하기</h1>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <Button onClick$={() => np.target = 1485}>희귀 스킨</Button>
          <Button onClick$={() => np.target = 1075}>고급 스킨</Button>
          <Button disabled onClick$={() => np.target = 0}>영웅 스킨</Button>
        </div>
        <div class="flex gap-2">
          <Button onClick$={() => np.target += 200}>이모티콘 추가</Button>
          <Button onClick$={() => np.target = 1430}>닉네임 변경권</Button>
        </div>
        <div class="flex gap-2">
          <Button onClick$={() => np.target = 6500}>시즌팩(70%)</Button>
          <Button disabled onClick$={() => np.target = 11250}>시즌팩(50%)</Button>
          <Button onClick$={() => np.target = 22500}>시즌팩(정가)</Button>
        </div>
      </div>
      <div class="flex flex-col p-4 border rounded">
        <label class="flex">
          <h3 class="font-bold flex-1">필요한 NP</h3>
          <input
            class="text-right w-28"
            type="number"
            name="target"
            value={np.target}
            onChange$={(e) => np.target = Number(e.target.value)}
          />
          NP
        </label>
        <label class="flex">
          <h3 class="font-bold flex-1">가지고 있는 NP</h3>
          <input
            class="text-right w-28"
            type="number"
            name="current"
            value={np.current}
            min={0}
            onChange$={changeCurrentNp}
          />
          NP
        </label>
        <label class="flex">
          <h3 class="font-bold flex-1">가지고 있는 이벤트 NP</h3>
          <input
            class="text-right w-28"
            type="number"
            name="event"
            value={np.event}
            min={0}
            onChange$={changeEventNp}
          />
          NP
        </label>
      </div>
      <h2 class="text-xl font-bold">조합</h2>
      <ol class="flex flex-col gap-4">
        {result.cases.map((c, index) => <li class="flex gap-1 items-start" key={c.id}>
          <div class="flex gap-1 flex-wrap">
            {c.products.map((x, i) => <span
              key={i + x}
              class={[
                "font-bold cursor-default select-none text-cyan-500 rounded-l px-2 after:backdrop-blur-sm hover:text-cyan-400 after:pr-2 bg-cyan-100/50 after:absolute hover:after:content-['NP'] after:bg-cyan-100/50 after:rounded-r",
                {
                  "text-yellow-500 hover:text-yellow-500 bg-yellow-100/50 after:bg-yellow-100/50": index === 0
                }
              ]}
            >
              {x}
            </span>)}
          </div>
          <div class="flex flex-1 justify-end whitespace-nowrap">
            <div>
              {c.krw}원
            </div>
            <div>
              {"+"}
              <span class={["font-bold cursor-default select-none text-cyan-500", { "text-yellow-500": index === 0 }]}>
                {c.diff}NP
              </span>
            </div>
          </div>
        </li>)}
      </ol>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik Docs Starter',
};
