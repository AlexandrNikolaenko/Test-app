'use client'

import { useState } from "react";

function Block({info, setBlocks, blocks}) {
    let [isActive, setIsActive] = useState(false);
    let [isHover, setIsHover] = useState(false);

    async function deleteBlock() {
        let res = await fetch('http://localhost:5000/delete', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({id: info.id})
        });
        if (res.status == 200) setBlocks(blocks.filter(block => block.id != info.id));
        else console.log(new Error(res.status));
    }
    
    return(
        <div onClick={() => setIsActive(!isActive)} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)} className={`cursor-pointer backdrop-blur-[30px] text-left flex flex-col gap-[15px] relative z-30 hover:z-40 transition-all duration-300 bg-white bg-opacity-[0.01] hover:bg-opacity-100 ${isActive ? 'shadow-active' : 'shadow-base'} active:shadow-active py-[15px] px-[25px] rounded-[25px]`}>
            <h4 className="text-[32px] text-black w-full truncate">{info.id} {info.title}</h4>
            <p className="text-xs text-black">{info.text}</p>
            <button className={`transition-all duration-300 overflow-hidden bg-[#FF2F54] text-white ${isHover ? 'block w-fit h-fit py-2.5 px-5' : 'hidden w-0 h-0 p-0'} rounded-[10px]`} onClick={deleteBlock}>Delete</button>
        </div>
    )
}

export default function Blocks({data}) {
    let [blocks, setBlocks] = useState(data);

    async function sendData(e) {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(document.getElementById('form')));
        
        let res = await fetch('http://localhost:5000/add/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(formData)
        });
        if (res.status == 200) {
            try {
                let newData = await fetch('http://localhost:5000/', {method: 'GET'});
                if (newData.status == 200) {
                    setBlocks((await newData.json()).blocks);
                }
                else throw new Error('Error status: ' + res.status + ', error: ' (await res.json()).e);
            } catch(e) {
                console.log(e);
            }
        } else throw new Error('Error status: ' + res.status + ', error: ' (await res.json()).e)
    }

    return(
        <>
            <form id="form" className="flex flex-col gap-5 max-w-[600px]:gap-2.5 w-1/2 max-[600px]:w-full" onSubmit={sendData}>
                <label htmlFor="title">Введите заголовок карточки:</label>
                <input type="text" name="title" id="title" className="rounded-[10px] py-2.5 px-5"/>
                <label htmlFor="text">Введите текст карточки:</label>
                <textarea type="textarea" name="text" id="text" className="rounded-[10px] py-2.5 px-5"/>
                <button type="submit" className="rounded-[10px] py-2.5 px-5 shadow-base bg-green-500 text-white w-fit">Добавить</button>
            </form>
            <div className="w-full grid max-[600px]:flex flex-col grid-cols-4 max-[1340px]:grid-cols-3 max-[900px]:grid-cols-2 gap-[60px] max-[1000px]:gap-10">
                {blocks.map(block => <Block key={block.id} info={block} setBlocks={setBlocks} blocks={blocks}/>)}
            </div>
        </>
    )
}