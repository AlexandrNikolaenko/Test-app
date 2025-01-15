'use server';

import Blocks from "./components/block";

export default async function Home() {
  let data = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }
  ];
  try {
    let res = await fetch('http://localhost:5000/', {method: 'GET'});
    if (res.status == 200) data = (await res.json()).blocks;
    else throw new Error('Error status: ' + res.status + ', error: ' (await res.json()).e);
  } catch(e) {
    console.log(e)
  }

  return (
    <div className="bg-[#D4D4D4] flex flex-col gap-10 py-[129px] max-[600px]:py-[65px] max-w-[1536px] px-10 max-[1000px]:px-5 max-[600px]:px-2.5">
      <Blocks data={data}/>
    </div>
  );
}
